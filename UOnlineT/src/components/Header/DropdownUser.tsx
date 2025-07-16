"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";

interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  image?: string;
}

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.warn("Token tidak ditemukan di localStorage");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("Gagal ambil user:", errText);
          throw new Error("Gagal mengambil data user");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error saat fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p className="text-sm text-gray-500">Memuat pengguna...</p>;
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 focus:outline-none"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user.username}
          </span>
          <span className="block text-xs capitalize text-gray-500 dark:text-gray-400">
            {user.role}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full overflow-hidden">
          <Image
            width={48}
            height={48}
            src={user.image || "/images/karina.jpg"}
            alt="User Avatar"
            className="object-cover"
          />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
        >
          <path
            d="M0.293 0.707C0.683 0.317 1.317 0.317 1.707 0.707L6 5L10.293 0.707C10.683 0.317 11.317 0.317 11.707 0.707C12.098 1.098 12.098 1.732 11.707 2.122L6.707 7.122C6.317 7.512 5.683 7.512 5.293 7.122L0.293 2.122C-0.098 1.732 -0.098 1.098 0.293 0.707Z"
            fill="black"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 w-64 rounded-md border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark z-50">
          <ul className="flex flex-col gap-4 border-b border-stroke px-6 py-5 dark:border-strokedark">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
              >
                <span>👤</span> My Profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
              >
                <span>⚙️</span> Account Settings
              </Link>
            </li>
          </ul>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium hover:text-primary transition-colors"
          >
            <span>🚪</span> Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
