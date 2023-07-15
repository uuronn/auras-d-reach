import { css } from "@emotion/react";
import Logout from "~/components/Logout";
import OnlineCounter from "~/components/Online";
import Room from "~/components/Room";

const whole = css`
width: 60%;
margin:0 auto;
`;

const header = css`
display: flex;
justify-content: space-around;
margin-top: 2%;
`;

const room = css`
display: flex;
flex-direction: column;
align-items: center;
`;

function SelectRoom() {
  return (
    <div css={whole}>
      <div css={header}>
        <OnlineCounter onlineNumber={1} />
        <Logout/>
      </div>
      <div css={room}>
        <Room personNumbers={1} roomNumber={1}/>
        <Room personNumbers={5} roomNumber={2}/>
        <Room personNumbers={3} roomNumber={3}/>
      </div>
    </div>
  );
}

export default SelectRoom;
