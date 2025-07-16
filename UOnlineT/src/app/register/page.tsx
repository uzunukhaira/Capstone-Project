"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(""); // reset error

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Registrasi gagal");
        return;
      }

      toast.success("Registrasi berhasil! Silakan login 🚀", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full border rounded p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Ulangi Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full border rounded p-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login di sini
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
