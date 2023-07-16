import { css } from "@emotion/react";
import { useAuthContext } from "../context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDoc, updateDoc } from "firebase/firestore";
import { createDocRef } from "~/firebase/store/createDocRef";
import { UserStatus } from "~/types";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { usersDocRef, roomListDocRef } = createDocRef();

  useEffect(() => {
    if (user) {
      (async () => {
        const room1Doc = await getDoc(roomListDocRef("room1"));
        if (!room1Doc.exists()) return;

        const answerList: string[] = room1Doc.data().answerList;
        const userStatusList: UserStatus[] = room1Doc.data().userStatusList;

        await updateDoc(usersDocRef(user.uid), {
          currentRoom: null,
          room1: { isAnswer: false, point: 0, ranking: "unranked" }
        });

        if (
          answerList.includes(user.uid) ||
          userStatusList.map((userStatus) => userStatus.id).includes(user.uid)
        ) {
          const uidIndex = answerList.indexOf(user.uid);
          answerList.splice(uidIndex, 1);

          const userStatusIndex = userStatusList.findIndex(
            (item) => item.id === user.uid
          );

          userStatusList.splice(userStatusIndex, 1);

          await updateDoc(roomListDocRef("room1"), {
            answerList,
            userStatusList
          });
        }
      })();
    }
  }, [user]);

  if (!user) {
    navigate("/auth/login");
    return <div>loading...</div>;
  }

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
    </div>
  );
};

export default Home;
