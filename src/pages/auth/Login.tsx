// Login.tsx
import AuthLayout from "../../components/auth/authLayout";
import LoginForm from "../../components/auth/loginForm";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../services/store";

export default function Login() {
  const user = useAuthStore((s) => s.user);
  if (user) return <Navigate to="/dashboard" replace/>;
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
