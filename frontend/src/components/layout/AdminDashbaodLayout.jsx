import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaChartLine,
  FaComments,
  FaAddressBook,
  FaBriefcase,
  FaDollarSign,
  FaFolderOpen,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { logoutUser } from "../../store/slices/authSlice";
import { toast } from "../../utils/toast";
import "../admin/admin-dashboard.css";

const AdminDashbaodLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/admin/dashboard", label: "Analytics", icon: FaChartLine },
    { path: "/admin/chats", label: "Chats", icon: FaComments },
    { path: "/admin/contacts", label: "Contacts", icon: FaAddressBook },
    { path: "/admin/projects", label: "Projects", icon: FaBriefcase },
    { path: "/admin/pricing", label: "Pricing", icon: FaDollarSign },
    { path: "/admin/portfolio", label: "Portfolio", icon: FaFolderOpen },
    { path: "/admin/settings", label: "Settings", icon: FaCog },
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Failed to logout:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <div className="admin-dashboard-wrapper bg_dark">
      {/* Mobile Menu Toggle */}
      <button
        className="admin-sidebar-toggle d-lg-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <h2 className="text_white font-4 mb_0">Admin Panel</h2>
        </div>
        <nav className="admin-sidebar-nav">
          <ul className="admin-nav-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <a
                    href="#"
                    className={`admin-nav-item ${
                      isActive(item.path) ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.path);
                    }}
                  >
                    <Icon className="admin-nav-icon" />
                    <span className="admin-nav-label">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile & Logout Section */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-profile">
            <div className="admin-user-avatar">
              <FaUser />
            </div>
            <div className="admin-user-info">
              <div className="admin-user-name text_white">
                {user?.username || user?.email || "Admin"}
              </div>
              <div className="admin-user-email text_secondary-color">
                {user?.email}
              </div>
            </div>
          </div>
          <button
            className="admin-logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt className="admin-logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <div className="admin-content-inner">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay d-lg-none"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashbaodLayout;
