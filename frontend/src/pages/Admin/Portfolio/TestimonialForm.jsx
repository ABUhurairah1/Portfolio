import React from "react";

const TestimonialForm = ({ formData, setFormData }) => {
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  };

  return (
    <>
      <div className="admin-form-group">
        <label className="admin-form-label">Quote *</label>
        <textarea
          className="admin-form-textarea"
          value={formData.quote || ""}
          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
          required
          rows={4}
        />
      </div>
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
        <label className="admin-form-label">Avatar</label>
        <input
          type="file"
          className="admin-form-input"
          onChange={handleAvatarChange}
          accept="image/*"
        />
        {formData.avatar && typeof formData.avatar === 'string' && (
          <p style={{ marginTop: '8px', color: 'var(--Text-muted)' }}>
            Current: {formData.avatar}
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

export default TestimonialForm;

