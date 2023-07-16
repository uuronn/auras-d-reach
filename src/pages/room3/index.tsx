import { css } from "@emotion/react";
import { PlayerName } from "~/components/PlayerName";
import { PLAYERS } from "~/data";

const MAINCSS = css`
  width: 100%;
  /* height: 100vh; */
  justify-content: center;
  display: flex;
`;
const centerCSS = css`
  width: 40%;
  background-color: blue;
  display: flex;
  flex-wrap: wrap;
`;
const playerCSS = css`
  margin: 5px;
`;

export const Room3 = () => {
  return (
    <main css={MAINCSS}>
      <div css={centerCSS}>
        {PLAYERS.map((player) => (
          <div css={playerCSS}>
            <PlayerName playerName={player} isAnswer />
          </div>
        ))}
      </div>
    </main>
  );
};
