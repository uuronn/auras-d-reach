import { Button } from "~/components/Button";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
import { useLogout } from "./hooks/useLogout";
import { css } from "@emotion/react";
import GoogleImg from "../../../assets/google.svg";
import DoorImg from "../../../assets/door.svg";
const LoginBox = css`
  flex-direction: column;
  padding: 80px;
  display: flex;
  border: 3px solid #000000;
  border-radius: 20px;
  @media (max-width:500px){
    padding: 10px;
    border: none;
  }
`;
const Main = css`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const contents = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-weight: bolder;
  height: 80px;
  width: 300px;
`;
const img = css`
  width: 25px;
`;

const LoginPage = () => {
  return (
    <main css={Main}>
      <div css={LoginBox}>
        <Button css={contents} onClick={useGoogleLogin}>
          <img css={img} src={GoogleImg} />
          Googleでログイン
        </Button>
        <Button css={contents} onClick={useLogout}>
          <img css={img} src={DoorImg} />
          ログアウトする
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
