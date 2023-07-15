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
  width: 65%;
  display: inline-block;
  margin: 10px;
  text-align: center;
  font-weight: bold;
`;
const pointCSS = css`
  background-color: #eee;
  font-size: 40px;
  padding: 5px;
  margin: 10px;
  width: 30%;
  display: inline-block;
  text-align: center;
`;
const Ranking = css`
display: flex;
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
