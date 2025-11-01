import React from "react";

const SkillForm = ({ formData, setFormData }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  return (
    <>
      <div className="admin-form-group">
        <label className="admin-form-label">Name *</label>
        <input
          type="text"
          className="admin-form-input"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Image *</label>
        <input
          type="file"
          className="admin-form-input"
          onChange={handleImageChange}
          accept="image/*"
        />
        {formData.image && typeof formData.image === 'string' && (
          <p style={{ marginTop: '8px', color: 'var(--Text-muted)' }}>
            Current: {formData.image}
          </p>
        )}
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

export default SkillForm;

