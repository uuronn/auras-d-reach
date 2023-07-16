import { css } from "@emotion/react";
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "firebaseConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components/Button";
import { PlayerName } from "~/components/PlayerName";
import { useAuthContext } from "~/context/hooks/useAuthContext";
import { LYRICS } from "~/data";
import { createDocRef } from "~/firebase/store/createDocRef";
import { resetAnswer } from "~/firebase/store/test/resetAnswer";
import { updateAnswer } from "~/firebase/store/updateAnswer";
import { CurrentRoomQuestion, Room, UserStatus } from "~/types";

export const Room1 = (): JSX.Element => {
  const { user } = useAuthContext();
  const [isAllAnswer, setIsAllAnswer] = useState<boolean>(false);
  // const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentRoomQuestion, setCurrentRoomQuestion] =
    useState<CurrentRoomQuestion>();
  const [over, setOver] = useState(true);
  const { usersDocRef, roomListDocRef } = createDocRef();
  const [isAnswer, setIsAnswer] = useState<boolean>(false);
  const randomIndex = Math.floor(Math.random() * LYRICS.length);
  const [userStatusList, setUserStatusList] = useState<UserStatus[]>([]);
  const randomCurrentQuestion = LYRICS[randomIndex];
  const [currentPoint, setCurrentPoint] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      (async () => {
        const room1Doc = await getDoc(roomListDocRef("room1"));

        await updateDoc(usersDocRef(user.uid), {
          currentRoom: 1
        });

        if (!room1Doc.exists()) return console.log("room1Doc");

        if (!room1Doc.exists) return console.log("ああああ");

        const userStatusList: UserStatus[] = room1Doc.data().userStatusList;

        if (
          !userStatusList.map((userStatus) => userStatus.id).includes(user.uid)
        ) {
          userStatusList.push({
            id: user.uid,
            name: user.displayName ? user.displayName : "名無し",
            isAnswer: false
          });
        }

        await updateDoc(roomListDocRef("room1"), {
          userStatusList: userStatusList
        });
      })();
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      await updateDoc(roomListDocRef("room1"), {
        currentLyric: randomCurrentQuestion.lyric
      });

      await updateDoc(roomListDocRef("room1"), {
        currentRoomQuestion: {
          answer: randomCurrentQuestion.title,
          choices: randomCurrentQuestion.choices,
          lyrics: randomCurrentQuestion.lyric
        }
      });
    })();
  }, [isAllAnswer]);

  useEffect(() => {
    if (user) {
      const usersQuery = query(
        collection(db, "users"),
        where("currentRoom", "==", 1)
      );

      // room1にいるユーザーリストをリアルタイムで取得
      onSnapshot(usersQuery, async (querySnapshot) => {
        if (querySnapshot.docs.length === 1) {
          setOver(true);
        }

        if (querySnapshot.docs.length >= 2) {
          setOver(false);
        }
      });

      onSnapshot(roomListDocRef("room1"), async (doc) => {
        const usersDocs = await getDocs(usersQuery);

        if (!doc.exists()) return;

        if (usersDocs.docs.length >= 2) {
          // console.log("こんにちは", doc.data());

          setUserStatusList(doc.data().userStatusList);

          setCurrentRoomQuestion(
            doc.data().currentRoomQuestion as CurrentRoomQuestion
          );
          // setCurrentQuestion(doc.data().currentLyric);
        }

        // TODO: 配列が空だったら以下の処理は走らせない。

        if (
          JSON.stringify(doc.data()?.answerList.sort()) ===
          JSON.stringify(usersDocs.docs.map((doc) => doc.id).sort())
        ) {
          const userDoc = await getDoc(usersDocRef(user.uid));
          const room1Doc = await getDoc(roomListDocRef("room1"));

          if (!userDoc.exists()) return console.log("終了");
          if (!room1Doc.exists()) return console.log("終了");

          await updateDoc(usersDocRef(user.uid), {
            room1: {
              point: userDoc.data().room1.point,
              isAnswer: false,
              ranking: "unranked"
            } as Room
          });

          await updateDoc(roomListDocRef("room1"), {
            answerList: []
          });

          const userStatusList: UserStatus[] = doc.data().userStatusList;

          const userStatusReset = userStatusList.map((userStatus) => {
            return { ...userStatus, isAnswer: false };
          });

          console.log("こんにちだあああは", userStatusReset);

          await updateDoc(roomListDocRef("room1"), {
            userStatusList: userStatusReset
          });

          console.log("比較成功です");
          // console.log(
          //   JSON.stringify(doc.data()?.answerList.length) ===
          //     JSON.stringify(usersDocs.docs.map((doc) => doc.id).length)
          // );
          // console.log("どうですか");
          // console.log(doc.data()?.currentLyric);

          if (room1Doc.data().questionCounter <= 10) {
            await updateDoc(roomListDocRef("room1"), {
              questionCounter: room1Doc.data().questionCounter + 1
            });
          } else {
            navigate("/room1/result");
          }
        }

        setIsAllAnswer(
          JSON.stringify(doc.data()?.answerList.sort()) ===
            JSON.stringify(usersDocs.docs.map((doc) => doc.id).sort())
        );
      });

      onSnapshot(usersDocRef(user.uid), (doc) => {
        setIsAnswer(doc.data()?.room1.isAnswer);
      });
    }
  }, [user]);

  if (!user) return <div>ユーザー情報が存在しません。</div>;

  const answerHandler = async (choice: string) => {
    const userDoc = await getDoc(usersDocRef(user.uid));

    if (!userDoc.exists()) return console.log("終了");

    if (currentRoomQuestion?.answer === choice) {
      // 回答済みにさせる
      updateAnswer(user);

      console.log("正解");

      console.log("こんにちはですよ", userDoc.data().room1.point + 1);

      setCurrentPoint(userDoc.data().room1.point + 1);

      await updateDoc(usersDocRef(user.uid), {
        room1: {
          point: userDoc.data().room1.point + 1,
          isAnswer: true,
          ranking: "unranked"
        } as Room
      });
    } else {
      // 回答済みにさせる
      updateAnswer(user);

      setCurrentPoint(userDoc.data().room1.point);

      console.log("不正解");
      await updateDoc(usersDocRef(user.uid), {
        room1: {
          point: userDoc.data().room1.point,
          isAnswer: true,
          ranking: "unranked"
        } as Room
      });
    }
  };

  return (
    <div css={main}>
      {over && <div css={overlay}>他のユーザーが入るまでお待ちください...</div>}
      こんにちはRoom1です
      <p>{user.uid}</p>
      {userStatusList.map((user) => (
        <PlayerName
          key={user.id}
          playerName={user.name}
          isAnswer={user.isAnswer}
        />
      ))}
      {/* <p>現在の問題: {currentQuestion}</p> */}
      {/* <p>現在の答え: {currentRoomQuestion?.answer}</p> */}
      <p>現在の歌詞: {currentRoomQuestion?.lyrics}</p>
      <p>現在の正解数: {currentPoint}</p>
      {isAllAnswer && <div css={modalStyle}>全員の回答が完了しました</div>}
      {currentRoomQuestion?.choices.map((choice) => (
        <Button
          key={choice}
          onClick={() => answerHandler(choice)}
          disabled={isAnswer}
        >
          {choice}
        </Button>
      ))}
      <Button
        css={css`
          display: inline;
          width: fit-content;
        `}
        onClick={() => updateAnswer(user)}
      >
        保留のボタン
      </Button>
      {/* <button onClick={() => updateAnswer(user)}>B. ピーターパン</button>
      <button onClick={() => updateAnswer(user)}>C. ビリミリオン</button>
      <button onClick={() => updateAnswer(user)}>D. タイムマシン</button> */}
      <button css={testButton} onClick={() => resetAnswer(user.uid)}>
        回答リセット用のテストボタン
      </button>
    </div>
  );
};

const overlay = css`
  background: black;
  position: absolute;
  opacity: 0.7;
  text-align: center;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  font-size: 20px;
  color: white;
  line-height: 100vh;
`;

const main = css`
  display: flex;
  flex-direction: column;
`;

const testButton = css`
  position: absolute;
  right: 0;
  background: red;
  opacity: 0.8;
`;

const modalStyle = css`
  background: red;
  position: absolute;
  top: 0;
`;
