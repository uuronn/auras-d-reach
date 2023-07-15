import { css } from "@emotion/react";
import { Lyric } from "~/components/Lyric";

const test = css`
  background-color: red;
`;

export const Turu = () => {
  return (
    <div>
      <Lyric lyric="今日はうまく笑えないいっせい" />
      <Lyric lyric="あああ" css={test} />
    </div>
  );
};

export default Turu;
