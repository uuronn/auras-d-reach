import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "firebaseConfig";

export const useLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const { user } = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "users", user.uid), {
      online: false,
      totalYuuriPoint: 0
    });
  } catch (error) {
    console.log("error", error);
  }
};
