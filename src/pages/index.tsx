import { css } from "@emotion/react";
import { Button } from "../components/Button";
import { useGoogleLogin } from "./auth/login/hooks/useGoogleLogin";
import { useAuthContext } from "../context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const [test, setTest] = useState<boolean>();

  const navigate = useNavigate();

  const { user } = useAuthContext();

  if (!user) return <div>loading...</div>;
  // useEffect(() => {
  //   (async () => {
  //     const res = await getDoc(doc(db, "users", "test-id"));
  //     if (res.exists()) setTest(res.data()?.isAnswer);
  //   })();
  // }, []);

  // useEffect(() => {
  //   console.log("agjjbb", test);
  // }, [test]);

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
