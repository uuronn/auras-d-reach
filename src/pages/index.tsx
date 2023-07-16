import { css } from "@emotion/react";
import { Button } from "../components/Button";
import { useGoogleLogin } from "./auth/login/hooks/useGoogleLogin";
import { useAuthContext } from "../context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      (async () => {
        const res = await getDoc(doc(db, "users", user.uid));
        console.log("res", res.data());

        await updateDoc(doc(db, "users", user.uid), {
          currentRoom: null
        });
      })();
    }
  }, [user]);

  if (!user) return <div>loading...</div>;

  // const click = async () => {
  //   await setDoc(doc(db, "users", "test-id"), {
  //     isAnswer: true
  //   });
  // };

  // onSnapshot(doc(db, "users", "test-id"), (doc) => {
  //   console.log("Current data: ", doc.data()?.isAnswer);
  //   setTest(doc.data()?.isAnswer);
  // });

  const onClick = (path: string) => {
    navigate(path);
  };

  return (
    <div
      css={css`
        background: pink;
      `}
    >
      <button onClick={() => onClick("room1")}>Room1へ</button>
      <button onClick={() => onClick("room2")} disabled>
        Room2へ
      </button>
      <button onClick={() => onClick("room3")}>Room3へ</button>
      {/* {test && (
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
      )} */}
      hello world
      {/* <p>name: {user?.displayName}</p>
      <Button onClick={click}>答える</Button> */}
      <Button onClick={useGoogleLogin}>test</Button>
    </div>
  );
};

export default Home;
