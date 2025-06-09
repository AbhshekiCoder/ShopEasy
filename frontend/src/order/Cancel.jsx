// src/pages/Cancel.js
import React from 'react'

const Cancel = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Payment Canceled</h1>
      <p>Your payment was not completed.</p>
      <p>If this was a mistake, you can try again.</p>
      <a href="/">Return to Home</a>
    </div>
  )
}

export default Cancel
