import { login } from "./login";
import LoginForm from "./LoginForm";

export default async function Login() {
  return (
    <div className="wavy-background flex h-screen w-full items-center justify-center">
      <LoginForm action={login} />
    </div>
  );
}
