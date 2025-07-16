"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL = "http://localhost:5000/admin/users";

  const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.warn("Token tidak ditemukan di localStorage.");
      }
      return token;
    }
    return null;
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    if (!token) throw new Error("Anda belum login. Token tidak ditemukan.");

    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error("Respon bukan JSON:", text);
      throw new Error("Terjadi kesalahan pada server.");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchWithAuth(API_BASE_URL);
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_BASE_URL}/${formData.id}` : API_BASE_URL;

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const savedUser = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(payload),
      });

      setUsers((prev) =>
        isEditing
          ? prev.map((user) => (user.id === savedUser.id ? savedUser : user))
          : [...prev, savedUser]
      );

      alert("Data user berhasil disimpan!");
      setFormData({});
      setIsEditing(false);
    } catch (err: any) {
      alert(`Gagal menyimpan data: ${err.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    try {
      await fetchWithAuth(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("User berhasil dihapus!");
    } catch (err: any) {
      alert(`Gagal menghapus user: ${err.message}`);
    }
  };

  const handleEdit = (user: User) => {
    setFormData(user);
    setIsEditing(true);
  };

  return (
    <DefaultLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Manajemen Pengguna</h2>

        <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap gap-2">
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name || ""}
            onChange={handleInputChange}
            required
            className="border px-2 py-1"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleInputChange}
            required
            className="border px-2 py-1"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password || ""}
            onChange={handleInputChange}
            required={!isEditing}
            className="border px-2 py-1"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role || ""}
            onChange={handleInputChange}
            required
            className="border px-2 py-1"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-1 text-white ${isEditing ? "bg-yellow-500" : "bg-green-600"}`}
          >
            {isEditing ? "Update" : "Tambah"}
          </button>
        </form>

        {isLoading ? (
          <p>Memuat data...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <table className="w-full border mt-4 text-sm">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border px-2 py-1">No</th>
                <th className="border px-2 py-1">Nama</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Role</th>
                <th className="border px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-2 py-1 text-center">{i + 1}</td>
                  <td className="border px-2 py-1">{user.name}</td>
                  <td className="border px-2 py-1">{user.email}</td>
                  <td className="border px-2 py-1">{user.role}</td>
                  <td className="border px-2 py-1 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 text-white px-2 py-1"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DefaultLayout>
  );
}
