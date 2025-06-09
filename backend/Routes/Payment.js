import express from 'express'
import Stripe from 'stripe'
import Order from '../Models/Order.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
})

// Helper: Calculate total
function calculateOrderAmount(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// 1. Create Checkout Session
router.post('/create-payment-intent', async (req, res) => {
  const { items, email } = req.body

  try {
    // Step 1: Save order as pending in DB
    const order = new Order({
      email,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: calculateOrderAmount(items),
      paymentStatus: 'pending'
    })

    const savedOrder = await order.save()

    // Step 2: Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      })),
      customer_email: email,
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
        order_id: savedOrder._id.toString()
      }
    })

    // Step 3: Update order with paymentIntent ID and session ID
    await Order.findByIdAndUpdate(savedOrder._id, {
      transactionId: session.id, // ← store it to use in webhook
      paymentIntentId: session.id
    })

    // Step 4: Return session ID to frontend
    res.send({ id: session.id }) // Used for redirectToCheckout({ sessionId: ... })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    res.status(500).send({ error: err.message })
  }
})


// 2. Stripe Webhook

router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // This is now the raw body
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(' Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle webhook events
  switch (event.type) {
    case 'checkout.session.completed': {
      console.log(event.data)
      // Update the order using the metadata.order_id
      try {
       const session = event.data.object
       console.log(session)

await Order.findOneAndUpdate(
  { transactionId: session.id },
  {
    paymentStatus: 'succeeded'
  }
)

        console.log(`Order ${session.metadata.order_id} marked as paid`)
      } catch (err) {
        console.error('Failed to update order after payment:', err)
      }
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object
      const orderId = paymentIntent.metadata?.order_id

      if (orderId) {
        try {
          await Order.findByIdAndUpdate(
            orderId,
            {
              paymentStatus: 'failed',
              transactionId: paymentIntent.id
            }
          )
          console.log(`Order ${orderId} marked as failed`)
        } catch (err) {
          console.error('Failed to update order on payment failure:', err)
        }
      } else {
        console.warn('No order_id found in failed paymentIntent metadata')
      }
      break
    }

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
})

router.get('/verify-payment/:sessionId', async (req, res) => {
  const { sessionId } = req.params
  console.log(sessionId, "session")
  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)
   const result =   await Order.findOneAndUpdate(
            {transactionId: sessionId},
            {
              paymentStatus: 'success',
              
            }
          )
    console.log(session)
    if (!session) {
      return res.status(404).json({ error: 'Stripe session not found' })
    }

    const paymentIntentId = session.id

    // Find the order by transactionId (same as payment_intent)
    const order = await Order.findOne({ transactionId: sessionId });
    console.log(order)

    if (!order) {
       
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json({
      paid: session.payment_status === 'paid',
      orderStatus: order.paymentStatus,
      orderId: order._id,
      customerEmail: session.customer_email,
      totalAmount: order.totalAmount,
      items: order.items
    })
  } catch (err) {
    console.error('Error verifying payment:', err)
    res.status(500).json({ error: 'Failed to verify payment' })
  }
})



export default router
