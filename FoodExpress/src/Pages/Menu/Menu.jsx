import React, { useState } from "react";
import styles from "./Menu.module.css";
import Card from "../../Components/Cards/Card";
import Cart from "../../Components/Cart/Cart";

function Menu() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const details = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const handleAddToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.foodname === newItem.foodname
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        updatedItems[existingItemIndex].price += newItem.price;
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const handleUpdateCartItem = (foodname, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.foodname === foodname) {
          const unitPrice = item.price / item.quantity;
          if (action === "increment") {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: unitPrice * (item.quantity + 1),
            };
          } else if (action === "decrement" && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: unitPrice * (item.quantity - 1),
            };
          }
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (foodname) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.foodname !== foodname)
    );
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const imglink =
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg";

  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        <svg
          onClick={toggleCart}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>

        {totalItems > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-2 translate-y-[-2] inline-block w-6 h-6 text-center text-white bg-red-500 rounded-full">
            {totalItems}
          </span>
        )}
      </div>

      <h1 className="text-pink-300 mx-auto w-full max-w-7xl">Menu</h1>
      <div
        className={`${styles.grid} grid grid-cols-3 gap-6 px-6 py-12 z-20`}
      >
        <Card
          foodname="Pizza"
          image={imglink}
          details="Delicious cheese pizza"
          longDetails={details}
          price={100}
          addToCart={handleAddToCart}
          cartItems={cartItems}
        />
        <Card
          foodname="Burger"
          image={imglink}
          details="Juicy beef burger"
          longDetails={details}
          price={80}
          addToCart={handleAddToCart}
          cartItems={cartItems}
        />
        <Card
          foodname="Pasta"
          image={imglink}
          details="Creamy Alfredo pasta"
          longDetails={details}
          price={90}
          addToCart={handleAddToCart}
          cartItems={cartItems}
        />
        <Card
          foodname="Chicken Burger"
          image={imglink}
          details="Juicy chicken burger"
          longDetails={details}
          price={90}
          addToCart={handleAddToCart}
          cartItems={cartItems}
        />
        <Card
          foodname="Chicken Pasta"
          image={imglink}
          details="Creamy Alfredo pasta"
          longDetails={details}
          price={90}
          addToCart={handleAddToCart}
          cartItems={cartItems}
        />
        <Card
          foodname="Chicken Pasta"
          image={imglink}
          details="Creamy Alfredo pasta"
          longDetails={details}
          price={90}
          addToCart={handleAddToCart}
          cartItems={cartItems}
        />
      </div>

      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          toggleCart={toggleCart}
          handleUpdateCartItem={handleUpdateCartItem}
          handleRemoveFromCart={handleRemoveFromCart}
          totalPrice={totalPrice}
        />
      )}
    </>
  );
}

export default Menu;
