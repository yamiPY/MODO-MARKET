import React from "react";
import style from "./about.module.css";
import Image from "next/image";
function About() {
  return (
    <div className={style.container}>
      <div>
        <h1>🛍️ About us</h1>
        <p>
          At "MODO Market", we believe that simplicity and convenience should be
          part of every shopping experience. We created this store to offer a
          wide variety of carefully selected products that fit your daily needs
          — all at affordable prices and with guaranteed quality. Our journey
          began as a group of friends searching for unique items in the local
          market. Today, we've grown into a full online platform serving
          hundreds of customers across the Arab world.
        </p>
      </div>
      <div>
        <h1>🎯 Our Mission</h1>
        <p>
          Our mission is to make shopping more fun and easy by offering
          practical, creative, and useful products — all while delivering a
          smooth user experience and fast customer support.
        </p>
      </div>
      <div>
        <h1>🧰 What we offer </h1>

        <ul>
          <li>Smart tools for the kitchen and home</li>
          <li>Trendy and modern accessories</li>
          <li>Unique gifts and home decorations</li>
          <li>Organizing and storage solutions</li>
          <li>Digital products to make life easier</li>
        </ul>
      </div>
      <div>
        <h1>💡 Why Choose Us</h1>
        <p>
          Every product is hand-picked and tested
          <br />
          Customer satisfaction guaranteed or your money back
          <br />
          We always aim to bring new, creative, and useful ideas to the market
        </p>
      </div>
    </div>
  );
}
export default About;
