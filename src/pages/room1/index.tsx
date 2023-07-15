import { css } from "@emotion/react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "firebaseConfig";
import { useEffect } from "react";
import { useAuthContext } from "~/context/hooks/useAuthContext";

export const Room1 = (): JSX.Element => {
  const { user } = useAuthContext();

  const q = query(collection(db, "users"), where("currentRoom", "==", 1));

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      console.log("usersのonSnapshotの処理が走りました。", querySnapshot);
    });

    onSnapshot(doc(db, "roomList", "room1"), (doc) => {
      console.log("roomListのonSnapshotの処理が走りました。", doc);
    });
  }, []);

  if (!user)
    return <div>ユーザー情報が存在しません。ログインしていないかも</div>;

  // 回答すると自分のisAnswerがtrueにさせる関数
  const updateAnswer = async () => {
    console.log("updateAnswer関数が走りました");

    // userデータを取得
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) return;

    // 既に回答済みならアラートを返す
    if (userDoc.data().room1.isAnswer) return alert("回答済みです");

    // userデータのisAnswerをtrueにする
    await updateDoc(doc(db, "users", user.uid), {
      room1: { isAnswer: true, point: 0, ranking: "unranked" }
    });

    // room1データを取得
    const room1Doc = await getDoc(doc(db, "roomList", "room1"));
    if (!room1Doc.exists()) return;

    const answerList: string[] = room1Doc.data().answerList;

    // roomListコレクションの中のroom1に自分のuidが含まれてなかったらuidを追加
    if (!answerList.includes(user.uid)) {
      answerList.push(user.uid);

      // room1の配列を更新
      await updateDoc(doc(db, "roomList", "room1"), {
        answerList: answerList
      });
    }

    console.log("updateAnswer関数の処理が終わりました。");
  };

  // テスト用の関数
  const resetIsAnswer = async () => {
    console.log("resetIsAnswer関数を実行させました");

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const room1Doc = await getDoc(doc(db, "roomList", "room1"));

    if (!userDoc.exists()) return;
    if (!room1Doc.exists()) return;

    if (!userDoc.data().room1.isAnswer)
      return alert("isAnswerがfalseのままです");

    const answerList: string[] = room1Doc.data().answerList;

    if (answerList.includes(user.uid)) {
      const uidIndex = answerList.indexOf(user.uid);
      answerList.splice(uidIndex, 1);

      // room1の配列を更新
      await updateDoc(doc(db, "roomList", "room1"), {
        answerList: answerList
      });
    }

    await updateDoc(doc(db, "users", user.uid), {
      room1: { isAnswer: false, point: 0, ranking: "unranked" }
    });

    console.log("resetIsAnswer関数の処理が終わりました。");
  };

  return (
    <div css={main}>
      こんにちはRoom1です
      <p>{user.uid}</p>
      <button onClick={updateAnswer}>A. ドライフラワー</button>
      <button onClick={updateAnswer}>B. ピーターパン</button>
      <button onClick={updateAnswer}>C. ビリミリオン</button>
      <button onClick={updateAnswer}>D. タイムマシン</button>
      <button css={testButton} onClick={resetIsAnswer}>
        回答リセット用のテストボタン
      </button>
    </div>
  );
};

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
