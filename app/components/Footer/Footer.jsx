import React from "react";
import styles from "./footer.module.css";
import { socials } from "./social";
import Link from "next/link";
const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.copyWrite}>ModoMarket © 2021 All Rights Reserved.</div>
        <div className={styles.socialMedia}>
          {socials.map((item) => {
            return (
              <Link href={`/${item.link}`} key={item.id}>
                <img width={25} src={`/${item.link}.png`} alt={item.icon} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Footer;
