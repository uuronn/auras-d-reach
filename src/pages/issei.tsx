import { getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { createDocRef } from "~/firebase/store/createDocRef";

const { roomListDocRef } = createDocRef();

export const Issei = () => {
  useEffect(() => {
    (async () => {
      const room1Doc = await getDoc(roomListDocRef("room1"));
      console.log(room1Doc.data());
    })();
  });

  return <div>Issei</div>;
};
