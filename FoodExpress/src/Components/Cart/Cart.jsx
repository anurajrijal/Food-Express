import React from 'react';

function Cart({ cartItems, toggleCart, handleUpdateCartItem, handleRemoveFromCart, totalPrice }) {
  return (
    <div className="fixed right-0 top-0 h-full w-2/6 bg-white shadow-lg z-50 overflow-y-auto">
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h2 className="text-lg font-semibold">Cart Items</h2>
        <button onClick={toggleCart} className="text-xl">&times;</button>
      </div>
      <div className="p-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="mb-2 p-2 bg-yellow-200 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p>{item.foodname}</p>
                    <p>{item.quantity} x RS {item.price / item.quantity} = RS {item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-2 py-1 bg-gray-300 rounded" onClick={() => handleUpdateCartItem(item.foodname, 'decrement')}>-</button>
                    <button className="px-2 py-1 bg-gray-300 rounded" onClick={() => handleUpdateCartItem(item.foodname, 'increment')}>+</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleRemoveFromCart(item.foodname)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4 border-t">
        <button className="w-full bg-green-500 text-white py-2 rounded">
          Checkout (Total: RS {totalPrice})
        </button>
      </div>
    </div>
  );
}

export default Cart;
