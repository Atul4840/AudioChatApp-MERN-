import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, icon, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        {icon && <img src={`/images/${icon}.png`} alt="logo" />}
        {title && <h1 className={styles.heading}>{title}</h1>}
      </div>

      {children}

      {/* <p className={styles.paragraph}>
      We’re working hard to get Codershouse ready for everyone! While we
      wrap up the finishing youches, we’re adding people gradually to make
      sure nothing breaks :)
    </p> */}

      {/* <div>
      <button>
        <span>Get your username</span>
        <img src="/images/arrow_forward.png" alt="arrow" />
      </button>
    </div> */}

      {/* <div>
      <span>Have an invite text?</span>
      <Link to="/login">Sign in</Link>
    </div> */}
    </div>
  );
};

export default Card;
