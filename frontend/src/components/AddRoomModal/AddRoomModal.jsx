import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from "../../http";
import { useNavigate } from "react-router-dom";

const AddRoomModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  async function createRoom() {
    //server call

    try {
      if (!topic) return;
      const { data } = await create({ topic, roomType });

      console.log(data);
      navigate(`/room/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextInput
            fullwidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} && ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/images/Globe.png" alt="globe" />
              <span>Open</span>
            </div>

            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} && ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/Users.png" alt="social" />
              <span>Social</span>
            </div>

            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} && ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="/images/Lock-modal.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/images/celeb.png" alt="" />
            Let's Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
