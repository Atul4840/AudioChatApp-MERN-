import React from "react";
import styles from "./Rooms.module.css";
import RoomCard from "../../components/RoomCard/RoomCard";

const rooms = [
  {
    id: 1,
    topic: "which frameword best for frontend?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/avatar-image.png",
      },
      {
        id: 2,
        name: "John Doe",
        avatar: "/images/avatar-image.png",
      },
    ],
    totalPeople: 40,
  },

  {
    id: 2,
    topic: "which frameword best for backend?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/avatar-image.png",
      },
      {
        id: 2,
        name: "John Doe",
        avatar: "/images/avatar-image.png",
      },
    ],
    totalPeople: 40,
  },

  {
    id: 2,
    topic: "which frameword best for backend?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/avatar-image.png",
      },
      {
        id: 2,
        name: "John Doe",
        avatar: "/images/avatar-image.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 2,
    topic: "which frameword best for backend?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/avatar-image.png",
      },
      {
        id: 2,
        name: "John Doe",
        avatar: "/images/avatar-image.png",
      },
    ],
    totalPeople: 40,
  },
];

const Rooms = () => {
  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src="images/search.png" alt="search" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.startRoomButton}>
              <img src="/images/group.png" alt="add-room" />
              <span>Start a room</span>
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
          {
            rooms.map((room) => <RoomCard key={room.id} room={room}/>)
          }
        </div>
      </div>
    </>
  );
};

export default Rooms;
