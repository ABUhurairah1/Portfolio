import React from "react";

const ResumeForm = ({ formData, setFormData }) => {
  return (
    <>
      <div className="admin-form-group">
        <label className="admin-form-label">Type *</label>
        <select
          className="admin-form-select"
          value={formData.type || ""}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        >
          <option value="">Select Type</option>
          <option value="experience">Experience</option>
          <option value="education">Education</option>
        </select>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Role *</label>
        <input
          type="text"
          className="admin-form-input"
          value={formData.role || ""}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Organization *</label>
        <input
          type="text"
          className="admin-form-input"
          value={formData.organization || ""}
          onChange={(e) =>
            setFormData({ ...formData, organization: e.target.value })
          }
          required
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Period *</label>
        <input
          type="text"
          className="admin-form-input"
          value={formData.period || ""}
          onChange={(e) => setFormData({ ...formData, period: e.target.value })}
          required
          placeholder="e.g., 2020 - Present"
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

export default ResumeForm;

