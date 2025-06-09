import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentIntentId: String,
  transactionId: String,
  paymentStatus: { type: String, enum: ['pending', 'succeeded', 'failed'], default: 'pending' }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)
export default Order
