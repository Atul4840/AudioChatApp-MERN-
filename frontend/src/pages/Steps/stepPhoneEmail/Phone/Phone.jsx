import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import styles from "./Phone.module.css";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const Phone = ({ onNext }) => {
  const [phoneNumber, SetPhoneNumber] = useState("");
  const dispatch = useDispatch();

 


  async function submit() {
    if (!phoneNumber) return;
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
}

  return (
    <Card title="Enter you phone number" icon="telephone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => SetPhoneNumber(e.target.value)}
      />

      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={submit}></Button>
        </div>
      </div>

      <p className={styles.bottomParagraph}>
        By entering your number, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Phone;
