import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiStar, FiShoppingCart } from 'react-icons/fi'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            <span className="block">Welcome to</span>
            <span className="block text-indigo-600">ShopEasy</span>
          </h1>
          <p className="mt-4 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-6 md:text-2xl md:max-w-3xl">
            Discover amazing products at unbeatable prices.
          </p>

          <div className="mt-10 flex justify-center space-x-10">
            <div className="flex flex-col items-center">
              <FiShoppingBag className="text-indigo-500 text-6xl mb-2" />
              <h3 className="text-lg font-semibold text-indigo-700">Wide Selection</h3>
            </div>

            <div className="flex flex-col items-center">
              <FiStar className="text-yellow-400 text-6xl mb-2" />
              <h3 className="text-lg font-semibold text-yellow-600">Best Deals</h3>
            </div>

            <div className="flex flex-col items-center">
              <FiShoppingCart className="text-green-500 text-6xl mb-2" />
              <h3 className="text-lg font-semibold text-green-700">Fast Checkout</h3>
            </div>
          </div>

          <div className="mt-12 max-w-md mx-auto sm:flex sm:justify-center md:mt-14 space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/products"
              className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Browse Products
            </Link>
            <Link
              to="/cart"
              className="w-full flex items-center justify-center px-8 py-4 border border-indigo-600 text-lg font-semibold rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
