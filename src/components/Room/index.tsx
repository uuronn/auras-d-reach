import { css } from "@emotion/react";

const room = css`
  width: 250px;
  height: 220px;
  background: #eee;
  border-radius: 16px;
  border: 1px solid #111;
  position: relative;
  padding: 1%;
`;

const personNumber = css`
  position: absolute;
  right: 20%;
`;

const rooms = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`;

const roomImg = css`
  width: 50%;
  margin: 8%;
`;

function Room({ personNumbers, roomNumber }: any) {
  return (
    <div css={room}>
      <p css={personNumber}>{personNumbers}/5</p>
      <div css={rooms}>
        <img src="../../../public/home.svg" alt="roomImg" css={roomImg} />
        <p>ルーム{roomNumber}</p>
      </div>
    </div>
  );
}

export default Room;
