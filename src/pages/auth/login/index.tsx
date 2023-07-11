import { Button } from "~/components/Button";
import { FirebaseAuthGuard } from "~/guard/FirebaseAuthGuard";
import { useLogin } from "./hooks/useLogin";

const LoginPage = () => {
  return (
    <FirebaseAuthGuard>
      <main>
        <div>ログインしてください。</div>
        <Button onClick={useLogin}>Googleでログイン</Button>
      </main>
    </FirebaseAuthGuard>
  );
};

export default LoginPage;
