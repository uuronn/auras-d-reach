import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseConfig";
import { Fragment, useEffect, useState } from "react";

export const withFirebaseUserData = (
  Component: ({ user }: { user: User }) => JSX.Element
): (() => JSX.Element) => {
  return () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        }
      });
    }, []);

    if (!user) return <Fragment />;

    return <Component user={user} />;
  };
};
