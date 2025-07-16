"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface ChatHistory {
  id?: number;
  user_id?: number;
  message: string;
  response: string;
  timestamp: string;
}

export default function RiwayatPage() {
  const [riwayat, setRiwayat] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchChatHistory = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/chat/history", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("access_token");
          router.push("/login");
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setRiwayat(data);
        } else {
          setRiwayat([]);
        }
      } catch (err) {
        console.error("Gagal memuat riwayat chat:", err);
        setRiwayat([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [router]);

  return (
    <DefaultLayout>
      <div className="min-h-screen px-4 py-10 bg-blue-50">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Riwayat Chat
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Memuat data...</p>
        ) : riwayat.length === 0 ? (
          <p className="text-center text-gray-600">Belum ada riwayat chat.</p>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {riwayat.map((chat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 border border-blue-100"
              >
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(chat.timestamp).toLocaleString()}
                </p>
                <p className="font-semibold text-blue-700">🧑 {chat.message}</p>
                <p className="mt-1 text-gray-800">🤖 {chat.response}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
