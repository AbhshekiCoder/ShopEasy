# ShopEasy
A complete e-commerce payment solution with Stripe Checkout, order management, and webhook handling.



Features
💳 Stripe Checkout Integration

🔔 Real-time payment status updates via webhooks

✅ Success & failure pages

📱 Mobile-responsive design

Tech Stack
Frontend:


React

Tailwind CSS

Backend:

Node.js

Express

MongoDB (for order storage)

Payment Processing:

Stripe Checkout

Stripe Webhooks

Getting Started
Prerequisites
Node.js (v14+)

MongoDB Atlas account or local MongoDB instance

Stripe account

Installation
Clone the repository:

bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
Install dependencies:

bash
npm install
Set up environment variables:
Create a .env file in the root directory with the following:

text
PORT=3000
MONGODBURL=mongodb://localhost:27017/e-commerce
STRIPE_SECRET_KEY=sk_test_51PauGq2Lcv7rdblxkMWS7M7aqUjmo0G83boutsqjNAvmzmv6TINlj3kvekfAhVjClyYjIWwf19KiSKwHL1Q9qA3P00FqBeVHYb
STRIPE_WEBHOOK_SECRET=we_1RY1kQ2Lcv7rdblxloW8lxcA
Run the development server:

bash
npm run dev
Configuration
Stripe Setup
Get your API keys from the Stripe Dashboard

Set up webhooks in the Stripe Dashboard:

Endpoint URL: https://4909-103-82-99-55.ngrok-free.app/api/payment/webhook

Events to listen for:

checkout.session.completed

payment_intent.succeeded

payment_intent.payment_failed

MongoDB Setup
Create a free cluster on MongoDB Atlas

Get your connection string

Update the MONGODB_URI in your .env file

API Endpoints
Endpoint	Method	Description
/api/payments/create-payment-intent	POST	Creates a new Stripe Checkout session
/api/payments/webhook	POST	Handles Stripe webhook events
/api/payments/verify-payment/:sessionId	GET	Verifies payment status
/api/orders/:orderId	GET	Retrieves order details
Project Structure
text
.
├── pages/
│   ├── success.js          # Order success page
│   ├── cancel.js           # Checkout canceled page
│   └── api/                # API routes
├── components/
│   └── CheckoutButton.js   # Stripe checkout component
├── models/
│   └── Order.js            # MongoDB order model
├── public/                 # Static files
└── README.md               # This file
Deployment
Vercel (Recommended)
https://vercel.com/button

Set up environment variables in Vercel

Configure production Stripe keys

Update webhook URL in Stripe Dashboard

Other Platforms
For other platforms like Netlify or Heroku, make sure to:

Set all required environment variables

Configure proper redirects

Update Stripe webhook URLs

Testing
To test the payment flow:

Use Stripe test cards:

Success: 4242 4242 4242 4242

Failure: 4000 0000 0000 0002

Test different scenarios:

Successful payments

Failed payments

Canceled checkouts

Webhook deliveries

Contributing
Contributions are welcome! Please follow these steps:

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request
