"use client";

import { useState, useEffect } from "react";

interface Kereta {
  id: number;
  nama_kereta: string;
  rute: string;
  tanggal: string;
  keberangkatan: string;
  lama_perjalanan: string;
  kursi_tersedia: number;
}

export default function BookingPage() {
  const [keretaList, setKeretaList] = useState<Kereta[]>([]);
  const [selectedKeretaId, setSelectedKeretaId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchKereta = async () => {
      try {
        const res = await fetch("http://localhost:5000/kereta"); // Ganti sesuai endpoint backend-mu
        if (!res.ok) throw new Error("Gagal ambil data kereta");
        const data = await res.json();
        setKeretaList(data);
      } catch (error) {
        setMessage("Error saat mengambil data kereta");
      }
    };

    fetchKereta();
  }, []);

  const handleBooking = async () => {
    if (!selectedKeretaId) {
      setMessage("Pilih kereta dulu ya!");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("Kamu belum login!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ kereta_id: selectedKeretaId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.msg || "Gagal booking tiket");
      } else {
        setMessage(
          `Berhasil booking! Kereta: ${data.detail.kereta}, Rute: ${data.detail.rute}, Tanggal: ${data.detail.tanggal}`
        );
      }
    } catch (error) {
      setMessage("Terjadi kesalahan saat booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Pesan Tiket Kereta</h1>

      <select
        className="border p-2 w-full mb-4 rounded"
        value={selectedKeretaId ?? ""}
        onChange={(e) => setSelectedKeretaId(Number(e.target.value))}
      >
        <option value="">-- Pilih Kereta --</option>
        {keretaList.map((k) => (
          <option
            key={k.id}
            value={k.id}
            disabled={k.kursi_tersedia <= 0}
          >
            {k.nama_kereta} - {k.rute} - {k.tanggal}{" "}
            {k.kursi_tersedia <= 0 ? "(Habis)" : ""}
          </option>
        ))}
      </select>

      <button
        disabled={loading}
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Memesan..." : "Pesan Tiket"}
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </main>
  );
}
