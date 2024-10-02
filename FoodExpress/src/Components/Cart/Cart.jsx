import React from 'react';

function Cart({ cartItems, toggleCart, handleUpdateCartItem, handleRemoveFromCart, totalPrice }) {
  return (
    <div className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-out">
      {/* Cart Header */}
      <div className="flex justify-between items-center p-5 bg-gray-900 text-white">
        <h2 className="text-lg font-semibold tracking-wide">Your Cart</h2>
        <button
          onClick={toggleCart}
          className="text-3xl transform transition-transform duration-200 hover:scale-110"
        >
          &times;
        </button>
      </div>

      {/* Cart Items Section */}
      <div className="p-6 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is currently empty.</p>
        ) : (
          <ul className="space-y-4 divide-y divide-black">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex-auto overflow-y-auto divide-y divide-black px-6 py-4"
              >
                <div className="flex justify-between items-center">
                  {/* Product Info */}
                  <div className="text-sm space-y-1">
                    <h3 className="font-medium text-gray-800">{item.foodname}</h3>
                    <p className="text-gray-500">
                      {item.quantity} x RS {item.price / item.quantity} = RS {item.price}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                      onClick={() => handleUpdateCartItem(item.foodname, 'decrement')}
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                      onClick={() => handleUpdateCartItem(item.foodname, 'increment')}
                    >
                      +
                    </button>
                    <button
                      className="text-sm font-medium hover:underline"
                      onClick={() => handleRemoveFromCart(item.foodname)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Checkout Button */}
      <dl className="text-sm font-medium mt-10 space-y-6">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{totalPrice}</dd>
              </div>
              
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>0</dd>
              </div>
              <div className="flex items-center justify-between border-t border-black text-black pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">{totalPrice}</dd>
              </div>
            </dl>
      <div className="p-6 border-t border-gray-200">
        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
          Checkout (Total: RS {totalPrice})
        </button>
      </div>
    </div>
  );
}

export default Cart;
