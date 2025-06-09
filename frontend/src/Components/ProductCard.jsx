import React from 'react'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../features/CartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addItemToCart({
      id: product.id,
      name: product.title,  // fakestoreapi uses `title` not `name`
      price: product.price,
      image: product.image
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="h-56 flex items-center justify-center p-4 border-b border-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-48 object-contain"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-indigo-600 font-bold mb-4 text-xl">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
