import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";

export const useLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
