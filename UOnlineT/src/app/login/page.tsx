"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast.error(data.msg || "Login gagal", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      toast.success("Login berhasil! Selamat datang kembali 🎉", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/nlp");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan. Coba lagi nanti.", {
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Belum punya akun? <Link href="/register" className="text-blue-600 hover:underline">Daftar di sini</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;