import { User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

export const updateAnswer = async (user: User) => {
  // // userデータを取得
  // const userRef = doc(db, "users", user.uid);
  // const userDoc = await getDoc(userRef);
  // if (!userDoc.exists()) return;

  // // TODOもしかしたら isAnswer 要らないかもしれない
  // const isAnswer: boolean = userDoc.data().room1.isAnswer;

  // // 既に回答済みならアラートを返す
  // if (isAnswer) return alert("回答しました");

  // // userデータのisAnswerをtrueにする
  // await updateDoc(userRef, {
  //   room1: {
  //     isAnswer: true,
  //     point: userDoc.data().room1.point,
  //     ranking: "unranked"
  //   }
  // });

  // room1データを取得
  const room1Ref = doc(db, "roomList", "room1");
  const room1Doc = await getDoc(room1Ref);
  if (!room1Doc.exists()) return;

  const answerList: string[] = room1Doc.data().answerList;

  if (answerList.includes(user.uid)) return alert("回答済みです");

  // roomListコレクションのroom1に自分のuidが含まれてなかったらuidを追加
  if (!answerList.includes(user.uid)) {
    answerList.push(user.uid);

    // room1の配列を更新
    await updateDoc(room1Ref, {
      answerList: answerList
    });
  }
};
