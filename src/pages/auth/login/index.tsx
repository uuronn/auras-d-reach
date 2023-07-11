import { Button } from "~/components/Button";

const LoginPage = () => {
  const loginHandler = () => {
    console.log("click");
  };
  return (
    <main>
      <div>ログインしてください。</div>
      <Button onClick={loginHandler}>Googleでログイン</Button>
    </main>
  );
};

export default LoginPage;
