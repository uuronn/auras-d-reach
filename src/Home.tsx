import { css } from "@emotion/react";
import { Button } from "./components/Button";
import { useGoogleLogin } from "./pages/auth/login/hooks/useGoogleLogin";
import { useEffect, useState } from "react";
import { useAuthContext } from "./context/hooks/useAuthContext";
import { onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

const Home = () => {
  const [test, setTest] = useState<boolean>();

  const { user } = useAuthContext();
  useEffect(() => {
    (async () => {
      const res = await getDoc(doc(db, "users", "test-id"));
      if (res.exists()) setTest(res.data()?.isAnswer);
    })();
  }, []);

  useEffect(() => {
    console.log("agjjbb", test);
  }, [test]);

  const click = async () => {
    await setDoc(doc(db, "users", "test-id"), {
      isAnswer: true
    });
  };
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const q = query(collection(db, "users"), where("isOnline", "==", true));

  //     getDocs(q).then((snapshot) => setOnlineUser(snapshot.docs.length));
  //   }, 5000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  onSnapshot(doc(db, "users", "test-id"), (doc) => {
    console.log("Current data: ", doc.data()?.isAnswer);
    setTest(doc.data()?.isAnswer);
  });

  // console.log(unsub);

  return (
    <div
      css={css`
        background: pink;
      `}
    >
      {test && (
        <div
          css={css`
            background: green;
            width: 300px;
            height: 300px;
            position: absolute;
            right: 0;
            top: 0;
          `}
        >
          ああっfじょじゃ；fjさ；fじゃs；lfj；ｆ
        </div>
      )}
      hello world
      <p>name: {user?.displayName}</p>
      <Button onClick={click}>答える</Button>
      <Button onClick={useGoogleLogin}>test</Button>
    </div>
  );
};

export default Home;
