import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseConfig";
import { Fragment, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const VerifyFirebaseAuthGuard = ({
  children
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return navigate("/");
      } else {
        return navigate("/auth/login");
      }
    });
  }, [navigate]);

  return <Fragment>{children}</Fragment>;
};
