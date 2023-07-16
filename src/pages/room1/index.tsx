import { css } from "@emotion/react";
import {
  collection,
  doc,
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

const LYRICS = [
  { title: "ドライフラワー", lyric: "多分私じゃなくて" },
  { title: "レオ", lyric: "名前はレオ、名前呼んでよ" },
  { title: "桜晴", lyric: "今日はうまく笑えない" },
  { title: "タイムマシン", lyric: "タイムマシンに委ねて" },
  { title: "ミズキリ", lyric: "あなただけが瞳に映るの" },
  { title: "ビリミリオン", lyric: "それなら倍の100億だそう" }
];

export const Room1 = (): JSX.Element => {
  const { user } = useAuthContext();
  const [modal, setModal] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [over, setOver] = useState(true);

  useEffect(() => {
    if (user) {
      (async () => {
        await updateDoc(doc(db, "users", user.uid), {
          currentRoom: 1
        });
      })();
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      const randomIndex = Math.floor(Math.random() * LYRICS.length);
      const randomLyric = LYRICS[randomIndex].lyric;
      await updateDoc(doc(db, "roomList", "room1"), {
        currentLyric: randomLyric
      });
    })();
  }, [modal]);

  useEffect(() => {
    if (user) {
      console.log("userId: ", user.uid);
      const q = query(collection(db, "users"), where("currentRoom", "==", 1));

      // room1にいるユーザーリストをリアルタイムで取得
      onSnapshot(q, async (querySnapshot) => {
        // const room1 = await getDoc(doc(db, "roomList", "room1"));

        console.log("aafjgjg", querySnapshot.docs.length);

        if (querySnapshot.docs.length === 1) {
          setOver(true);
          console.log("aあああああふぁtrueだよよっよよｙ");
          const randomIndex = Math.floor(Math.random() * LYRICS.length);
          const randomLyric = LYRICS[randomIndex].lyric;
          await updateDoc(doc(db, "roomList", "room1"), {
            currentLyric: randomLyric
          });
        }

        if (querySnapshot.docs.length >= 2) {
          setOver(false);
        }

        // console.log(
        //   "usersのリアルタイムの中で、roomListを取得",
        //   room1.data()?.answerList
        // );

        // const test = await getDoc(doc(db, "users", user.uid));
        // console.log("usersのリアルタイムの中で、ドキュメントを取得", test.id);

        // console.log(
        //   "usersのonSnapshotの処理が走りました。",
        //   querySnapshot.docs.map((doc) => doc.id)
        // );
      });

      onSnapshot(doc(db, "roomList", "room1"), async (doc) => {
        // console.log(
        //   "roomListのonSnapshotの処理が走りました。",
        //   doc.data()?.answerList
        // );

        const usersDocs = await getDocs(q);

        if (usersDocs.docs.length == 1) {
          setCurrentQuestion("");
        }

        if (usersDocs.docs.length >= 2) {
          setCurrentQuestion(doc.data()?.currentLyric);
        }

        // console.log(
        //   "ああああああ",
        //   JSON.stringify(doc.data()?.answerList.sort())
        // );

        // console.log(
        //   "あい",
        //   JSON.stringify(usersDocs.docs.map((doc) => doc.id).sort())
        // );

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
          // const res = await getDoc(doc(db, "users", user.uid));
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

      console.log("answerList", answerList);

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
      {over && <div css={overlay}>他のユーザーが入るまでお待ちください...</div>}
      こんにちはRoom1です
      <p>{user.uid}</p>
      <p>現在の問題: {currentQuestion}</p>
      {modal && <div css={modalStyle}>全員の回答が完了しました</div>}
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
