import React, { useState } from "react";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import styles from "./StepPhoneEmail.module.css";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <div className={styles.buttonWrapper}>
            <button
              className={`${styles.tabButton} ${type==='phone' ? styles.active : ''}`}
              onClick={() => setType("phone")}
            >
              <img src="/images/phone_android.png" alt="Phone" />
            </button>
            <button
              className={`${styles.tabButton} ${type==='email' ? styles.active : ''}`}
              onClick={() => setType("email")}
            >
              <img src="/images/Email.png" alt="Email" />
            </button>
          </div>
          <Component onNext={onNext}></Component>
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
