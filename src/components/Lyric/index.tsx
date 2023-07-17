import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

interface LyricProps extends ComponentPropsWithRef<"p"> {
  lyric: string;
}

const lyriccss = css`
  font-size: 30px;
  font-weight: 5px;
  box-shadow: 0 10px 6px -6px #777;
  width: 80%;
  background-color: white;
  font-weight: bold;
  padding: 2px;
  margin: 5%;
  text-align: center;
  justify-content: center;
  position: relative;
`;

const kashiCSS = css`
  position: absolute;
  top: 0;
  left: 20px;
`;

export const Lyric = ({ lyric, ...props }: LyricProps) => {
  return (
    <p css={lyriccss} {...props}>
      <span css={kashiCSS}>歌詞:</span>
      <span>{lyric}</span>
    </p>
  );
};
