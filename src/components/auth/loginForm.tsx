import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../services/store";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); //email or username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { 
        emailOrUsername: identifier, 
        password: password 
      };
      console.log("[LoginForm] Submitting login", { ...payload, password: "***" });
      await login({ 
        emailOrUsername: identifier, 
        password: password 
      });
      navigate('/dashboard', { replace: true });
      console.log("[LoginForm] Login request completed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 text-center mb-2">
          Please sign in to continue
        </p>

        <div className="flex flex-col gap-2">
          <label htmlFor="identifier" className="text-gray-600 text-sm font-medium">
            Email or Username
          </label>
          <input
            id="identifier"
            type="text"
            placeholder="Enter your email or username"
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all rounded-lg p-3 outline-none text-gray-700"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-600 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all rounded-lg p-3 outline-none text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 bg-blue-600 text-white font-semibold rounded-lg py-3 transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
