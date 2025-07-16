"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    } else {
      setRole("guest"); // default role
    }
  }, []);

  // Jangan render apapun sampai role terbaca
  if (role === null) return null;

  const commonItems = [
    { icon: <span>🤖</span>, label: "Chatbot", route: "/nlp" },
  ];

  const adminItems = [
    { icon: <span>👤</span>, label: "User", route: "/users" },
    { icon: <span>📜</span>, label: "Riwayat", route: "/riwayat" },
    {
      icon: <span>⚙️</span>,
      label: "Bantuan",
      route: "/bantuan",
      children: [
        { label: "Service", route: "/layanan" },
        { label: "Pengaturan", route: "/pengaturan" },
      ],
    },
  ];

  const userItems = [
    { icon: <span>👤</span>, label: "Profil", route: "/profile" },
    { icon: <span>📜</span>, label: "Riwayat", route: "/riwayat" },
    { icon: <span>❓</span>, label: "Bantuan", route: "/bantuan" },
  ];

  const guestItems = [
    { icon: <span>🔑</span>, label: "Login", route: "/login" },
  ];

  let roleBasedItems = guestItems;
  if (role === "admin") roleBasedItems = adminItems;
  else if (role === "user") roleBasedItems = userItems;

  const menuItems = [...commonItems, ...roleBasedItems];

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-brown-500 text-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" />
          </button>
        </div>
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  item={item}
                  pageName={pageName}
                  setPageName={setPageName}
                />
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
