import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/slices/authSlice";
import { toast } from "../../utils/toast";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin, loading, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Check authentication status on mount
    dispatch(checkAuth());
  }, [dispatch]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--Bg-dark)",
          color: "var(--Text-light)",
          fontFamily: '"Sora", sans-serif',
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid rgba(69, 231, 123, 0.3)",
              borderTop: "3px solid var(--Primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          <p style={{ fontSize: "14px", color: "var(--Text-secondary)" }}>
            Checking authentication...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Show error and redirect if user is not admin
  if (!isAdmin) {
    if (user && !user.is_admin) {
      toast.error("Access denied. Admin privileges required.");
    }
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
