interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export const sidebarMenus: Record<string, MenuItem[]> = {
  admin: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Kelola User", href: "/admin/users" },
    { label: "Transaksi", href: "/admin/transaksi" },
  ],
  user: [
    { label: "Beranda", href: "/nlp" },
    { label: "Riwayat", href: "/riwayat" },
    { label: "Profile", href: "/profile" },
  ],
  guest: [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ],
};
