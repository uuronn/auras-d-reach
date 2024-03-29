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
import King from "../../assets/king.png";
import Square from "~/components/Square";

const kingImg = css`
  display: block;
  height: 80px;
  margin-left: 5%;
  @media (max-width: 500px) {
    height: 40px;
  }
`;

const section = css`
  display: flex;
  margin: 0 auto;
`;

const sec = css`
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const whole = css`
  width: 100%;
`

function Ranking() {
  const [playerList, setPlayerList] = useState<DocumentData[]>([]);
  const [topPlayer, setTopPlayer] = useState<string | DocumentData>("");
  useEffect(() => {
    (async () => {
      const q = query(collection(db, "ranking"), orderBy("totalPoint", "desc"));
      getDocs(q).then((snapshot) => {
        const playerData = snapshot.docs.map((doc) => {
          return [doc.id, doc.data()];
        });
        setPlayerList(playerData);
        setTopPlayer(playerData[0][0]);
      });
    })();
  }, []);
  return (
    <div css={whole}>
      {playerList.map((playerData) => {
        return (
          playerData[0] == topPlayer && (
            <Square topPlayerName={playerData[1].name} key={playerData[0]}/>
          )
        );
      })}
      <div css={sec}>
        <p css={RankingText}>優里ランキング</p>
        <div css={section}>
          {playerList.map((playerData) => {
            return (
              playerData[0] == topPlayer && (
                <img src={King} alt="" css={kingImg} key={playerData[0]} />
              )
            );
          })}

          <div css={MainSection}>
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
      </div>
    </div>
  );
}

export default Ranking;

const RankingText = css`
  font-size: 40px;
  font-weight: 500;
  margin: 5% auto 10%;
  text-align: center;
  color: gold;
  @media (max-width: 500px) {
    font-size: 30px;
    margin: 20% auto;
  }
`;
const MainSection = css`
  width: 80%;
  margin: 0 auto 0 0;
  text-align: center;
  @media (max-width: 500px) {
    width: 80%;
    margin: 0;
  }
`;
