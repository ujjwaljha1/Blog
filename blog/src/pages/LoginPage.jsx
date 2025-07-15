import { useState } from "react";
import { API_URL } from "../url";
import { useNavigate } from "react-router-dom";
import { AtSign } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSuccess("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md space-y-6 border border-white/10 backdrop-blur-sm p-8 rounded-xl shadow-2xl shadow-white/10">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white tracking-wide">
          🔐 Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
          AtSign
            autoFocus
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-white/20 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-white/20 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />

          {error && <div className="text-red-400 text-sm">{error}</div>}
          {success && <div className="text-green-400 text-sm">{success}</div>}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-white/60">
          Don’t have an account?{" "}
          <a href="/register" className="text-purple-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
