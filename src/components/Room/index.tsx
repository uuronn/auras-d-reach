import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";
import homeImg from "../../assets/home.svg";

const personNumber = css`
  position: absolute;
  right: 20%;
`;

const roomImg = css`
  width: 50%;
  margin: 8%;
`;

const rooms = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`;

interface Person extends ComponentPropsWithRef<"button"> {
  personNumbers: number;
  roomNumber: number;
}

function Room({ personNumbers, roomNumber, ...props }: Person) {
  const disable = personNumbers >= 5;

  const room = css`
    &:hover {
      background-color: ${disable ? "" : "#eee"};
    }
    width: 250px;
    height: 220px;
    border-radius: 16px;
    border: 1px solid #111;
    position: relative;
    padding: 1%;
    display: block;
    margin: 2% 0;
    transition: 0.2s;
    cursor: ${disable ? "default" : "pointer"};
  `;

  return (
    <button css={room} {...props}>
      <p css={personNumber}>{personNumbers}/5</p>
      <div css={rooms}>
        <img src={homeImg} alt="roomImg" css={roomImg} />
        <p>ルーム{roomNumber}</p>
      </div>
    </button>
  );
}

export default Room;
