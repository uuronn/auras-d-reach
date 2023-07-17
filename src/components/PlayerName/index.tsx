import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";
import Check from "../../assets/check.svg";

interface PlayerNameProps extends ComponentPropsWithRef<"div"> {
  playerName: string;
  isAnswer: boolean;
}

const player = css`
  color: #eee;
  padding: 6px;
  background-color: #444;
  width: fit-content;
  border-radius: 5px;
  display: flex;
  margin: 2px;
  justify-content: center;
  align-items: center;
  font-size: 70%;
`;

const CheckImg = css`
  width: 24px;
  margin-left: 4px;
`;

export function PlayerName({
  playerName,
  isAnswer,
  ...props
}: PlayerNameProps) {
  return (
    <div css={player} {...props}>
      {playerName}
      {isAnswer && <img src={Check} alt="チェックアイコン" css={CheckImg} />}
    </div>
  );
}
