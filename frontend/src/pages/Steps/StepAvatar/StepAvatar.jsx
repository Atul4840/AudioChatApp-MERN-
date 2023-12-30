import React, { useEffect, useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import { activate } from "../../../http";
import Loader from "../../../components/shared/Loader/Loader";


const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [photo, setPhoto] = useState("/images/image-profile-default.png");
  const [loader, setLoader] = useState(false);
  const [unMounted,setUnMounted] = useState(false);
    

  function chaptureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); // converting base64 string
    reader.onloadend = function () {
      //console.log(reader.result)
      setPhoto(reader.result);
      dispatch(setAvatar(reader.result));
    };
    //console.log(file.name);
  }
  async function submit() {
    if (!name || !avatar) return;
    setLoader(true);
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        // check 
        if(!unMounted){
           dispatch(setAuth(data));
        }
        dispatch(setAuth(data));
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
       return () =>{
        setUnMounted(true);
       }
  },[]);

  if (loader) {
    return <Loader message="Activation in progress ..." />;
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={`Okay, ${name}`} icon="emoji-monkey">
          <p className={styles.headtext}>How’s this photo?</p>

          <div className={styles.avatarWrapper}>
            <img className={styles.avatar} src={`${photo}`} alt="avatar" />
          </div>

          <div>
            <label className={styles.avatarLable} htmlFor="avatarInput">
              Choose a different photo
            </label>
            <input
              onChange={chaptureImage}
              type="file"
              class={styles.avatarInput}
              id="avatarInput"
            />
          </div>

          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next"></Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepAvatar;
