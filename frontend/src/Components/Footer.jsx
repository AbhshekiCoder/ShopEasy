import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 b-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">ShopEasy</h2>
            <p className="text-gray-400">Your one-stop shop for everything</p>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <a href="/" className="text-gray-400 hover:text-white">Home</a>
            <a href="/products" className="text-gray-400 hover:text-white">Products</a>
            <a href="/cart" className="text-gray-400 hover:text-white">Cart</a>
          </div>
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-gray-400">Email: contact@shopeasy.com</p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer