import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";
import {
  getPlanList,
  getPlanDetail,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../apis";
import { toast } from "../../utils/toast";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    features: [], // Changed to array
    price: "",
    unit: "",
    active: false,
    order: 0,
  });
  const [featureInput, setFeatureInput] = useState("");

  // Fetch plans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await getPlanList();
      if (response.success && response.data) {
        setPlans(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      const errorMsg = error?.message || "Failed to fetch plans";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (plan) => {
    try {
      // Fetch full plan details
      const response = await getPlanDetail(plan.id);
      if (response.success && response.data) {
        const planData = response.data;
        setEditingPlan(plan.id);
        setFormData({
          title: planData.title || "",
          features: Array.isArray(planData.features)
            ? planData.features
            : [],
          price: planData.price || "",
          unit: planData.unit || "/per hour",
          active: planData.active || false,
          order: planData.order || 0,
        });
        setFeatureInput("");
        setShowForm(true);
      }
    } catch (error) {
      const errorMsg = error?.message || "Failed to fetch plan details";
      toast.error(errorMsg);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pricing plan?")) {
      try {
        await deletePlan(id);
        toast.success("Plan deleted successfully");
        fetchPlans();
      } catch (error) {
        const errorMsg = error?.message || "Failed to delete plan";
        toast.error(errorMsg);
      }
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const planData = {
        title: formData.title,
        features: formData.features,
        price: formData.price,
        unit: formData.unit || "/per hour",
        active: formData.active || false,
        order: formData.order || 0,
        is_active: true,
      };

      if (editingPlan) {
        await updatePlan(editingPlan, planData);
        toast.success("Plan updated successfully");
      } else {
        await createPlan(planData);
        toast.success("Plan created successfully");
      }

      setShowForm(false);
      setEditingPlan(null);
      setFormData({
        title: "",
        features: [],
        price: "",
        unit: "",
        active: false,
        order: 0,
      });
      setFeatureInput("");
      fetchPlans();
    } catch (error) {
      const errorMsg = error?.message || "Failed to save plan";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPlan(null);
    setFormData({
      title: "",
      features: [],
      price: "",
      unit: "",
      active: false,
      order: 0,
    });
    setFeatureInput("");
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
                <label className="admin-form-label mb_16">Features</label>
                
                {/* Features List */}
                {formData.features.length > 0 && (
                  <div className="admin-features-list mb_16">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="admin-feature-item">
                        <div className="d-flex align-items-center gap_12">
                          <i className="icon-check text_primary-color"></i>
                          <span className="text-body-2 text_white flex-1">
                            {feature}
                          </span>
                          <button
                            type="button"
                            className="admin-btn admin-btn-danger admin-btn-small"
                            onClick={() => handleRemoveFeature(index)}
                            title="Remove feature"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Feature Input */}
                <div className="admin-add-feature-box">
                  <div className="d-flex align-items-end justify-content-between gap_8">
                    <div className="flex-1">
                      <input
                        type="text"
                        className="admin-form-input"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddFeature();
                          }
                        }}
                        placeholder="Enter a feature (e.g., 60 keywords)"
                      />
                    </div>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={handleAddFeature}
                      disabled={!featureInput.trim()}
                    >
                      <FaPlus /> Add Feature
                    </button>
                  </div>
                  <p className="text-caption-1 text_muted-color mt_8">
                    Press Enter or click Add Feature to add each feature
                  </p>
                </div>
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

        {loading && plans.length === 0 ? (
          <div className="admin-loading-state">
            <div className="admin-loading-spinner"></div>
            <p>Loading plans...</p>
          </div>
        ) : (
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
        )}

        {!loading && plans.length === 0 && (
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
