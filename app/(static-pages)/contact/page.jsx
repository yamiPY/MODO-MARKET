import React from "react";
import styles from "./contact.module.css";
import LogInButton from "@/app/components/NavBar/LogInButton";
const Contact = () => {
  return (
    <div className={styles.container}>
      <form action="Submit">
        <div className={styles.heading}>
          <h1>Love to hear from you,</h1>
          <h1>Get in touch With us</h1>
        </div>
        <div className={styles.form}>
          <div className={styles.input}>
            <div>
              <label htmlFor="input">Your name</label>
              <input placeholder="Name" type="text" />
            </div>

            <div>
              {" "}
              <label htmlFor="">Your Email</label>
              <input type="text" placeholder="Email" />
            </div>
          </div>
          <div className={styles.textarea}>
            <h4>Message</h4>
            <textarea name="" id=""></textarea>
          </div>
        </div>
        <LogInButton className={styles.btn} val={"Submit"} message={"Thanks for contacting us!"} />
      </form>
    </div>
  );
};

export default Contact;
