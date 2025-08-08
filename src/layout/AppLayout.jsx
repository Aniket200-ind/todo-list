//! File: src/layout/AppLayout.jsx

import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/Sidebar";
import { useLocation } from "react-router";

export default function AppLayout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen flex bg-light-background dark:bg-dark-background transition-colors duration-300">
      {!isLoginPage && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <header className="w-full flex justify-end p-4">
          {!isLoginPage && <ThemeToggle />}
        </header>
        <main className="flex-1 font-sora px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
