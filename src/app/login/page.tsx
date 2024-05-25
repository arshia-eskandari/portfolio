import { login } from "./login";
import LoginForm from "./LoginForm";

export default function Login() {
  return <LoginForm action={login} />;
}
