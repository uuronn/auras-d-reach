import { css } from "@emotion/react";
import { Button } from "~/components/Button";
import { Lyric } from "~/components/Lyric";
import { PlayerName } from "~/components/PlayerName";
import { PLAYERS, titles } from "~/data";

const answers = ["A", "B", "C", "D"];

const MAINCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;
const playersboxCSS = css`
  width: 30%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const playerCSS = css`
  width: 100%;
  height: 20px;
`;
const lyricCSS = css`
  background-color: #ffffff;
  font-size: 100%;
`;
const buttonCSS = css`
  width: 90%;
  height: 20%;
  margin: 10px;
  margin-top: 1%;
  border: 3px solid #000;
  background-color: #ffffff;
`;

const titleCSS = css`
  width: 100%;
  font-weight: bold;
  font-size: 80%;
`;

const choiceCSS = css`
  font-weight: bold;
  display: block;
  font-size: 100%;
`;

const pageCSS = css`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 1000px;
`;

const div = css`
  display: flex;
  justify-content: center;
`;

const members = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Room3 = () => {
  return (
    <div css={div}>
      <main css={pageCSS}>
        <div css={members}>
          <div css={playersboxCSS}>
            <div>参加者</div>
            {PLAYERS.map((player) => (
              <div>
                <PlayerName playerName={player} isAnswer css={playerCSS} />
              </div>
            ))}
          </div>
        </div>
        <div css={MAINCSS}>
          <Lyric lyric="多分、私じゃなくていいね????????????" css={lyricCSS} />
          {titles.map((title, index) => (
            <Button css={buttonCSS}>
              <p css={choiceCSS}>{`${answers[index]}.`}</p>

              <p css={titleCSS}>{title}</p>
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};
