import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";

// Mock data for skills - with icon/image URLs
const initialSkills = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    icon: "",
    description: "Expert level in React development",
  },
  {
    id: 2,
    name: "Python",
    category: "Backend",
    icon: "",
    description: "Advanced Python programming",
  },
  {
    id: 3,
    name: "Node.js",
    category: "Backend",
    icon: "",
    description: "Proficient in Node.js development",
  },
  {
    id: 4,
    name: "Machine Learning",
    category: "AI/ML",
    icon: "",
    description: "Experience with ML models and frameworks",
  },
];

const Skills = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon: "",
    description: "",
  });
  const [iconPreview, setIconPreview] = useState(null);

  const handleEdit = (skill) => {
    setEditingSkill(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      icon: skill.icon || "",
      description: skill.description,
    });
    setIconPreview(skill.icon || null);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setSkills(skills.filter((s) => s.id !== id));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if it's an image or SVG
      if (file.type.startsWith("image/") || file.name.endsWith(".svg")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setFormData({ ...formData, icon: result });
          setIconPreview(result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload an image (PNG, JPG, SVG, etc.)");
      }
    }
  };

  const handleIconUrlChange = (url) => {
    setFormData({ ...formData, icon: url });
    setIconPreview(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSkill) {
      setSkills(
        skills.map((s) => (s.id === editingSkill ? { ...s, ...formData } : s))
      );
      setEditingSkill(null);
    } else {
      const newSkill = {
        id: Date.now(),
        ...formData,
      };
      setSkills([...skills, newSkill]);
    }
    setShowForm(false);
    setFormData({
      name: "",
      category: "",
      icon: "",
      description: "",
    });
    setIconPreview(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSkill(null);
    setFormData({
      name: "",
      category: "",
      icon: "",
      description: "",
    });
    setIconPreview(null);
  };

  return (
    <AdminDashbaodLayout>
      <div className="admin-skills-page">
        <div className="admin-page-header d-flex align-items-center justify-content-between">
          <div>
            <h1 className="admin-page-title">Skills</h1>
            <p className="admin-page-subtitle">Manage your skills portfolio</p>
          </div>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Add New Skill
          </button>
        </div>

        {showForm && (
          <div className="admin-form mb_32">
            <div className="d-flex align-items-center justify-content-between mb_24">
              <h3 className="text_white font-4 mb_0">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h3>
              <button
                className="admin-btn admin-btn-secondary admin-btn-small"
                onClick={handleCancel}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label className="admin-form-label">Skill Name *</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="e.g., React, Python"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Category *</label>
                <select
                  className="admin-form-select"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Icon (SVG or Image)</label>

                {/* Option 1: File Upload */}
                <div className="mb_12">
                  <label className="admin-form-label text-caption-1">
                    Upload Image/SVG
                  </label>
                  <input
                    type="file"
                    accept="image/*,.svg"
                    onChange={handleFileChange}
                    className="admin-form-input"
                  />
                  <div className="text-caption-1 text_muted-color mt_4">
                    Upload PNG, JPG, SVG or any image format
                  </div>
                </div>

                {/* Option 2: URL Input */}
                <div className="mb_12">
                  <label className="admin-form-label text-caption-1">
                    Or Enter Image URL
                  </label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={formData.icon}
                    onChange={(e) => handleIconUrlChange(e.target.value)}
                    placeholder="e.g., https://example.com/icon.svg or /assets/icons/react.svg"
                  />
                </div>

                {/* Preview */}
                {iconPreview && (
                  <div className="admin-icon-preview">
                    <div className="admin-icon-preview-label text-caption-1 text_muted-color mb_4">
                      Preview:
                    </div>
                    <div className="admin-icon-preview-container">
                      <img
                        src={iconPreview}
                        alt="Icon preview"
                        className="admin-icon-preview-image"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                      <div
                        className="admin-icon-preview-error"
                        style={{ display: "none" }}
                      >
                        <span className="text_caption-1 text_muted-color">
                          Unable to load image
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea
                  className="admin-form-textarea"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of the skill"
                  rows={3}
                />
              </div>
              <div className="admin-form-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingSkill ? "Update" : "Create"} Skill
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-table-wrapper">
          {skills.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-state-icon">💻</div>
              <p>No skills yet. Add your first skill to get started.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Skill Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td>
                      {skill.icon ? (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="admin-skill-icon-image"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text_muted-color">—</span>
                      )}
                    </td>
                    <td>
                      <strong className="text_white">{skill.name}</strong>
                    </td>
                    <td>
                      <span className="text-label">{skill.category}</span>
                    </td>
                    <td>
                      <p className="text-body-2 mb_0">{skill.description}</p>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-btn admin-btn-secondary admin-btn-small"
                          onClick={() => handleEdit(skill)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-small"
                          onClick={() => handleDelete(skill.id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminDashbaodLayout>
  );
};

export default Skills;
