import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "firebaseConfig";
import { User } from "~/types/user";

export const useGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const { user } = await signInWithPopup(auth, provider);

    const initUser: User = {
      room1: { point: 0, isAnswer: false, ranking: "first" },
      room2: { point: 0, isAnswer: false, ranking: "second" },
      room3: { point: 0, isAnswer: false, ranking: "unranked" },
      isOnline: false,
      currentRoom: null,
      totalYuuriPoint: 0
    };

    await setDoc(doc(db, "users", user.uid), initUser);
  } catch (error) {
    console.log("error", error);
  }
};
