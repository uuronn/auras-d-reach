import { css } from "@emotion/react";
import {
  collection,
  query,
  getDocs,
  orderBy,
  DocumentData
} from "firebase/firestore";
import { db } from "firebaseConfig";
import { useEffect, useState } from "react";
import { RankingData } from "~/components/RankingData";

function Ranking() {
  const [playerList, setPlayerList] = useState<DocumentData[]>([]);
  useEffect(() => {
    (async () => {
      const q = query(collection(db, "ranking"), orderBy("totalPoint", "desc"));
      getDocs(q).then((snapshot) => {
        const playerData = snapshot.docs.map((doc) => {
          return [doc.id,doc.data()];
        });
        setPlayerList(playerData);
      });
    })();
  }, []);

  return (
    <div css={MainSection}>
      <p css={RankingText}>優里ランキング</p>
      <div css={ranking}>
        {playerList.map((playerData) => {
          return (
            <RankingData
              key={playerData[0]}
              RankingName={playerData[1].name}
              point={playerData[1].totalPoint}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Ranking;

const RankingText = css`
  font-size: 40px;
  font-weight: 500;
  margin: 10% auto;
  @media (max-width: 500px) {
    font-size: 30px;
    margin: 20% auto;
  }
`;
const MainSection = css`
  width: 60%;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 500px) {
    width: 100%;
    margin: 0;
  }
`;

const ranking = css`
  @media (max-width: 500px) {
    margin-left: auto;
    width: 80%;
  }
`;
