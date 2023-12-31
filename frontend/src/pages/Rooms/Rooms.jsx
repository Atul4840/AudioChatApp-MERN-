import React,{useState,useEffect} from "react";
import styles from "./Rooms.module.css";
import RoomCard from "../../components/RoomCard/RoomCard";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import { getAllRooms } from "../../http";

// const rooms = [
//   {
//     id: 1,
//     topic: "which frameword best for frontend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/avatar-image.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "/images/avatar-image.png",
//       },
//     ],
//     totalPeople: 40,
//   },

//   {
//     id: 2,
//     topic: "which frameword best for backend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/avatar-image.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "/images/avatar-image.png",
//       },
//     ],
//     totalPeople: 40,
//   },

//   {
//     id: 3,
//     topic: "which frameword best for backend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/avatar-image.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "/images/avatar-image.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: "which frameword best for backend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/avatar-image.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "/images/avatar-image.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

const Rooms = () => {
  const [showModal,setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const {data} = await getAllRooms();
      setRooms(data);
    }
    fetchRooms();
  }, []);

  function openModal(){
    setShowModal(true);
  }
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
            <button onClick={openModal} className={styles.startRoomButton}>
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
      {showModal &&  <AddRoomModal onClose={()=>setShowModal(false)}/>}
    </>
  );
};

export default Rooms;
