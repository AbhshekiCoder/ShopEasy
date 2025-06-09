import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Success = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)
  const [orderId, setOrderId] = useState(null)
console.log(sessionId)
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/verify-payment/${sessionId}`)
        const data = res.data
        console.log(data)
        setStatus(data.paid ? 'Payment Successful!' : 'Payment Failed')
        setOrderId(data.orderId)
      } catch (err) {
        setStatus('Failed to verify payment.')
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) verifyPayment()
  }, [])

  if (loading) return <div>Loading payment status...</div>

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>{status}</h1>
      {orderId && <p>Your order ID: <strong>{orderId}</strong></p>}
      <p>Thank you for your purchase!</p>
      <a href="/">Return to Home</a>
    </div>
  )
}

export default Success