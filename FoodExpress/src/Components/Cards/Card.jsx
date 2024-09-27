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
      className={`${styles["card"]} w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg`}
      onClick={handleClick}
    >
      <img
        className="w-full h-64 object-cover rounded-t-lg"
        src={image}
        alt="product image"
      />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          {foodname}
        </h5>
        <p className="text-sm text-gray-700">{details}</p>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <button
              className="px-2 py-1  rounded bg-green-500 text-white"
              onClick={handleIncrement}
            >
              +
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="px-2 py-1  rounded bg-red-500 text-white"
              onClick={handleDecrement}
            >
              -
            </button>
          </div>
          <p className="font-bold">RS: {price * quantity}</p>
        </div>

        <button
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
          onClick={handleAddToCart}
        >
          {isItemInCart ? "Update Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
    {isClicked && (
    <div>
      <div
        className={`${styles["floatingCard"]} ${animationClass} fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 max-w-xl`}
      >
        <img
          className="object-cover w-full h-64 rounded-t-lg"
          src={image}
          alt={foodname}
        />
        <div className="p-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {foodname}
          </h5>
          {/* Longer details visible only in the floating card */}
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {longDetails}
          </p>
          {/* Close Button */}
          <button
            className="px-4 py-2 mt-3 text-white bg-red-500 rounded"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
    )}
    </>
  );
}

export default Card;
