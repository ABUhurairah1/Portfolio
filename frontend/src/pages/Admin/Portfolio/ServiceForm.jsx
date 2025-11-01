import React from "react";

const ServiceForm = ({ formData, setFormData }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  return (
    <>
      <div className="admin-form-group">
        <label className="admin-form-label">Number</label>
        <input
          type="text"
          className="admin-form-input"
          value={formData.number || ""}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          placeholder="e.g., 01/"
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Title *</label>
        <input
          type="text"
          className="admin-form-input"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
        <label className="admin-form-label">Description</label>
        <textarea
          className="admin-form-textarea"
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
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

export default ServiceForm;

