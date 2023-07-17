import { css } from "@emotion/react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useEffect, useState } from "react";
import { RankingData } from "~/components/RankingData";
import King from "../../assets/king.png";
import { ResultUser } from "~/types";
import { Button } from "~/components/Button";
import { useNavigate } from "react-router-dom";

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
  justify-content: center;
  max-width: 1200px;
  width: 100%;
`;

const button = css`
  position: absolute;
  top: 24px;
  left: 24px;
  font-size: 12px;

  @media (min-width: 600px) {
    font-size: 24px;
    top: 64px;
    left: 64px;
  }
`;

function Result() {
  const navigate = useNavigate();
  const [resultList, setResultList] = useState<ResultUser[]>([]);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "users"), where("currentRoom", "==", 1));

      getDocs(q).then((snapshot) => {
        const playerData = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().displayName,
            point: doc.data().room1.point
          };
        });

        console.log("player", playerData);

        const resultList = playerData.sort((a, b) => b.point - a.point);
        console.log("こんにちは", resultList[0].name);

        setResultList(resultList);
      });
    })();
  }, []);

  return (
    <div>
      <Button css={button} onClick={() => navigate("/")}>
        TOPページへ戻る
      </Button>
      <p css={RankingText}>結果</p>
      <div css={section}>
        <img src={King} css={kingImg} alt="かんむり" />
        <div>
          {resultList.map((result) => {
            return (
              <RankingData
                key={result.id}
                RankingName={result.name ? result.name : "名無し"}
                point={result.point}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Result;

const RankingText = css`
  font-size: 40px;
  font-weight: 500;
  margin: 10% auto;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 30px;
    margin: 20% auto;
  }
`;
