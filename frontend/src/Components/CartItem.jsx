import React from 'react'
import { useDispatch } from 'react-redux'
import { removeItemFromCart, deleteItemFromCart, addItemToCart } from '../../features/CartSlice'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200">
      {/* Product Info */}
      <div className="flex items-center w-full sm:w-2/3">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-20 h-20 object-contain rounded-md border border-gray-300"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-indigo-600 font-bold text-lg">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity Controls and Delete */}
      <div className="flex items-center mt-4 sm:mt-0 space-x-3 w-full sm:w-auto">
        <button
          onClick={() => dispatch(removeItemFromCart(item.id))}
          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded-l transition"
          aria-label={`Decrease quantity of ${item.name}`}
        >
          -
        </button>
        <span className="bg-indigo-50 text-indigo-900 font-medium px-4 py-1 rounded">
          {item.quantity}
        </span>
        <button
          onClick={() => dispatch(addItemToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image
          }))}
          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded-r transition"
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
        <button
          onClick={() => dispatch(deleteItemFromCart(item.id))}
          className="ml-4 text-red-500 hover:text-red-700 transition"
          aria-label={`Remove ${item.name} from cart`}
          title="Remove item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CartItem
