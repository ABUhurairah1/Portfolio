import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";
import {
  getAboutList,
  createAbout,
  updateAbout,
  deleteAbout,
  getResumeList,
  createResume,
  updateResume,
  deleteResume,
  getServiceList,
  createService,
  updateService,
  deleteService,
  getSkillList,
  createSkill,
  updateSkill,
  deleteSkill,
  getTestimonialList,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getSocialMediaList,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} from "../../apis";
import { toast } from "../../utils/toast";
import ConfirmModal from "../../components/common/ConfirmModal";

// Import form components
import AboutForm from "./Portfolio/AboutForm";
import ResumeForm from "./Portfolio/ResumeForm";
import ServiceForm from "./Portfolio/ServiceForm";
import SkillForm from "./Portfolio/SkillForm";
import TestimonialForm from "./Portfolio/TestimonialForm";
import SocialForm from "./Portfolio/SocialForm";

// Import table components
import AboutTable from "./Portfolio/AboutTable";
import ResumeTable from "./Portfolio/ResumeTable";
import ServiceTable from "./Portfolio/ServiceTable";
import SkillTable from "./Portfolio/SkillTable";
import TestimonialTable from "./Portfolio/TestimonialTable";
import SocialTable from "./Portfolio/SocialTable";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousAboutLength, setPreviousAboutLength] = useState(0);

  // Data states
  const [aboutData, setAboutData] = useState([]);
  const [resumeData, setResumeData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [socialMediaData, setSocialMediaData] = useState([]);

  // Form states
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [rotatingTitleInput, setRotatingTitleInput] = useState("");

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Tabs configuration
  const tabs = [
    { id: "about", label: "About", key: "about" },
    { id: "resume", label: "Resume", key: "resume" },
    { id: "service", label: "Services", key: "service" },
    { id: "skill", label: "Skills", key: "skill" },
    { id: "testimonial", label: "Testimonials", key: "testimonial" },
    { id: "social", label: "Social Media", key: "social" },
  ];

  // Fetch data when tab changes
  const fetchData = useCallback(async (tab) => {
    setLoading(true);
    try {
      let response;
      switch (tab) {
        case "about": {
          response = await getAboutList();
          const aboutArray = response.data ? [response.data] : [];
          setAboutData(aboutArray);
          break;
        }
        case "resume":
          response = await getResumeList();
          setResumeData(response.data || []);
          break;
        case "service":
          response = await getServiceList();
          setServiceData(response.data || []);
          break;
        case "skill":
          response = await getSkillList();
          setSkillData(response.data || []);
          break;
        case "testimonial":
          response = await getTestimonialList();
          setTestimonialData(response.data || []);
          break;
        case "social":
          response = await getSocialMediaList();
          setSocialMediaData(response.data || []);
          break;
      }
    } catch (error) {
      const errorMsg = typeof error.message === 'string' ? error.message : 'Failed to fetch data';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, fetchData]);

  const handleEdit = useCallback((item) => {
    setEditingId(item.id);
    setFormData(item);
    if (item.rotating_titles) {
      setRotatingTitleInput("");
    }
    setShowForm(true);
  }, []);

  const resetFormData = useCallback((tab) => {
    switch (tab) {
      case "about":
        return {
          name: "",
          title: "",
          rotating_titles: [],
          main_title: "",
          description: "",
          years_experience: "10",
          satisfied_clients: "500",
          projects_completed: "1000",
          email: "",
          location: "",
          cv: null,
        };
      case "resume":
        return { type: "", role: "", organization: "", period: "", order: 0 };
      case "service":
        return {
          title: "",
          image: null,
          order: 0,
          is_active: true,
        };
      case "skill":
        return {
          name: "",
          image: null,
          order: 0,
          is_active: true,
        };
      case "testimonial":
        return {
          quote: "",
          name: "",
          title: "",
          avatar: null,
          order: 0,
          is_active: true,
        };
      case "social":
        return {
          platform: "",
          url: "",
          icon_class: "",
          order: 0,
          is_active: true,
        };
      default:
        return {};
    }
  }, []);

  const handleAddNew = useCallback(() => {
    setShowForm(true);
    setEditingId(null);
    setFormData(resetFormData(activeTab));
    setRotatingTitleInput("");
  }, [activeTab, resetFormData]);

  // Auto-open form for About tab
  useEffect(() => {
    if (activeTab === "about" && !loading && !showForm) {
      const aboutLengthChanged = aboutData.length !== previousAboutLength;
      if (aboutLengthChanged) {
        setPreviousAboutLength(aboutData.length);
        if (aboutData.length > 0) {
          handleEdit(aboutData[0]);
        } else {
          handleAddNew();
        }
      }
    }
  }, [
    aboutData,
    activeTab,
    loading,
    showForm,
    previousAboutLength,
    handleEdit,
    handleAddNew,
  ]);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      switch (activeTab) {
        case "about":
          await deleteAbout(itemToDelete);
          break;
        case "resume":
          await deleteResume(itemToDelete);
          break;
        case "service":
          await deleteService(itemToDelete);
          break;
        case "skill":
          await deleteSkill(itemToDelete);
          break;
        case "testimonial":
          await deleteTestimonial(itemToDelete);
          break;
        case "social":
          await deleteSocialMedia(itemToDelete);
          break;
      }
      toast.success("Deleted successfully");
      fetchData(activeTab);
    } catch (error) {
      const errorMsg = typeof error.message === 'string' ? error.message : 'Failed to delete';
      toast.error(errorMsg);
    } finally {
      setItemToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        switch (activeTab) {
          case "about":
            await updateAbout(editingId, formData);
            break;
          case "resume":
            await updateResume(editingId, formData);
            break;
          case "service":
            await updateService(editingId, formData);
            break;
          case "skill":
            await updateSkill(editingId, formData);
            break;
          case "testimonial":
            await updateTestimonial(editingId, formData);
            break;
          case "social":
            await updateSocialMedia(editingId, formData);
            break;
        }
        toast.success("Updated successfully");
      } else {
        switch (activeTab) {
          case "about":
            await createAbout(formData);
            break;
          case "resume":
            await createResume(formData);
            break;
          case "service":
            await createService(formData);
            break;
          case "skill":
            await createSkill(formData);
            break;
          case "testimonial":
            await createTestimonial(formData);
            break;
          case "social":
            await createSocialMedia(formData);
            break;
        }
        toast.success("Created successfully");
      }
      
      // Refresh data first
      await fetchData(activeTab);
      
      if (activeTab !== "about") {
        setShowForm(false);
        setEditingId(null);
        setFormData({});
      } else {
        // For About tab, reset the length tracking to trigger auto-open effect
        setPreviousAboutLength(0);
      }
    } catch (error) {
      const errorMsg = typeof error.message === 'string' ? error.message : 'Failed to save';
      toast.error(errorMsg);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({});
    setRotatingTitleInput("");
  };

  const renderForm = () => {
    const formProps = { formData, setFormData };

    switch (activeTab) {
      case "about":
        return (
          <AboutForm
            {...formProps}
            rotatingTitleInput={rotatingTitleInput}
            setRotatingTitleInput={setRotatingTitleInput}
          />
        );
      case "resume":
        return <ResumeForm {...formProps} />;
      case "service":
        return <ServiceForm {...formProps} />;
      case "skill":
        return <SkillForm {...formProps} />;
      case "testimonial":
        return <TestimonialForm {...formProps} />;
      case "social":
        return <SocialForm {...formProps} />;
      default:
        return null;
    }
  };

  const renderTable = () => {
    const tableProps = { onEdit: handleEdit, onDelete: handleDelete };
    const getCurrentData = () => {
      switch (activeTab) {
        case "about":
          return aboutData;
        case "resume":
          return resumeData;
        case "service":
          return serviceData;
        case "skill":
          return skillData;
        case "testimonial":
          return testimonialData;
        case "social":
          return socialMediaData;
        default:
          return [];
      }
    };

    const currentData = getCurrentData();

    if (loading) {
      return (
        <div className="admin-loading-state">
          <div className="admin-loading-spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }

    if (currentData.length === 0) {
      return (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">📝</div>
          <p>No items yet. Add your first item to get started.</p>
        </div>
      );
    }

    return (
      <table className="admin-table">
        <thead>
          {activeTab === "about" && (
            <AboutTable
              data={currentData}
              {...tableProps}
              renderHeader={true}
            />
          )}
          {activeTab === "resume" && (
            <ResumeTable
              data={currentData}
              {...tableProps}
              renderHeader={true}
            />
          )}
          {activeTab === "service" && (
            <ServiceTable
              data={currentData}
              {...tableProps}
              renderHeader={true}
            />
          )}
          {activeTab === "skill" && (
            <SkillTable
              data={currentData}
              {...tableProps}
              renderHeader={true}
            />
          )}
          {activeTab === "testimonial" && (
            <TestimonialTable
              data={currentData}
              {...tableProps}
              renderHeader={true}
            />
          )}
          {activeTab === "social" && (
            <SocialTable
              data={currentData}
              {...tableProps}
              renderHeader={true}
            />
          )}
        </thead>
        <tbody>
          {activeTab === "about" && (
            <AboutTable data={currentData} {...tableProps} />
          )}
          {activeTab === "resume" && (
            <ResumeTable data={currentData} {...tableProps} />
          )}
          {activeTab === "service" && (
            <ServiceTable data={currentData} {...tableProps} />
          )}
          {activeTab === "skill" && (
            <SkillTable data={currentData} {...tableProps} />
          )}
          {activeTab === "testimonial" && (
            <TestimonialTable data={currentData} {...tableProps} />
          )}
          {activeTab === "social" && (
            <SocialTable data={currentData} {...tableProps} />
          )}
        </tbody>
      </table>
    );
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowForm(false);
    setEditingId(null);
    setFormData(resetFormData(tabId));
    setRotatingTitleInput("");
    setPreviousAboutLength(0);
  };

  return (
    <AdminDashbaodLayout>
      <div className="admin-portfolio-page">
        <div className="admin-page-header d-flex align-items-center justify-content-between">
          <div>
            <h1 className="admin-page-title">Portfolio Management</h1>
            <p className="admin-page-subtitle">Manage your portfolio content</p>
          </div>
          {activeTab !== "about" && (
            <button
              className="admin-btn admin-btn-primary"
              onClick={handleAddNew}
            >
              <FaPlus /> Add New
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading state for About tab */}
        {loading && activeTab === "about" ? (
          <div className="admin-loading-state">
            <div className="admin-loading-spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {/* Form */}
            {showForm && (
              <div className="admin-form mb_32">
                <div className="d-flex align-items-center justify-content-between mb_24">
                  <h3 className="text_white font-4 mb_0">
                    {editingId ? "Edit" : "Add New"}{" "}
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h3>
                  {activeTab !== "about" && (
                    <button
                      className="admin-btn admin-btn-secondary admin-btn-small"
                      onClick={handleCancel}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
                <form onSubmit={handleSubmit}>
                  {renderForm()}
                  <div className="admin-form-actions">
                    {activeTab !== "about" && (
                      <button
                        type="button"
                        className="admin-btn admin-btn-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="admin-btn admin-btn-primary"
                    >
                      {editingId ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Table - Only show for tabs other than About */}
            {activeTab !== "about" && (
              <div className="admin-table-wrapper">{renderTable()}</div>
            )}
          </>
        )}

        {/* Confirmation Modal */}
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setItemToDelete(null);
          }}
          onConfirm={confirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this item? This action cannot be undone."
        />
      </div>
    </AdminDashbaodLayout>
  );
};

export default Portfolio;
