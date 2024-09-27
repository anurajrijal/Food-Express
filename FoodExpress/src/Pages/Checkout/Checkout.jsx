import React from "react";
import styles from "./Checkout.module.css"; // assuming custom styles if any

function Checkout() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$10.00",
      color: "Red",
      size: "M",
      imageSrc: "path/to/image1.jpg",
      imageAlt: "Image of Product 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$20.00",
      color: "Blue",
      size: "L",
      imageSrc: "path/to/image2.jpg",
      imageAlt: "Image of Product 2",
    },
  ];

  const subtotal = "$30.00";
  const discount = { code: "SAVE10", amount: "$3.00" };
  const taxes = "$2.00";
  const shipping = "$5.00";
  const total = "$34.00";

  return (
    <>
      <main className="lg:min-h-full lg:overflow-hidden lg:flex lg:flex-row-reverse bg-white text-black">
        <h1 className="sr-only">Checkout</h1>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="bg-white w-full max-w-md flex-col lg:flex border-l border-black"
        >
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul
            role="list"
            className="flex-auto overflow-y-auto divide-y divide-black px-6"
          >
            {products.map((product) => (
              <li
                key={product.id}
                className="flex py-6 space-x-6 border-b border-black"
              >
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="flex-none w-40 h-40 object-center object-cover bg-white border border-black rounded-md"
                />
                <div className="flex flex-col justify-between space-y-4">
                  <div className="text-sm font-medium space-y-1">
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                    <p>{product.color}</p>
                    <p>{product.size}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className="text-sm font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <div className="flex border-l border-black pl-4">
                      <button
                        type="button"
                        className="text-sm font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 flex-none bg-white border-t border-black p-6">
            <form>
              <label
                htmlFor="discount-code"
                className="block text-sm font-medium"
              >
                Discount code
              </label>
              <div className="flex space-x-4 mt-1">
                <input
                  type="text"
                  id="discount-code"
                  name="discount-code"
                  className="block w-full border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
                <button
                  type="submit"
                  className="bg-white text-sm font-medium border border-black px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Apply
                </button>
              </div>
            </form>

            <dl className="text-sm font-medium mt-10 space-y-6">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex">
                  Discount
                  <span className="ml-2 rounded-full bg-gray-200 text-xs py-0.5 px-2 tracking-wide">
                    {discount.code}
                  </span>
                </dt>
                <dd>-{discount.amount}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd>{taxes}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>{shipping}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-black text-black pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">{total}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
        >
          <div className="max-w-lg mx-auto">
            <button
              type="button"
              className={`${styles["esewaBtn"]} w-full flex items-center justify-center bg-black border border-transparent text-white rounded-md py-2  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
            >
              <span className="sr-only">Pay with Esewa</span>
              {/* SVG for Apple Pay */}
            </button>

            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm font-medium">or</span>
              </div>
            </div>

            <form className="mt-6">
              <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                <div className="col-span-full">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="block w-full border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="city" className="block text-sm font-medium">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="block w-full border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="region" className="block text-sm font-medium">
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="block w-full border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      className="block w-full border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <div className="flex items-center h-5">
                  <input
                    id="same-as-shipping"
                    name="same-as-shipping"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <label
                  htmlFor="same-as-shipping"
                  className="text-sm font-medium text-gray-900"
                >
                  Billing address is the same as shipping address
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-black text-white border border-transparent rounded-md py-3 px-4 text-sm font-medium shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Pay now
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Checkout;
