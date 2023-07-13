import { css } from "@emotion/react";
import { Button } from "./components/Button";
import { useLogin } from "./pages/auth/login/hooks/useLogin";
import { VerifyFirebaseAuthGuard } from "./guards/VerifyFirebaseAuthGuard";

const Home = (): JSX.Element => {
  return (
    <VerifyFirebaseAuthGuard>
      <div
        css={css`
          background: pink;
        `}
      >
        hello world
        <Button>
          <img src="/door.svg" alt="" />
          コンに一致は
        </Button>
        <Button onClick={useLogin}>test</Button>
      </div>
    </VerifyFirebaseAuthGuard>
  );
};

export default Home;
