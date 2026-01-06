import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection (admin)
  if (role && userRole !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
