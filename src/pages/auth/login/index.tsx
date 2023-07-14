import { Button } from "~/components/Button";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
const LoginPage = () => {
  return (
    <main>
      <div>ログインしてください。</div>
      <Button onClick={useGoogleLogin}>Googleでログイン</Button>
    </main>
  );
};

export default LoginPage;
