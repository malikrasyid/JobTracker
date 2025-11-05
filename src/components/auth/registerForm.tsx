import { useState } from "react";
import { useAuthStore } from "../../services/store";

export default function RegisterForm() {
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      username: name,
      email: email,
      passwordHash: password,
    };
    console.log("Registration payload:", payload);

    try {
      await register(payload);
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account ✨
        </h2>
        <p className="text-sm text-gray-500 text-center mb-2">
          Join us today and start your journey
        </p>

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-600 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-600 text-sm font-medium">
            Username
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your username"
            className="border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-lg p-3 outline-none text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-600 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-lg p-3 outline-none text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-gray-600 text-sm font-medium"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Create a strong password"
            className="border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-lg p-3 outline-none text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 bg-green-600 text-white font-semibold rounded-lg py-3 transition-all hover:bg-green-700 focus:ring-4 focus:ring-green-300 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
