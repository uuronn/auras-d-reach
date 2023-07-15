import { css } from "@emotion/react"
import { RankingData } from "~/components/Ranking";

const RankingText = css`
font-size: 40px;
font-weight: 500;
margin: 10% auto;
`;
const MainSection = css`
width: 60%;
margin: 0 auto;
text-align: center;
`;

function Ranking() {
  return (
    <div css={MainSection}>
        <p css={RankingText}>優里ランキング</p>
        <RankingData RankingName="takuaki" point={1000}/>
        <RankingData RankingName="turu" point={2}/>
        <RankingData RankingName="issei" point={-5000}/>
    </div>
  )
}

export default Ranking