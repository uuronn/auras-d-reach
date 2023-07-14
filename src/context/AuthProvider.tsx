import { createContext, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "firebaseConfig";

export type AuthState = {
  user: User | null | undefined;
};

const initialState: AuthState = {
  user: undefined
};

export const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthState>(initialState);

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        console.log("user", user);
        setUser({
          user
        });
      });
    } catch (error) {
      setUser(initialState);
      throw error;
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
