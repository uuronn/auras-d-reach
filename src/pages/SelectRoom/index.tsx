import { css } from "@emotion/react";
import Logout from "~/components/Logout";
import OnlineCounter from "~/components/Online";
import Room from "~/components/Room";

const whole = css`
  width: 80%;
  margin: 0 auto;

  @media (max-width: 500px) {
    width: 80%;
  }
`;

const header = css`
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
  @media (max-width: 500px) {
    margin: 5% 0;
  }
`;

const room = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2%;
  justify-content: center;
  @media (max-width: 500px) {
   flex-direction: column;
  }
`;

function SelectRoom() {
  return (
    <div css={whole}>
      <div css={header}>
        <OnlineCounter onlineNumber={1} />
        <Logout />
      </div>
      <div css={room}>
        <Room personNumbers={1} roomNumber={1} />
        <Room personNumbers={5} roomNumber={2} />
        <Room personNumbers={3} roomNumber={3} />
      </div>
    </div>
  );
}

export default SelectRoom;
