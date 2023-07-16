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
import { useAuthContext } from "~/context/hooks/useAuthContext";
import { LYRICS } from "~/data";
import { createDocRef } from "~/firebase/store/createDocRef";
import { updateAnswer } from "~/firebase/store/updateAnswer";

export const Room1 = (): JSX.Element => {
  const { user } = useAuthContext();
  const [modal, setModal] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [over, setOver] = useState(true);
  const { usersDocRef, roomListDocRef } = createDocRef();

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
      const randomIndex = Math.floor(Math.random() * LYRICS.length);
      const randomLyric = LYRICS[randomIndex].lyric;
      await updateDoc(roomListDocRef("room1"), {
        currentLyric: randomLyric
      });
    })();
  }, [modal]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "users"), where("currentRoom", "==", 1));

      // room1にいるユーザーリストをリアルタイムで取得
      onSnapshot(q, async (querySnapshot) => {
        if (querySnapshot.docs.length === 1) {
          setOver(true);
          console.log("aあああああふぁtrueだよよっよよｙ");
          const randomIndex = Math.floor(Math.random() * LYRICS.length);
          const randomLyric = LYRICS[randomIndex].lyric;

          await updateDoc(roomListDocRef("room1"), {
            currentLyric: randomLyric
          });
        }

        if (querySnapshot.docs.length >= 2) {
          setOver(false);
        }
      });

      onSnapshot(roomListDocRef("room1"), async (doc) => {
        const usersDocs = await getDocs(q);

        if (usersDocs.docs.length >= 2) {
          setCurrentQuestion(doc.data()?.currentLyric);
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

        setModal(
          JSON.stringify(doc.data()?.answerList.sort()) ===
            JSON.stringify(usersDocs.docs.map((doc) => doc.id).sort())
        );
      });
    }
  }, [user]);

  if (!user)
    return <div>ユーザー情報が存在しません。ログインしていないかも</div>;

  // テスト用の関数
  const resetIsAnswer = async () => {
    console.log("resetIsAnswer関数を実行させました");

    const userDoc = await getDoc(usersDocRef(user.uid));
    const room1Doc = await getDoc(roomListDocRef("room1"));

    if (!userDoc.exists()) return;
    if (!room1Doc.exists()) return;

    if (!userDoc.data().room1.isAnswer)
      return alert("isAnswerがfalseのままです");

    const answerList: string[] = room1Doc.data().answerList;

    if (answerList.includes(user.uid)) {
      const uidIndex = answerList.indexOf(user.uid);
      answerList.splice(uidIndex, 1);

      // room1の配列を更新
      await updateDoc(roomListDocRef("room1"), {
        answerList: answerList
      });
    }

    await updateDoc(usersDocRef(user.uid), {
      room1: { isAnswer: false, point: 0, ranking: "unranked" }
    });

    console.log("resetIsAnswer関数の処理が終わりました。");
  };

  return (
    <div css={main}>
      {over && <div css={overlay}>他のユーザーが入るまでお待ちください...</div>}
      こんにちはRoom1です
      <p>{user.uid}</p>
      <p>現在の問題: {currentQuestion}</p>
      {modal && <div css={modalStyle}>全員の回答が完了しました</div>}
      <button onClick={() => updateAnswer(user)}>A. ドライフラワー</button>
      <button onClick={() => updateAnswer(user)}>B. ピーターパン</button>
      <button onClick={() => updateAnswer(user)}>C. ビリミリオン</button>
      <button onClick={() => updateAnswer(user)}>D. タイムマシン</button>
      <button css={testButton} onClick={resetIsAnswer}>
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
