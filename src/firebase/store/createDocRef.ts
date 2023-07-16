import { doc } from "firebase/firestore";
import { db } from "firebaseConfig";

export const createDocRef = () => {
  const usersDocRef = (uid: string) => {
    return doc(db, "users", uid);
  };

  const roomListDocRef = (room: "room1" | "room2" | "room3") => {
    return doc(db, "roomList", room);
  };

  return { usersDocRef, roomListDocRef };
};
