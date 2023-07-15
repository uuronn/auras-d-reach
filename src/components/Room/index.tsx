import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";
import { useNavigate } from "react-router-dom";

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

function Room({ personNumbers, roomNumber }: Person) {

  let disable = personNumbers >= 5;
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/room1");
  };

  const room = css`
    &:hover {
      background-color: #eee;
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
  `;

  return (
    <button
      css={room}
      onClick={clickHandler}
      disabled={disable}
    >
      <p css={personNumber}>{personNumbers}/5</p>
      <div css={rooms}>
        <img src="../../../public/home.svg" alt="roomImg" css={roomImg} />
        <p>ルーム{roomNumber}</p>
      </div>
    </button>
  );
}

export default Room;
