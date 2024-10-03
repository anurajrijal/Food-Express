import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";

function Card({ foodname, image, details, longDetails, price, addToCart, cartItems }) {
  const [quantity, setQuantity] = useState(1);
  const [isClicked, setClicked] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const handleIncrement = (event) => {
    event.stopPropagation();
    setQuantity(quantity + 1);
  };

  const handleDecrement = (event) => {
    event.stopPropagation();
    setQuantity(quantity > 1 ? quantity - 1 : quantity);
  };

  const isItemInCart = cartItems.find((item) => item.foodname === foodname);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart({ foodname, price: price * quantity, quantity });
  };

  const handleClick = () => {
    setAnimationClass(styles.fadeIn);
    setClicked(true);
  };

  const handleClose = () => {
    setAnimationClass(styles.fadeOut);
    setTimeout(() => setClicked(false), 500); // Wait for the fade-out animation to complete
  };

  // Update displayed quantity if the item is already in the cart
  useEffect(() => {
    if (isItemInCart) {
      setQuantity(isItemInCart.quantity);
    }
  }, [isItemInCart]);

  return (
    <>
      <div
        onClick={handleClick}
        className="w-full p-4 bg-gray-100 rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <img className="w-full object-cover rounded-t-md" src={image} alt={foodname} />
        <div className="mt-2">
          <h1 className="text-xl font-semibold text-gray-800">{foodname}</h1>
          <p className="text-sm mt-1 text-gray-600">{details}</p>

          {/* Quantity Controls */}
          <div className="mt-3 flex items-center space-x-4">
            <button
              className="px-2 py-1 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="text-lg font-semibold text-gray-800">{quantity}</span>
            <button
              className="px-2 py-1 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-lg font-semibold text-gray-800">RS: {price * quantity}</span>
            <button
              className="py-1 px-4 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition"
              onClick={handleAddToCart}
            >
              {isItemInCart ? "Update Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {isClicked && (
        <div
          className={`${styles.floatingCard} ${animationClass} fixed bg-gray-100 border border-gray-200 rounded-lg shadow-md p-6 max-w-xl transform transition-all duration-500`}
        >
          <img className="object-cover w-full h-64 rounded-t-lg" src={image} alt={foodname} />
          <div className="p-4">
            <h5 className="text-2xl font-bold text-gray-900">{foodname}</h5>
            <p className="mt-2 text-gray-700">{longDetails}</p>
            <button
              className="mt-4 px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
