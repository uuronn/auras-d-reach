import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

interface RankingProps extends ComponentPropsWithRef<"p"> {
  RankingName: string;
  point: number;
}
const RankingNameCSS = css`
  background-color: #ddd;
  font-size: 40px;
  padding: 5px;
  width: 100%;
  margin: 10px;
  text-align: center;
  font-weight: bold;
  @media (max-width:500px) {
    font-size: 20px;
    width: 60%;
    margin: 5px;
  }
`;
const pointCSS = css`
  background-color: #eee;
  font-size: 40px;
  padding: 5px;
  margin: 10px;
  width: 100%;
  text-align: center;
  @media (max-width:500px) {
    font-size: 20px;
    width: 30%;
    margin: 5px;
  }
`;
const Ranking = css`
  display: flex;
  width: 100%;
`;

export const RankingData = ({ RankingName, point, ...props }: RankingProps) => {
  return (
    <div css={Ranking}>
      <p css={RankingNameCSS} {...props}>
        {RankingName}
      </p>
      <p css={pointCSS} {...props}>
        {point}point
      </p>
    </div>
  );
};
