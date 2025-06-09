import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-indigo-600 font-extrabold text-2xl tracking-wide">ShopEasy</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/cart" className="relative nav-link">
              <FaShoppingCart className="mr-2 text-xl" />
              Cart
              {totalQuantity > 0 && (
                <span className="cart-badge">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-3">
          <Link to="/" onClick={toggleMenu} className="block nav-link">Home</Link>
          <Link to="/products" onClick={toggleMenu} className="block nav-link">Products</Link>
<Link to="/cart" className="relative nav-link flex items-center space-x-1">
  <FaShoppingCart className="text-xl" />
  <span>Cart</span>
  {totalQuantity > 0 && (
    <span className="cart-badge">
      {totalQuantity}
    </span>
  )}
</Link>

        </div>
      )}
    </nav>
  )
}

export default Navbar
