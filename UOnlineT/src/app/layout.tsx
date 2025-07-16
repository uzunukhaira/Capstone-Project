// app/layout.tsx
"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <html lang="id">
      <head />
      <body className="bg-gray-100 font-sans antialiased">
        {loading ? <Loader /> : children}
      </body>
    </html>
  );
}
