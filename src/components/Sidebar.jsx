//! File: src/components/Sidebar.jsx

import {
  Home,
  LayoutDashboard,
  CheckSquare,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navigationItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/todo", icon: CheckSquare, label: "Todos" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out successfully 👋");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign out", {
        description: error.message || "Please try again.",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-sidebar rounded-lg border border-sidebar-border shadow-lg hover:bg-sidebar-accent transition-colors cursor-pointer"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-sidebar-foreground" />
        ) : (
          <Menu className="h-6 w-6 text-sidebar-foreground" />
        )}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border z-40 shadow-xl"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center mb-8 mt-12">
                <Sparkles className="h-8 w-8 text-sidebar-primary" />
                <h1 className="ml-3 text-xl font-bold text-sidebar-foreground">
                  DoneIt
                </h1>
              </div>

              <nav className="flex-1">
                <ul className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.to;

                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent"
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-sidebar-border pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={
                          user?.photoURL ||
                          user?.avatar ||
                          user?.profileImage ||
                          "/default-avatar.svg"
                        }
                        alt="User"
                        className="w-8 h-8 rounded-full border-2 border-sidebar-primary/20 shadow-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="ml-3 text-sidebar-foreground font-medium">
                      {user?.displayName?.split(" ")[0] ||
                        user?.name?.split(" ")[0] ||
                        user?.firstName ||
                        user?.username ||
                        "User"}
                    </span>
                  </div>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="text-sidebar-foreground hover:text-sidebar-primary transition-colors"
                      aria-label="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
