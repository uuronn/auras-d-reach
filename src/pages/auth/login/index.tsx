import { Button } from "~/components/Button";
import { useLogin } from "./hooks/useLogin";
const LoginPage = () => {
  return (
    <main>
      <div>ログインしてください。</div>
      <Button onClick={useLogin}>Googleでログイン</Button>
    </main>
  );
};

export default LoginPage;
