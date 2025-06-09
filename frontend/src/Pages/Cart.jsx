import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../features/CartSlice'
import CartItem from '../Components/CartItem'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    setIsProcessing(true)
    
    try {
      const stripe = await loadStripe('pk_test_51PauGq2Lcv7rdblxzjzMQaPLB5U41MemRItHaWFLUh3L9WkuYkkt4PUnxJTUDnmsY4brCiJcKBP8FOi0O1KNYEDj00LjmU5Y9H')
      
      const response = await axios.post('http://localhost:3000/api/create-payment-intent', {
        items: cart.items,
        email: email
      })
      
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id
      })
      
      if (result.error) {
        console.error(result.error.message)
      }
    } catch (error) {
      console.error('Error during checkout:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.totalQuantity === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <a 
          href="/products" 
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition"
        >
          Browse Products
        </a>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Your Cart</h1>
        <button 
          onClick={() => dispatch(clearCart())}
          className="flex items-center text-red-600 hover:text-red-800 transition"
          aria-label="Clear Cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Clear Cart
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
        {cart.items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Order Summary</h2>
          <span className="text-gray-600">{cart.totalQuantity} {cart.totalQuantity > 1 ? 'items' : 'item'}</span>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${cart.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-gray-800 font-semibold text-lg">Total</span>
            <span className="font-bold text-lg">${cart.totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email for order confirmation"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-6"
        />
        
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full bg-primary text-black bg-b py-3 rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  )
}

export default Cart
