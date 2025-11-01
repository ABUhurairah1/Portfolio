import React from "react";

const SocialForm = ({ formData, setFormData }) => {
  return (
    <>
      <div className="admin-form-group">
        <label className="admin-form-label">Platform *</label>
        <select
          className="admin-form-select"
          value={formData.platform || ""}
          onChange={(e) =>
            setFormData({ ...formData, platform: e.target.value })
          }
          required
        >
          <option value="">Select Platform</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="GitHub">GitHub</option>
          <option value="Twitter">Twitter/X</option>
          <option value="Dribbble">Dribbble</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="YouTube">YouTube</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">URL *</label>
        <input
          type="url"
          className="admin-form-input"
          value={formData.url || ""}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Icon Class</label>
        <input
          type="text"
          className="admin-form-input"
          value={formData.icon_class || ""}
          onChange={(e) =>
            setFormData({ ...formData, icon_class: e.target.value })
          }
          placeholder="e.g., icon-LinkedIn"
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Order</label>
        <input
          type="number"
          className="admin-form-input"
          value={formData.order || 0}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
        />
      </div>
    </>
  );
};

export default SocialForm;

