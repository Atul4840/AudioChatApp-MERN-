import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepName.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";
function StepName({ onNext }) {
  const { name } = useSelector((state) => state.activate);
  const [fullName, setFullName] = useState(name);
  const dispatch = useDispatch();

  const handleNextClick = () => {
    if (!fullName) {
      return; // Don't proceed if the full name is not entered
    }

    // Dispatch an action to update the name in the Redux store
    dispatch(setName(fullName));

    // Call the provided onNext function
    onNext();
  };

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="What’s your full name?" icon="glass-emoji">
          <TextInput
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Your full name"
          />

          <p className={styles.paragraph}>
            People use real names at codershouse :)
          </p>

          <div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={handleNextClick} text="Next"></Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default StepName;
