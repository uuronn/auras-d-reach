import { getDoc, updateDoc } from "firebase/firestore";
import { createDocRef } from "../createDocRef";

const { usersDocRef, roomListDocRef } = createDocRef();

// テスト用の関数
export const resetAnswer = async (uid: string) => {
  const userDoc = await getDoc(usersDocRef(uid));
  const room1Doc = await getDoc(roomListDocRef("room1"));

  if (!userDoc.exists()) return;
  if (!room1Doc.exists()) return;

  if (!userDoc.data().room1.isAnswer) return alert("isAnswerがfalseのままです");

  const answerList: string[] = room1Doc.data().answerList;

  if (answerList.includes(uid)) {
    const uidIndex = answerList.indexOf(uid);
    answerList.splice(uidIndex, 1);

    await updateDoc(roomListDocRef("room1"), {
      answerList: answerList
    });
  }

  await updateDoc(usersDocRef(uid), {
    room1: { isAnswer: false, point: 0, ranking: "unranked" }
  });
};
