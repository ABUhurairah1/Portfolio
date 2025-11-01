import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Button from "../../components/common/Button";
import { loginUser, checkAuth, logoutUser } from "../../store/slices/authSlice";
import { toast } from "../../utils/toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin, loading } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );

      if (loginUser.fulfilled.match(result)) {
        // Check if user is admin
        if (result.payload.user?.is_admin) {
          toast.success("Login successful! Redirecting...");
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000);
        } else {
          toast.error("Access denied. Admin privileges required.");
          await dispatch(logoutUser());
        }
      } else {
        // Handle rejected case
        const errorMessage = result.payload || "Login failed";
        toast.error(errorMessage);
      }
    } catch {
      toast.error("An error occurred during login");
    }
  };

  return (
    <div
      className="admin-login-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--Bg-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--Bg-linear)",
          zIndex: 1,
        }}
      ></div>

      {/* Login Container */}
      <div
        className="login-container"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px",
          padding: "40px",
        }}
      >
        <div
          className="login-box"
          style={{
            background: "var(--Bg-linear-2)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "60px 40px",
            textAlign: "center",
          }}
        >
          {/* Logo/Title Section */}
          <div className="login-header mb_40">
            <h2
              className="title"
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "var(--Text-light)",
                marginBottom: "12px",
                fontFamily: '"Sora", sans-serif',
              }}
            >
              Admin Login
            </h2>
            <p
              className="text_secondary-color"
              style={{
                fontSize: "16px",
                color: "var(--Text-secondary)",
                fontFamily: '"Sora", sans-serif',
              }}
            >
              Enter your credentials to access the admin panel
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group mb_24">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "var(--Text-light)",
                  fontSize: "14px",
                  fontFamily: '"Sora", sans-serif',
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--Primary)";
                  e.target.style.background = "rgba(255, 255, 255, 0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              />
            </div>

            <div
              className="form-group mb_32"
              style={{
                position: "relative",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  paddingRight: "50px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "var(--Text-light)",
                  fontSize: "14px",
                  fontFamily: '"Sora", sans-serif',
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--Primary)";
                  e.target.style.background = "rgba(255, 255, 255, 0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "var(--Text-secondary)",
                  cursor: loading ? "not-allowed" : "pointer",
                  padding: "10px",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  !loading &&
                  (e.currentTarget.style.color = "var(--Text-light)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--Text-secondary)")
                }
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <Button
              type="submit"
              variant="style-1"
              fullWidth
              animate
              disabled={loading}
            >
              <span>{loading ? "Signing In..." : "Sign In"}</span>
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="text_secondary-color text-center mt_24"
          style={{
            fontSize: "14px",
            color: "var(--Text-secondary)",
            fontFamily: '"Sora", sans-serif',
          }}
        >
          © 2025 Admin Portal. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
