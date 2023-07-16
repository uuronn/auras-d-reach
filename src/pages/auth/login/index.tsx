import { Button } from "~/components/Button";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
import { useLogout } from "./hooks/useLogout";
import { css } from "@emotion/react";
import googleImg from "../../../assets/google.svg";
import { useAuthContext } from "~/context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const LoginBox = css`
  flex-direction: column;
  padding: 80px;
  display: flex;
  border: 3px solid #000000;
  border-radius: 20px;

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
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (user) {
    navigate("/");

    return <div>loading...</div>;
  }

  return (
    <main css={Main}>
      <div css={LoginBox}>
        <Button css={contents} onClick={useGoogleLogin}>
          <img css={img} src={googleImg} />
          Googleでログイン
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
