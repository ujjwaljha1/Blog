import { useState } from "react";
import { API_URL } from "../url";
import { useNavigate } from "react-router-dom";
import { AtSign, LockKeyhole } from "lucide-react";

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
                    {/* Email Input with Icon */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-white/70">
                            <AtSign size={18} />
                        </span>
                        <input
                            autoFocus
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 bg-transparent border border-white/20 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-white/70">
                            <LockKeyhole size={18} />
                        </span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 bg-transparent border border-white/20 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 text-red-400 border border-red-500/30 bg-red-500/5 px-4 py-2 rounded-md text-sm animate-fade-in shadow-md shadow-red-500/10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 103 12a9 9 0 0018 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="flex items-center gap-2 text-green-400 border border-green-500/30 bg-green-500/5 px-4 py-2 rounded-md text-sm animate-fade-in shadow-md shadow-green-500/10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {success}
                        </div>
                    )}


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
