"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
}

export default function NlpChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ from: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChat([
      {
        from: "bot",
        text: `👋 Selamat datang! Saya adalah chatbot jadwal kereta. Berikut beberapa keyword yang bisa Anda gunakan:\n\n- "lihat rute"\n- "lama perjalanan"\n- "kereta"\n- "jadwal (lokasi awal) (tanggal)"\nContoh: "jadwal Padang - Alai 17 Maret"`,
      },
    ]);
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setChat((prev) => [...prev, { from: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const token = getToken();

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setChat((prev) => [...prev, { from: "bot", text: data.response }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Gagal menghubungi server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex h-full flex-col">
        <h1 className="mb-4 text-2xl font-bold">💬 Chat Jadwal Kereta</h1>

        <div className="max-h-[70vh] flex-1 space-y-2 overflow-y-auto rounded-lg bg-white p-4 shadow-inner">
          {chat.map((c, idx) => (
            <div
              key={idx}
              className={`flex ${
                c.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs whitespace-pre-line rounded-xl px-4 py-2 text-white ${
                  c.from === "user" ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <p>{c.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs rounded-xl bg-gray-400 px-4 py-2 text-white">
                <p>Mengetik...</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Tulis pesan Anda..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Kirim
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}
