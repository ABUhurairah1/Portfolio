import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";

// Mock data based on existing testimonial structure
const initialTestimonials = [
  {
    id: 1,
    quote:
      "ZenG delivered exceptional work. He's professional, fast, and extremely easy to work with. I'd definitely hire him again for future projects!",
    name: "Lincoln Press",
    title: "CEO Themesfalt",
  },
  {
    id: 2,
    quote:
      "ZenG managed our project with impressive efficiency and clarity. Deadlines were met, communication was smooth, and the outcome was exactly what we hoped for.",
    name: "Cheyenne Mango",
    title: "CEO Themesfalt",
  },
  {
    id: 3,
    quote:
      "We were blown away by the project quality and turnaround time. Highly recommended for any high-end AI work.",
    name: "Morgan Stanford",
    title: "CTO FinTech Labs",
  },
  {
    id: 4,
    quote:
      "The best freelancer we ever worked with. Super organized and creative!",
    name: "Nikita Varga",
    title: "Product Manager BrightPath",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    quote: "",
    name: "",
    title: "",
  });

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial.id);
    setFormData({
      quote: testimonial.quote,
      name: testimonial.name,
      title: testimonial.title,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTestimonial) {
      setTestimonials(
        testimonials.map((t) =>
          t.id === editingTestimonial ? { ...t, ...formData } : t
        )
      );
      setEditingTestimonial(null);
    } else {
      const newTestimonial = {
        id: Date.now(),
        ...formData,
      };
      setTestimonials([...testimonials, newTestimonial]);
    }
    setShowForm(false);
    setFormData({
      quote: "",
      name: "",
      title: "",
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTestimonial(null);
    setFormData({
      quote: "",
      name: "",
      title: "",
    });
  };

  return (
    <AdminDashbaodLayout>
      <div className="admin-testimonials-page">
        <div className="admin-page-header d-flex align-items-center justify-content-between">
          <div>
            <h1 className="admin-page-title">Testimonials</h1>
            <p className="admin-page-subtitle">Manage client testimonials</p>
          </div>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Add New Testimonial
          </button>
        </div>

        {showForm && (
          <div className="admin-form mb_32">
            <div className="d-flex align-items-center justify-content-between mb_24">
              <h3 className="text_white font-4 mb_0">
                {editingTestimonial
                  ? "Edit Testimonial"
                  : "Add New Testimonial"}
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
                <label className="admin-form-label">Quote</label>
                <textarea
                  className="admin-form-textarea"
                  value={formData.quote}
                  onChange={(e) =>
                    setFormData({ ...formData, quote: e.target.value })
                  }
                  required
                  placeholder="Enter the testimonial quote"
                  rows={4}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Name</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="Client name"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Title/Position</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="e.g., CEO Themesfalt"
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
                  {editingTestimonial ? "Update" : "Create"} Testimonial
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-table-wrapper">
          {testimonials.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-state-icon">💬</div>
              <p>
                No testimonials yet. Add your first testimonial to get started.
              </p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Quote</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td>
                      <p className="text-body-2 mb_0">{testimonial.quote}</p>
                    </td>
                    <td>
                      <strong className="text_white">{testimonial.name}</strong>
                    </td>
                    <td>
                      <span className="text-label">{testimonial.title}</span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-btn admin-btn-secondary admin-btn-small"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-small"
                          onClick={() => handleDelete(testimonial.id)}
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

export default Testimonials;
