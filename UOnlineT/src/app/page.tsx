import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Landing Page | Chatbot KAI",
  description: "Informasi seputar Chatbot Jadwal Kereta Api",
};

export default function Home() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 drop-shadow">
          Selamat Datang di Chatbot Jadwal KAI 🚆
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6">
          Platform kami menyediakan informasi jadwal kereta api secara cepat dan akurat menggunakan teknologi chatbot AI. Dapatkan info real-time keberangkatan, keterlambatan, dan rute hanya dengan satu klik!
        </p>

        <div className="bg-white/80 backdrop-blur-lg border border-blue-100 shadow-2xl rounded-2xl p-8 max-w-xl text-left text-gray-800 transition hover:shadow-blue-200">
          <h2 className="text-xl font-semibold mb-3 text-blue-700">✨ Fitur Chatbot:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Ketik <strong>"jadwal Tujuan yang diinginkan tanggal pergi"</strong> untuk melihat keberangkatan.
            </li>
            <li>
              Ketik <strong>"kereta"</strong> untuk cek kereta yang tersedia.
            </li>
            <li>
              Ketik <strong>"lama perjalanan"</strong> untuk mengetahui estimasi waktu tempuh.
            </li>
            <li>
              Ketik <strong>"lihat rute"</strong> untuk melihat semua rute yang ada.
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/nlp"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow transition"
          >
            Buka Chatbot 🚀
          </Link>
          <Link
            href="/login"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow transition"
          >
            Login
          </Link>
        </div>

        {/* Informasi Kontak */}
        <div className="mt-16 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white border shadow-md rounded-lg p-6 flex items-start gap-4">
            <Mail className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-700">Email</h3>
              <p>khairauzunu@gmail.com</p>
            </div>
          </div>
          <div className="bg-white border shadow-md rounded-lg p-6 flex items-start gap-4">
            <MapPin className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-700">Alamat</h3>
              <p>Stasiun Simpang Haru, Padang, Sumatera Barat</p>
            </div>
          </div>
          <div className="bg-white border shadow-md rounded-lg p-6 flex items-start gap-4">
            <Phone className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-700">WhatsApp</h3>
              <p>0812 7515 9397</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Chatbot KAI. All rights reserved.
        </footer>
      </div>
    </DefaultLayout>
  );
}
