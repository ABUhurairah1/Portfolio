import React from "react";
import { FaPlus } from "react-icons/fa";

const AboutForm = ({ formData, setFormData, rotatingTitleInput, setRotatingTitleInput }) => {
  const addRotatingTitle = () => {
    if (rotatingTitleInput.trim()) {
      const currentTitles = formData.rotating_titles || [];
      setFormData({
        ...formData,
        rotating_titles: [...currentTitles, rotatingTitleInput.trim()],
      });
      setRotatingTitleInput("");
    }
  };

  const removeRotatingTitle = (index) => {
    const currentTitles = formData.rotating_titles || [];
    setFormData({
      ...formData,
      rotating_titles: currentTitles.filter((_, i) => i !== index),
    });
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, cv: file });
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
        <label className="admin-form-label">Rotating Titles</label>
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
          <input
            type="text"
            className="admin-form-input"
            value={rotatingTitleInput}
            onChange={(e) => setRotatingTitleInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addRotatingTitle();
              }
            }}
            placeholder="Enter a title and press Enter or click +"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={addRotatingTitle}
            style={{ 
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FaPlus />
          </button>
        </div>
        {formData.rotating_titles && formData.rotating_titles.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {formData.rotating_titles.map((title, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  background: "var(--Primary)",
                  color: "var(--White)",
                  borderRadius: "6px",
                  fontSize: "13px",
                }}
              >
                {title}
                <button
                  type="button"
                  onClick={() => removeRotatingTitle(idx)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--White)",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: 0,
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Main Title *</label>
        <input
          type="text"
          className="admin-form-input"
          value={formData.main_title || ""}
          onChange={(e) =>
            setFormData({ ...formData, main_title: e.target.value })
          }
          required
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Description *</label>
        <textarea
          className="admin-form-textarea"
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          rows={4}
        />
      </div>
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Years Experience</label>
          <input
            type="number"
            step="0.1"
            className="admin-form-input"
            value={formData.years_experience || ""}
            onChange={(e) =>
              setFormData({ ...formData, years_experience: e.target.value })
            }
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Satisfied Clients</label>
          <input
            type="number"
            className="admin-form-input"
            value={formData.satisfied_clients || ""}
            onChange={(e) =>
              setFormData({ ...formData, satisfied_clients: e.target.value })
            }
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Projects Completed</label>
          <input
            type="number"
            className="admin-form-input"
            value={formData.projects_completed || ""}
            onChange={(e) =>
              setFormData({ ...formData, projects_completed: e.target.value })
            }
          />
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Email *</label>
        <input
          type="email"
          className="admin-form-input"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Location *</label>
        <input
          type="text"
          className="admin-form-input"
          value={formData.location || ""}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">CV/Resume</label>
        <input
          type="file"
          className="admin-form-input"
          onChange={handleCvChange}
          accept=".pdf,application/pdf"
        />
        {formData.cv && typeof formData.cv === 'string' && (
          <p style={{ marginTop: '8px', color: 'var(--Text-muted)' }}>
            Current: {formData.cv}
          </p>
        )}
      </div>
    </>
  );
};

export default AboutForm;

