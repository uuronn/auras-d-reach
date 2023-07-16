import { css } from "@emotion/react";
import { RankingData } from "~/components/Ranking";

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

function Ranking() {
  return (
    <div css={MainSection}>
      <p css={RankingText}>優里ランキング</p>
      <div css={ranking}>
        <RankingData RankingName="takuaki" point={1} />
        <RankingData RankingName="turu" point={2} />
        <RankingData RankingName="issei" point={0} />
      </div>
    </div>
  );
}

export default Ranking;
