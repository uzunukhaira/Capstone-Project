"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  profile_image?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
  }, [router]);

  if (!user) return null;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profil Pengguna</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-6 mb-4">
          <div>
            {user.profile_image ? (
              <img
                src={`http://localhost:5000/${user.profile_image}`}
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
            <p className="text-sm text-gray-500 mt-1 capitalize">Role: {user.role}</p>
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
  );
}
