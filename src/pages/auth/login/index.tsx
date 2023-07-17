import { Button } from "~/components/Button";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
import { css } from "@emotion/react";
import googleImg from "../../../assets/google.svg";
import { useAuthContext } from "~/context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Box from "~/components/Boxs";

const LoginBox = css`
  flex-direction: column;
  padding: 80px;
  display: flex;
  border: 3px solid #000000;
  border-radius: 20px;
  background-color: #000000;
  opacity: 0.7;

  @media (max-width: 500px) {
    padding: 10px;
    border: none;
  }
`;

const Main = css`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

const contents = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-weight: bolder;
  height: 80px;
  width: 300px;
  &:hover{
    opacity: 0.8;
  }
`;

const img = css`
  width: 25px;
`;

// const abs = css`
//   position: absolute;
// `

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (user) {
    navigate("/");

    return <div>loading...</div>;
  }

  return (
    <div>
      <Box/>
      <main css={Main}>
        <div css={LoginBox}>
          <Button css={contents} onClick={useGoogleLogin}>
            <img css={img} src={googleImg} />
            Googleでログイン
          </Button>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
