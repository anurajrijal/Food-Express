// import React from 'react'
import styles from "./About.module.css";

function About() {
    return (
      <>
        <div className={`${styles["container"]} card lg:card-side  `}>
          <figure>
            <img
              className={`${styles["img1"]} `}
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h1 className={`${styles["heading"]} card-title`}>About Us</h1>
            <p>
              Welcome to Food Express, your reliable partner in seamless food
              ordering and delivery. Our platform is designed for both customers
              and restaurant owners, offering an easy way to browse menus, place
              orders, and make secure online payments. For restaurants, orders
              are instantly sent to a dashboard for quick preparation, and our
              system efficiently assigns delivery persons, ensuring timely
              deliveries.
              <br />
              <br />
              <br />
              Customers can track their orders in real-time and provide feedback
              on their experience. At Food Express, we’re committed to enhancing
              the convenience of food service in today’s digital age, making it
              effortless and enjoyable for everyone involved.
            </p>
          </div>
        </div>
        {/* ----------------------------------------------- */}
        {/* div 2 starts from here */}
        <div className={`${styles["container"]} card lg:card-side  shadow-xl`}>
          <div className="card-body">
            <h1 className={`${styles["heading"]} card-title`}>What we do</h1>
            <p>
              Welcome to Food Express, your reliable partner in seamless food
              ordering and delivery. Our platform is designed for both customers
              and restaurant owners, offering an easy way to browse menus, place
              orders, and make secure online payments. For restaurants, orders
              are instantly sent to a dashboard for quick preparation, and our
              system efficiently assigns delivery persons, ensuring timely
              deliveries.
              <br />
              <br />
              <br />
              Customers can track their orders in real-time and provide feedback
              on their experience. At Food Express, we’re committed to enhancing
              the convenience of food service in today’s digital age, making it
              effortless and enjoyable for everyone involved.
            </p>
          </div>
          <figure>
            <img
              className={`${styles["img1"]} `}
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album"
            />
          </figure>
        </div>
      </>
    );
}

export default About;
