//! File: src/App.jsx

import AppLayout from "@/layout/AppLayout";
import { Login } from "@/components/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "@/pages/HomePage";
import { Dashboard } from "@/pages/DashboardPage";
import TodoPage from "./pages/TodoPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AppLayout className="font-sora transition-colors duration-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
