// src/pages/AdminPage.jsx
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../components/Admin/AdminLogin";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminRoute from "../components/Admin/AdminRoute";

const AdminPage = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route
        path="dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AdminPage;
