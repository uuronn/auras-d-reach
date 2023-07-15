import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

interface RankingNameProps extends ComponentPropsWithRef<"p"> {
  RankingName: string;
}

const RankingNameCSS = css`
  background-color: silver;
  font-size: 30px;
  width: 100%;
  text-align: center;
  padding: 10px;
`;

export const RankingName = ({ RankingName, ...props }: RankingNameProps) => {
  console.log(RankingName);

  return (
    <p css={RankingNameCSS} {...props}>
      {RankingName}
    </p>
  );
};
