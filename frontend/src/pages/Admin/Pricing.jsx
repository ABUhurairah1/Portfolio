import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";

// Mock data based on existing pricing structure
const initialPlans = [
  {
    id: "standard-plan",
    title: "Standard Plan",
    features: [
      "60 keywords",
      "6,000 monthly website visitors",
      "8 blogs / month",
      "10 quality backlinks / month",
    ],
    price: "$29",
    unit: "/per hour",
    active: true,
  },
  {
    id: "premium-plan",
    title: "Premium Plan",
    features: [
      "120 keywords",
      "15,000 monthly website visitors",
      "20 blogs / month",
      "30 pro-quality backlinks / month",
    ],
    price: "$99",
    unit: "/per hour",
    active: false,
  },
];

const Pricing = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    features: "",
    price: "",
    unit: "",
    active: false,
  });

  const handleEdit = (plan) => {
    setEditingPlan(plan.id);
    setFormData({
      title: plan.title,
      features: plan.features.join("\n"),
      price: plan.price,
      unit: plan.unit,
      active: plan.active,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pricing plan?")) {
      setPlans(plans.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const featuresArray = formData.features.split("\n").filter((f) => f.trim());

    if (editingPlan) {
      setPlans(
        plans.map((p) =>
          p.id === editingPlan
            ? { ...p, ...formData, features: featuresArray }
            : p
        )
      );
      setEditingPlan(null);
    } else {
      const newPlan = {
        id: `plan-${Date.now()}`,
        ...formData,
        features: featuresArray,
      };
      setPlans([...plans, newPlan]);
    }
    setShowForm(false);
    setFormData({
      title: "",
      features: "",
      price: "",
      unit: "",
      active: false,
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPlan(null);
    setFormData({
      title: "",
      features: "",
      price: "",
      unit: "",
      active: false,
    });
  };

  return (
    <AdminDashbaodLayout>
      <div className="admin-pricing-page">
        <div className="admin-page-header d-flex align-items-center justify-content-between">
          <div>
            <h1 className="admin-page-title">Pricing Plans</h1>
            <p className="admin-page-subtitle">Manage your pricing plans</p>
          </div>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Add New Plan
          </button>
        </div>

        {showForm && (
          <div className="admin-form mb_32">
            <div className="d-flex align-items-center justify-content-between mb_24">
              <h3 className="text_white font-4 mb_0">
                {editingPlan ? "Edit Pricing Plan" : "Add New Pricing Plan"}
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
                <label className="admin-form-label">Plan Title</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="e.g., Standard Plan"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Price</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  placeholder="e.g., $29"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Unit</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  placeholder="e.g., /per hour"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Features (one per line)
                </label>
                <textarea
                  className="admin-form-textarea"
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  placeholder="60 keywords&#10;6,000 monthly website visitors&#10;8 blogs / month"
                  rows={5}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label d-flex align-items-center gap_8">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                  />
                  <span>Set as active plan</span>
                </label>
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
                  {editingPlan ? "Update" : "Create"} Plan
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-grid admin-grid-2 mb_32">
          {plans.map((plan) => (
            <div key={plan.id} className="admin-plan-card area-effect">
              <div className="d-flex align-items-center justify-content-between mb_16">
                <h3 className="text_white font-4 mb_0">{plan.title}</h3>
                <div className="admin-actions">
                  <button
                    className="admin-btn admin-btn-secondary admin-btn-small"
                    onClick={() => handleEdit(plan)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="admin-btn admin-btn-danger admin-btn-small"
                    onClick={() => handleDelete(plan.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="mb_16">
                <h4 className="text_white font-4 mb_4">
                  {plan.price}{" "}
                  <span className="text-caption-1 text_muted-color">
                    {plan.unit}
                  </span>
                </h4>
              </div>
              <ul className="list-check d-grid gap_8 mb_16">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-body-1 text_white font-3 d-flex align-items-center gap_8"
                  >
                    <i className="icon-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.active && (
                <span className="text-label text_primary-color">
                  Active Plan
                </span>
              )}
            </div>
          ))}
        </div>

        {plans.length === 0 && (
          <div className="admin-empty-state">
            <div className="admin-empty-state-icon">💳</div>
            <p>No pricing plans yet. Add your first plan to get started.</p>
          </div>
        )}
      </div>
    </AdminDashbaodLayout>
  );
};

export default Pricing;
