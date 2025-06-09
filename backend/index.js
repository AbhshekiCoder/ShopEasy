import express from 'express'
import dotenv from 'dotenv'
import MongoDBConnect from './config/MongoDBConnect.js'
import bodyParser from 'body-parser'
import paymentRouter from './Routes/Payment.js'
import cors from 'cors'
const app = express()

dotenv.config()
MongoDBConnect()
app.use(cors())
app.use(bodyParser.json())
// Stripe requires raw body for webhook
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }))

// Now parse JSON for all other routes
app.use(express.json())
// Routes

app.use('/api', paymentRouter)
app.listen(process.env.PORT||3000, ()=>{
    console.log(`server running on port${process.env.PORT}`)
})

