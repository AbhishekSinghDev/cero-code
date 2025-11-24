import { Suspense } from "react";
import LoginForm from "./login-form";

const LoginPage = async () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
