import { Button } from "~/components/Button";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
import { useLogout } from "./hooks/useLogout";
const LoginPage = () => {
  return (
    <main>
      <div>ログインしてください。</div>
      <Button onClick={useGoogleLogin}>Googleでログイン</Button>
      <Button onClick={useLogout}>ログアウトする</Button>
    </main>
  );
};

export default LoginPage;
