import React from "react";
import styles from "./HomePage.module.css";
import { Link, useNavigate } from 'react-router-dom';
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const HomePage = () => {
  const signInLinkStyle = {
        color: "#0077FF",
        fontWeight : "bold",
        textDecoration: "none",
        marginLeft : "10px",
  }


  const navigate = useNavigate();
  function startRegister() {
      navigate('/authenticate');
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Codershouse!" icon="logo">
        <div className={styles.card}>
          <p className={styles.paragraph}>
            We’re working hard to get Codershouse ready for everyone! While we
            wrap up the finishing youches, we’re adding people gradually to make
            sure nothing breaks :)
          </p>

          <div>
            <Button onClick={startRegister}  text="Let's Go"></Button>
          </div>

          <div className={styles.signInWrapper}>
            <span className={styles.hasInvite}>Have an invite text?</span>
           
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
