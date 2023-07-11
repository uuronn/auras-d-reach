import { Button } from "~/components/Button";
import { VerifyFirebaseAuthGuard } from "~/guards/VerifyFirebaseAuthGuard";
import { useLogin } from "./hooks/useLogin";

const LoginPage = () => {
  return (
    <VerifyFirebaseAuthGuard>
      <main>
        <div>ログインしてください。</div>
        <Button onClick={useLogin}>Googleでログイン</Button>
      </main>
    </VerifyFirebaseAuthGuard>
  );
};

export default LoginPage;
