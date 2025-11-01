import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaLock, FaEnvelope, FaSave, FaEdit } from "react-icons/fa";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";
import { toast } from "../../utils/toast";
import { updateUser } from "../../store/slices/authSlice";
import { changePassword } from "../../apis/auth";
import Button from "../../components/common/Button";

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    username: user?.username || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    // Validate email
    if (!formData.email || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Update user profile (mock - replace with API call)
    try {
      const updatedUser = {
        ...user,
        email: formData.email,
        username: formData.username,
      };

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(updateUser(updatedUser));

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (!formData.currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (!formData.newPassword || formData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Update password using API
    try {
      const response = await changePassword(
        formData.currentPassword,
        formData.newPassword
      );

      if (response.success) {
        toast.success(response.message || "Password changed successfully");

        // Clear password fields
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to change password";
      toast.error(errorMessage);
    }
  };

  return (
    <AdminDashbaodLayout>
      <div className="admin-page">
        <h1 className="admin-page-title">Settings</h1>
        <p className="admin-page-subtitle text_secondary-color mb_32">
          Manage your account settings and preferences
        </p>

        <div className="admin-settings-container">
          {/* Profile Settings */}
          <div className="admin-settings-section">
            <div className="admin-settings-header">
              <FaUser className="admin-settings-icon" />
              <h2 className="admin-settings-title">Profile Information</h2>
            </div>

            <form
              onSubmit={handleProfileUpdate}
              className="admin-settings-form"
            >
              <div className="admin-form-group">
                <label className="admin-form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="admin-form-input"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="admin-form-input"
                  required
                />
              </div>

              <div className="admin-form-actions">
                {!isEditing ? (
                  <Button
                    type="button"
                    variant="style-1"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit /> <span>Edit Profile</span>
                  </Button>
                ) : (
                  <>
                    <Button type="submit" variant="style-1">
                      <FaSave /> <span>Save Changes</span>
                    </Button>
                    <Button
                      type="button"
                      variant="style-border"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          email: user?.email || "",
                          username: user?.username || "",
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>

          {/* Password Settings */}
          <div className="admin-settings-section">
            <div className="admin-settings-header">
              <FaLock className="admin-settings-icon" />
              <h2 className="admin-settings-title">Change Password</h2>
            </div>

            <form
              onSubmit={handlePasswordChange}
              className="admin-settings-form"
            >
              <div className="admin-form-group">
                <label className="admin-form-label">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="admin-form-input"
                  placeholder="Enter current password"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="admin-form-input"
                  placeholder="Enter new password (min. 8 characters)"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="admin-form-input"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="admin-form-actions">
                <Button type="submit" variant="style-1">
                  <FaLock /> <span>Change Password</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminDashbaodLayout>
  );
};

export default Settings;
