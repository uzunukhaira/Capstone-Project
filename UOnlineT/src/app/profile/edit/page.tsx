"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("access_token");
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUsername(data.username);
        setEmail(data.email);
        if (data.profile_image) {
          setPreviewImage(`http://localhost:5000${data.profile_image}`.replace(/([^:]\/)\/+/g, "$1"));
        }
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (oldPassword && newPassword) {
      formData.append("old_password", oldPassword);
      formData.append("new_password", newPassword);
    }
    if (selectedImage) {
      formData.append("profile_image", selectedImage);
    }

    try {
      const res = await fetch("http://localhost:5000/profile/edit", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Profil berhasil diperbarui");
        router.push("/profile");
      } else {
        setMessage(data.msg || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("Gagal update profil:", error);
      setMessage("Gagal terhubung ke server");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setMessage("File yang dipilih bukan gambar.");
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat...</div>;

  return (
    <DefaultLayout>
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Profil</h1>

        {message && (
          <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 shadow rounded"
        >
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password Lama</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Biarkan kosong jika tidak mengubah"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Biarkan kosong jika tidak mengubah"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Foto Profil</label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}
