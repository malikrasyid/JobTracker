import { useState } from "react";
import { useAuthStore } from "../../services/store";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password }); // handled in authStore
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-80 bg-white p-6 rounded-2xl shadow"
    >
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
      >
        Sign In
      </button>
    </form>
  );
}
