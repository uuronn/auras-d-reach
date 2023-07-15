import { Button } from "~/components/Button";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
import { useGithubLogin } from "./hooks/useGithubLogin";
const LoginPage = () => {
  return (
    <main>
      <div>ログインしてください。</div>
      <Button onClick={useGoogleLogin}>Googleでログイン</Button>
      <Button onClick={useGithubLogin}>GitHubでログイン</Button>
    </main>
  );
};

export default LoginPage;
