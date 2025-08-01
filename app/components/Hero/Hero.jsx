import React from "react";
import Image from "next/image";
import HeroImage from "@/public/HeroImage.svg";
import styles from "./hero.module.css";
const Hero = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1>Your one-stop e-commerce destination!</h1>
          <p>
            Discover a world of endless shopping possibilities at our online
            store. Browse, choose, and get started today!
          </p>
          <button>Shop Now</button>
        </div>
        <div className={styles.imageContainer}>
          <Image
          className={styles.heroImage}
            src={HeroImage}
            width={650}
            height={650}
            alt="Abstract background representing e-commerce"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
