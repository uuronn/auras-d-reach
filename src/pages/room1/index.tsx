import { css } from "@emotion/react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "firebaseConfig";
import { useEffect, useState } from "react";
import { Button } from "~/components/Button";
import { useAuthContext } from "~/context/hooks/useAuthContext";
import { LYRICS } from "~/data";
import { createDocRef } from "~/firebase/store/createDocRef";
import { resetAnswer } from "~/firebase/store/test/resetAnswer";
import { updateAnswer } from "~/firebase/store/updateAnswer";
import { CurrentRoomQuestion } from "~/types";

export const Room1 = (): JSX.Element => {
  const { user } = useAuthContext();
  const [isAllAnswer, setIsAllAnswer] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentRoomQuestion, setCurrentRoomQuestion] =
    useState<CurrentRoomQuestion>();
  const [over, setOver] = useState(true);
  const { usersDocRef, roomListDocRef } = createDocRef();
  const randomIndex = Math.floor(Math.random() * LYRICS.length);
  const randomCurrentQuestion = LYRICS[randomIndex];

  useEffect(() => {
    if (user) {
      (async () => {
        await updateDoc(usersDocRef(user.uid), {
          currentRoom: 1
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
          console.log("こんにちは", doc.data());

          setCurrentRoomQuestion(
            doc.data().currentRoomQuestion as CurrentRoomQuestion
          );
          setCurrentQuestion(doc.data().currentLyric);
        }

        // TODO: 配列が空だったら以下の処理は走らせない。

        if (
          JSON.stringify(doc.data()?.answerList.length) ===
          JSON.stringify(usersDocs.docs.map((doc) => doc.id).length)
        ) {
          console.log(
            JSON.stringify(doc.data()?.answerList.length) ===
              JSON.stringify(usersDocs.docs.map((doc) => doc.id).length)
          );

          console.log("どうですか");
          console.log(doc.data()?.currentLyric);
        }

        setIsAllAnswer(
          JSON.stringify(doc.data()?.answerList.sort()) ===
            JSON.stringify(usersDocs.docs.map((doc) => doc.id).sort())
        );
      });
    }
  }, [user]);

  if (!user) return <div>ユーザー情報が存在しません。</div>;

  const answerHandler = (choice: string) => {
    if (currentRoomQuestion?.answer === choice) {
      console.log("正解");
    }
  };

  return (
    <div css={main}>
      {over && <div css={overlay}>他のユーザーが入るまでお待ちください...</div>}
      こんにちはRoom1です
      <p>{user.uid}</p>
      <p>現在の問題: {currentQuestion}</p>
      <p>現在の答え: {currentRoomQuestion?.answer}</p>
      <p>現在の歌詞: {currentRoomQuestion?.lyric}</p>
      {isAllAnswer && <div css={modalStyle}>全員の回答が完了しました</div>}
      {currentRoomQuestion?.choices.map((choice) => (
        <Button key={choice} onClick={() => answerHandler(choice)}>
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
