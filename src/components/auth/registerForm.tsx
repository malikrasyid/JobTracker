import { useState } from "react";
import { useAuthStore } from "../../services/store";

export default function RegisterForm() {
  const register = useAuthStore((s) => s.register);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ name, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-80 bg-white p-6 rounded-2xl shadow"
    >
      <h2 className="text-2xl font-semibold text-center">Register</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
      >
        Create Account
      </button>
    </form>
  );
}
