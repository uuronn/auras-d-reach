import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

interface PlayerNameProps extends ComponentPropsWithRef<"div"> {
  playerName: string;
}

const player = css`
  color: #eee;
  padding: 13px;
  background-color: #444;
  width:fit-content;
  border-radius: 15%;
`;

export function PlayerName({ playerName }: PlayerNameProps) {
  return <div css={player}>{playerName}</div>;
}
