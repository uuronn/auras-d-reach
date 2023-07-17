import { css } from "@emotion/react";
import { useAuthContext } from "../context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDoc, updateDoc } from "firebase/firestore";
import { createDocRef } from "~/firebase/store/createDocRef";
import { UserStatus } from "~/types";
import Room from "~/components/Room";
import OnlineCounter from "~/components/Online";
import Logout from "~/components/Logout";

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
            userStatusList,
            questionCounter: 0
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
    location.href = path;
  };

  return (
    <div css={whole}>
      <div css={header}>
        <OnlineCounter onlineNumber={1} />
        <Logout />
      </div>
      <div css={room}>
        <Room
          personNumbers={1}
          roomNumber={1}
          onClick={() => onClick("/room1")}
        />
        <Room
          personNumbers={5}
          roomNumber={2}
          onClick={() => onClick("/room2")}
        />
        <Room
          personNumbers={3}
          roomNumber={3}
          onClick={() => onClick("/room3")}
        />
      </div>
    </div>
  );
};

export default Home;

const whole = css`
  width: 80%;
  height: 100vh;
  margin: 0 auto;

  @media (max-width: 500px) {
    width: 80%;
  }
`;

const header = css`
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
  @media (max-width: 500px) {
    margin: 5% 0;
  }
`;

const room = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2%;
  justify-content: center;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
