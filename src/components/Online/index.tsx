import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

const onlineCircle = css`
height: 12px;
width: 12px;
background-color: #FFCC33;
border-radius: 50%;
margin-right: 5px;
`;

const onlines = css`
display: flex;
align-items: center;
background-color: #eee;
width: fit-content;
padding: 5px 8px;
border-radius: 8px;
`;

interface OnlineNumbers extends ComponentPropsWithRef<"p"> {
    onlineNumber:number;
  }
function Online({onlineNumber}:OnlineNumbers) {
    let onlineNumberStyle = onlineNumber >= 2 ? "#66FF33" : "";
  return (
    <div css={onlines}>
        <div css={onlineCircle} style={{backgroundColor:onlineNumberStyle}}></div>
        <p>オンライン：{onlineNumber}人</p>
    </div>
  )
}

export default Online