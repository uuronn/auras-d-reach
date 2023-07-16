import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

interface LyricProps extends ComponentPropsWithRef<"p"> {
  lyric: string;
}

const lyriccss = css`
  font-size: 40px;
  margin: 20px;
  box-shadow: 0 10px 6px -6px #777;
  width: fit-content;
  background-color: white;
  margin: 22px;
  padding: 10px;
`;

export const Lyric = ({ lyric, ...props }: LyricProps) => {
  return (
    <p css={lyriccss} {...props}>
      {lyric}
    </p>
  );
};
