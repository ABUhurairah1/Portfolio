import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaMinus } from "react-icons/fa";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";
import {
  getProjectList,
  getProjectDetail,
  createProject,
  updateProject,
  deleteProject,
} from "../../apis";
import { toast } from "../../utils/toast";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    img: null, // File object or URL string
    imgUrl: "", // URL input for main image
    images: [], // Array of { file: File, url: string, mediaType: 'image' | 'video', order: number }
    tag: "",
    title: "",
    subtitle: "",
    desc: "",
    paragraphs: [],
    href: "#",
    order: 0,
  });
  const [paragraphForm, setParagraphForm] = useState({
    title: "",
    content: "",
  });
  const [newMediaInput, setNewMediaInput] = useState({
    url: "",
    mediaType: "image",
  });

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjectList();
      if (response.success && response.data) {
        setProjects(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      const errorMsg = error?.message || "Failed to fetch projects";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (project) => {
    try {
      // Fetch full project details
      const response = await getProjectDetail(project.id);
      if (response.success && response.data) {
        const projectData = response.data;
        setEditingProject(project.id);

        // Convert images array to form format
        const imagesArray = Array.isArray(projectData.images)
          ? projectData.images.map((img, index) => ({
              file: null,
              url: img.image || img.video || "",
              mediaType: img.media_type || (img.image ? "image" : "video"),
              order: img.order || index,
            }))
          : [];

        setFormData({
          img: null,
          imgUrl: projectData.img || "",
          images: imagesArray,
          tag: projectData.tag || "",
          title: projectData.title || "",
          subtitle: projectData.subtitle || "",
          desc: projectData.desc || "",
          paragraphs: projectData.paragraphs || [],
          href: projectData.href || "#",
          order: projectData.order || 0,
        });
        setShowForm(true);
      }
    } catch (error) {
      const errorMsg = error?.message || "Failed to fetch project details";
      toast.error(errorMsg);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        toast.success("Project deleted successfully");
        fetchProjects();
      } catch (error) {
        const errorMsg = error?.message || "Failed to delete project";
        toast.error(errorMsg);
      }
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

  // Handle main image file upload
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file, imgUrl: "" });
    }
  };

  // Handle main image URL input
  const handleMainImageUrlChange = (url) => {
    setFormData({ ...formData, imgUrl: url, img: null });
  };

  // Add image/video to images array
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isVideo = file.type.startsWith("video/");
      const newImage = {
        file: file,
        url: "",
        mediaType: newMediaInput.mediaType || (isVideo ? "video" : "image"),
        order: formData.images.length,
      };
      setFormData({
        ...formData,
        images: [...formData.images, newImage],
      });
      // Reset input
      e.target.value = "";
    }
  };

  // Add image/video by URL
  const handleAddImageUrl = () => {
    if (newMediaInput.url.trim()) {
      const newImage = {
        file: null,
        url: newMediaInput.url.trim(),
        mediaType: newMediaInput.mediaType || "image",
        order: formData.images.length,
      };
      setFormData({
        ...formData,
        images: [...formData.images, newImage],
      });
      setNewMediaInput({ url: "", mediaType: "image" });
    }
  };

  // Remove image/video from array
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images
        .filter((_, i) => i !== index)
        .map((img, i) => ({
          ...img,
          order: i,
        })),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate main image
    if (!formData.img && !formData.imgUrl) {
      toast.error("Please upload a main image or enter an image URL");
      return;
    }

    setLoading(true);
    try {
      // Prepare images array - handle both files and URLs
      const imagesArray = formData.images.map((img, index) => {
        const imageData = {
          order: img.order !== undefined ? img.order : index,
          media_type: img.mediaType || "image",
        };

        if (img.file) {
          // File upload
          if (img.mediaType === "video") {
            imageData.video = img.file;
          } else {
            imageData.image = img.file;
          }
        } else if (img.url) {
          // URL input (will be handled by serializer - it will ignore string URLs)
          // For now, we'll send it and let the backend handle it
          if (img.mediaType === "video") {
            imageData.video = img.url;
          } else {
            imageData.image = img.url;
          }
        }

        return imageData;
      });

      // Prepare paragraphs with order
      const paragraphsArray = formData.paragraphs.map((para, index) => ({
        title: para.title,
        content: para.content,
        order: para.order !== undefined ? para.order : index,
      }));

      const projectData = {
        tag: formData.tag,
        title: formData.title,
        subtitle: formData.subtitle || "",
        desc: formData.desc,
        img: formData.img || formData.imgUrl || null, // File or URL
        href: formData.href || "#",
        order: formData.order || 0,
        is_active: true,
        images: imagesArray,
        paragraphs: paragraphsArray,
      };

      if (editingProject) {
        await updateProject(editingProject, projectData);
        toast.success("Project updated successfully");
      } else {
        await createProject(projectData);
        toast.success("Project created successfully");
      }

      setShowForm(false);
      setEditingProject(null);
      setFormData({
        img: null,
        imgUrl: "",
        images: [],
        tag: "",
        title: "",
        subtitle: "",
        desc: "",
        paragraphs: [],
        href: "#",
        order: 0,
      });
      setParagraphForm({ title: "", content: "" });
      setNewMediaInput({ url: "", mediaType: "image" });
      fetchProjects();
    } catch (error) {
      const errorMsg = error?.message || "Failed to save project";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      img: null,
      imgUrl: "",
      images: [],
      tag: "",
      title: "",
      subtitle: "",
      desc: "",
      paragraphs: [],
      href: "#",
      order: 0,
    });
    setParagraphForm({ title: "", content: "" });
    setNewMediaInput({ url: "", mediaType: "image" });
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
              {/* Main Image Section */}
              <div className="admin-form-group">
                <label className="admin-form-label mb_16">
                  Main Image (Featured) *
                </label>
                <div className="admin-image-upload-box">
                  {formData.img || formData.imgUrl ? (
                    <div className="admin-image-preview-box">
                      <div className="admin-image-preview-content">
                        {formData.img ? (
                          <>
                            <img
                              src={URL.createObjectURL(formData.img)}
                              alt="Preview"
                              className="admin-image-preview"
                            />
                            <div className="admin-image-preview-overlay">
                              <span className="text-caption-1 text_white">
                                {formData.img.name}
                              </span>
                              <button
                                type="button"
                                className="admin-btn admin-btn-danger admin-btn-small mt_8"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    img: null,
                                    imgUrl: "",
                                  })
                                }
                              >
                                <FaTimes /> Remove
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={formData.imgUrl}
                              alt="Preview"
                              className="admin-image-preview"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextElementSibling.style.display =
                                  "flex";
                              }}
                            />
                            <div
                              className="admin-image-placeholder"
                              style={{ display: "none" }}
                            >
                              <span className="text-caption-1 text_muted-color">
                                Invalid Image URL
                              </span>
                            </div>
                            <div className="admin-image-preview-overlay">
                              <span className="text-caption-1 text_white">
                                {formData.imgUrl.length > 40 
                                  ? formData.imgUrl.substring(0, 40) + "..."
                                  : formData.imgUrl}
                              </span>
                              <button
                                type="button"
                                className="admin-btn admin-btn-danger admin-btn-small mt_8"
                                onClick={() =>
                                  setFormData({ ...formData, imgUrl: "" })
                                }
                              >
                                <FaTimes /> Remove
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <label className="admin-image-upload-placeholder">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        className="admin-image-upload-input"
                      />
                      <div className="admin-image-upload-icon">
                        <FaPlus size={32} />
                      </div>
                      <p className="text-body-2 text_white mt_12 mb_4">
                        Upload Main Image
                      </p>
                      <p className="text-caption-1 text_muted-color">
                        Click to browse or drag and drop
                      </p>
                    </label>
                  )}
                  <div className="admin-image-upload-url-section mt_16">
                    <p className="text-caption-1 text_muted-color mb_8 text-center">
                      Or enter image URL
                    </p>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={formData.imgUrl}
                      onChange={(e) => handleMainImageUrlChange(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      disabled={!!formData.img}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Images/Videos Section */}
              <div className="admin-form-group">
                <label className="admin-form-label mb_16">
                  Additional Images & Videos
                </label>
                
                {/* Display existing images/videos */}
                {formData.images.length > 0 && (
                  <div className="admin-media-grid mb_16">
                    {formData.images.map((img, index) => (
                      <div key={index} className="admin-media-item">
                        <div className="admin-media-preview">
                          {img.file ? (
                            img.mediaType === "video" ? (
                              <div className="admin-media-placeholder admin-media-video">
                                <FaPlus size={24} />
                                <span className="text-caption-1 mt_8">Video</span>
                                <span className="text-caption-2 text_muted-color mt_4">
                                  {img.file.name}
                                </span>
                              </div>
                            ) : (
                              <img
                                src={URL.createObjectURL(img.file)}
                                alt={`Preview ${index + 1}`}
                                className="admin-media-image"
                              />
                            )
                          ) : img.url ? (
                            img.mediaType === "video" ? (
                              <div className="admin-media-placeholder admin-media-video">
                                <span className="text-caption-1">🎥</span>
                                <span className="text-caption-1 mt_8">Video</span>
                                <span className="text-caption-2 text_muted-color mt_4">
                                  {img.url.length > 30 ? img.url.substring(0, 30) + "..." : img.url}
                                </span>
                              </div>
                            ) : (
                              <img
                                src={img.url}
                                alt={`Preview ${index + 1}`}
                                className="admin-media-image"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  const placeholder = e.target.nextElementSibling;
                                  if (placeholder)
                                    placeholder.style.display = "flex";
                                }}
                              />
                            )
                          ) : null}
                          <div
                            className="admin-media-placeholder"
                            style={{ display: "none" }}
                          >
                            <FaPlus size={24} />
                            <span className="text-caption-1 mt_8">
                              {img.mediaType === "video" ? "Video" : "Image"}
                            </span>
                          </div>
                          <div className="admin-media-overlay">
                            <span className="admin-media-badge">
                              {img.mediaType === "video"
                                ? "🎥 Video"
                                : "🖼️ Image"}
                            </span>
                            <button
                              type="button"
                              className="admin-media-remove-btn"
                              onClick={() => handleRemoveImage(index)}
                              title="Remove"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Simple Add Media Box */}
                <div className="admin-add-media-box">
                  <div className="admin-add-media-icon">
                    <FaPlus size={20} />
                  </div>
                  <div className="admin-add-media-form">
                    <div className="admin-grid admin-grid-2 mb_8">
                      <div className="admin-form-group mb_0">
                        <select
                          className="admin-form-select"
                          value={newMediaInput.mediaType}
                          onChange={(e) =>
                            setNewMediaInput({
                              ...newMediaInput,
                              mediaType: e.target.value,
                            })
                          }
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                      <div className="admin-form-group mb_0">
                        <label className="admin-image-upload-label">
                          <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleAddImage}
                            className="admin-image-upload-input"
                          />
                          <span className="admin-btn admin-btn-secondary">
                            Upload File
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="admin-form-group mb_0">
                      <div className="d-flex gap_8">
                        <input
                          type="text"
                          className="admin-form-input"
                          value={newMediaInput.url}
                          onChange={(e) =>
                            setNewMediaInput({
                              ...newMediaInput,
                              url: e.target.value,
                            })
                          }
                          placeholder="Or enter URL"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddImageUrl();
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="admin-btn admin-btn-primary"
                          onClick={handleAddImageUrl}
                          disabled={!newMediaInput.url.trim()}
                        >
                          <FaPlus /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
              <div className="admin-form-group">
                <label className="admin-form-label">Order</label>
                <input
                  type="number"
                  className="admin-form-input"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Display order (lower appears first)"
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
          {loading && projects.length === 0 ? (
            <div className="admin-loading-state">
              <div className="admin-loading-spinner"></div>
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
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
