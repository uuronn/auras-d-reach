import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseConfig";
import { Fragment, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export const FirebaseAuthGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      return navigate("/");
    } else {
      return navigate("/auth/login");
    }
  });

  return <Fragment>{children}</Fragment>;
};
