import React, { useState, useEffect } from 'react'
import ProductCard from '../Components/ProductCard'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Calculate the products to show on current page
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const totalPages = Math.ceil(products.length / productsPerPage)

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  const goToPrevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  if (loading) return <div className="text-center py-12 text-indigo-600 font-semibold">Loading products...</div>
  if (error) return <div className="text-center py-12 text-red-600 font-semibold">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md font-semibold border border-indigo-600 
            ${currentPage === 1 ? 'text-gray-400 border-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-100'}`}
        >
          Previous
        </button>

        <span className="px-4 py-2 font-semibold text-indigo-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md font-semibold border border-indigo-600 
            ${currentPage === totalPages ? 'text-gray-400 border-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-100'}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Products
