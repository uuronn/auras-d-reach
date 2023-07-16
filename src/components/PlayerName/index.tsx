import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";
import Check from "../../assets/check.svg";

interface PlayerNameProps extends ComponentPropsWithRef<"div"> {
  playerName: string;
  isAnswer: boolean;
}

const player = css`
  color: #eee;
  padding: 13px;
  background-color: #444;
  width: fit-content;
  border-radius: 16px;
  display: flex;
  margin: 10px;
`;

const CheckImg = css`
  /* display: block; */
  /* height: 24px; */
  width: 24px;
  margin-left: 4px;
`;

export function PlayerName({ playerName, isAnswer }: PlayerNameProps) {
  return (
    <div css={player}>
      <p>{playerName}</p>
      {isAnswer ? <img src={Check} alt="" css={CheckImg} /> : ""}
    </div>
  );
}
