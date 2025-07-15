import { API_URL } from "../url";
import { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const SubmitForm = async (e) => {
        e.preventDefault();
        setError(null);

        if (!form.username || !form.email || !form.password) {
            setError("All fields are required");
            return;
        }

        if (
            form.password.length < 6 ||
            !form.password.includes('_') ||
            !/\d/.test(form.password)
        ) {
            setError("Password must be at least 6 characters long, contain an underscore `_`, and include a number.");
            return;
        }

        if (!form.email.includes('@')) {
            setError("Invalid email format");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/";
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-xl font-semibold mb-4">Register</h1>
            <form onSubmit={SubmitForm} className="flex flex-col gap-4 w-80">
                <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border p-2 rounded"
                />
                {error && <div className="text-red-500">{error}</div>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
}
