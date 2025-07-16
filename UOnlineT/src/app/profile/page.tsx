"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  profile_image?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.clear();
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Gagal memuat data user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <div className="p-8 text-center">Memuat...</div>;
  if (!user) return null;

  const profileImageUrl = user.profile_image
    ? `http://localhost:5000${user.profile_image}`
    : null;

  return (
    <DefaultLayout>
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profil Pengguna</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-6 mb-4">
            <div>
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1 capitalize">
                Role: {user.role}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/profile/edit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Profil
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
