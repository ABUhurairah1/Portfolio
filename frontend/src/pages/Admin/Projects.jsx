import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaMinus } from "react-icons/fa";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";
import portfolio1 from "../../assets/images/user/portfolio-item-1.webp";

// Mock data based on existing portfolio structure - exact field names from SectionPortfolio
const initialProjects = [
  {
    id: 1,
    img: portfolio1,
    images: [portfolio1],
    tag: "Conversational AI",
    title: "AI-Powered Chatbot",
    subtitle: "Advanced Natural Language Processing",
    desc: "Built a sophisticated chatbot leveraging NLP and deep learning.",
    paragraphs: [
      {
        title: "Overview",
        content: "This project represents a breakthrough in conversational AI.",
      },
    ],
    href: "#",
  },
  {
    id: 2,
    img: portfolio1,
    images: [portfolio1],
    tag: "Computer Vision",
    title: "Real-Time Object Detection",
    subtitle: "Edge Computing Solution",
    desc: "Deployed a live CV pipeline on edge devices for fast recognition.",
    paragraphs: [],
    href: "#",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    img: "",
    images: "",
    tag: "",
    title: "",
    subtitle: "",
    desc: "",
    paragraphs: [],
    href: "#",
  });
  const [paragraphForm, setParagraphForm] = useState({
    title: "",
    content: "",
  });

  const handleEdit = (project) => {
    setEditingProject(project.id);
    setFormData({
      img: project.img || "",
      images: Array.isArray(project.images) ? project.images.join("\n") : "",
      tag: project.tag || "",
      title: project.title || "",
      subtitle: project.subtitle || "",
      desc: project.desc || "",
      paragraphs: project.paragraphs || [],
      href: project.href || "#",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleAddParagraph = () => {
    if (paragraphForm.title.trim() && paragraphForm.content.trim()) {
      setFormData({
        ...formData,
        paragraphs: [
          ...formData.paragraphs,
          { title: paragraphForm.title, content: paragraphForm.content },
        ],
      });
      setParagraphForm({ title: "", content: "" });
    }
  };

  const handleRemoveParagraph = (index) => {
    setFormData({
      ...formData,
      paragraphs: formData.paragraphs.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagesArray = formData.images
      ? formData.images.split("\n").filter((img) => img.trim())
      : [];

    const projectData = {
      ...formData,
      images: imagesArray.length > 0 ? imagesArray : [formData.img],
      img: formData.img || (imagesArray.length > 0 ? imagesArray[0] : ""),
    };

    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject ? { ...p, ...projectData } : p
        )
      );
      setEditingProject(null);
    } else {
      const newProject = {
        id: Date.now(),
        ...projectData,
      };
      setProjects([...projects, newProject]);
    }
    setShowForm(false);
    setFormData({
      img: "",
      images: "",
      tag: "",
      title: "",
      subtitle: "",
      desc: "",
      paragraphs: [],
      href: "#",
    });
    setParagraphForm({ title: "", content: "" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      img: "",
      images: "",
      tag: "",
      title: "",
      subtitle: "",
      desc: "",
      paragraphs: [],
      href: "#",
    });
    setParagraphForm({ title: "", content: "" });
  };

  return (
    <AdminDashbaodLayout>
      <div className="admin-projects-page">
        <div className="admin-page-header d-flex align-items-center justify-content-between">
          <div>
            <h1 className="admin-page-title">Projects</h1>
            <p className="admin-page-subtitle">
              Manage your portfolio projects
            </p>
          </div>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Add New Project
          </button>
        </div>

        {showForm && (
          <div className="admin-form mb_32">
            <div className="d-flex align-items-center justify-content-between mb_24">
              <h3 className="text_white font-4 mb_0">
                {editingProject ? "Edit Project" : "Add New Project"}
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
                <label className="admin-form-label">Title *</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="e.g., AI-Powered Chatbot"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Subtitle</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="e.g., Advanced Natural Language Processing"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Tag</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                  placeholder="e.g., Conversational AI"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Description *</label>
                <textarea
                  className="admin-form-textarea"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                  required
                  placeholder="Brief description of the project"
                  rows={3}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Main Image URL (img) *
                </label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.img}
                  onChange={(e) =>
                    setFormData({ ...formData, img: e.target.value })
                  }
                  required
                  placeholder="Enter main image URL or path"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Additional Images (images) - one per line
                </label>
                <textarea
                  className="admin-form-textarea"
                  value={formData.images}
                  onChange={(e) =>
                    setFormData({ ...formData, images: e.target.value })
                  }
                  placeholder="Enter image URLs, one per line"
                  rows={3}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Link (href)</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.href}
                  onChange={(e) =>
                    setFormData({ ...formData, href: e.target.value })
                  }
                  placeholder="e.g., # or https://example.com"
                />
              </div>

              {/* Paragraphs Section */}
              <div className="admin-form-group">
                <label className="admin-form-label">Content Paragraphs</label>
                <div className="admin-paragraphs-manager">
                  {formData.paragraphs.map((para, index) => (
                    <div key={index} className="admin-paragraph-item">
                      <div className="d-flex align-items-center justify-content-between mb_8">
                        <strong className="text_white">
                          {para.title || `Paragraph ${index + 1}`}
                        </strong>
                        <button
                          type="button"
                          className="admin-btn admin-btn-danger admin-btn-small"
                          onClick={() => handleRemoveParagraph(index)}
                        >
                          <FaMinus /> Remove
                        </button>
                      </div>
                      <p className="text-caption-1 text_muted-color mb_8">
                        {para.content.substring(0, 100)}...
                      </p>
                    </div>
                  ))}

                  <div className="admin-add-paragraph-form">
                    <div className="admin-grid admin-grid-2 mb_8">
                      <div className="admin-form-group mb_0">
                        <label className="admin-form-label">
                          Paragraph Title
                        </label>
                        <input
                          type="text"
                          className="admin-form-input"
                          value={paragraphForm.title}
                          onChange={(e) =>
                            setParagraphForm({
                              ...paragraphForm,
                              title: e.target.value,
                            })
                          }
                          placeholder="e.g., Overview"
                        />
                      </div>
                      <div className="admin-form-group mb_0">
                        <label className="admin-form-label">&nbsp;</label>
                        <button
                          type="button"
                          className="admin-btn admin-btn-secondary"
                          onClick={handleAddParagraph}
                          disabled={
                            !paragraphForm.title.trim() ||
                            !paragraphForm.content.trim()
                          }
                        >
                          <FaPlus /> Add Paragraph
                        </button>
                      </div>
                    </div>
                    <div className="admin-form-group mb_0">
                      <label className="admin-form-label">
                        Paragraph Content
                      </label>
                      <textarea
                        className="admin-form-textarea"
                        value={paragraphForm.content}
                        onChange={(e) =>
                          setParagraphForm({
                            ...paragraphForm,
                            content: e.target.value,
                          })
                        }
                        placeholder="Enter paragraph content"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
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
                  {editingProject ? "Update" : "Create"} Project
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-table-wrapper">
          {projects.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-state-icon">📁</div>
              <p>No projects yet. Add your first project to get started.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Description</th>
                  <th>Paragraphs</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <strong className="text_white">{project.title}</strong>
                      {project.subtitle && (
                        <div className="text-caption-1 text_muted-color mt_4">
                          {project.subtitle}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="text-label">{project.tag}</span>
                    </td>
                    <td>
                      <p className="text-body-2 mb_0">{project.desc}</p>
                    </td>
                    <td>
                      <span className="text-caption-1 text_muted-color">
                        {project.paragraphs?.length || 0} paragraphs
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-btn admin-btn-secondary admin-btn-small"
                          onClick={() => handleEdit(project)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-small"
                          onClick={() => handleDelete(project.id)}
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

export default Projects;
