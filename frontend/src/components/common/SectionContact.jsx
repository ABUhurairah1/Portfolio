import React, { useState, useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import smallCometWebp from "../../assets/images/item/small-comet.webp";
import { Button } from "./index.js";

// Budget options - can be fetched from database later
const BUDGET_OPTIONS = [
  { id: 1, value: "< $1,000", label: "< $1,000" },
  { id: 2, value: "$1,000 - $5,000", label: "$1,000 - $5,000" },
  { id: 3, value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
  { id: 4, value: "$10,000 - 20,000", label: "$10,000 - 20,000" },
  { id: 5, value: "> $20,000", label: "> $20,000" },
];

const SectionContact = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [links, setLinks] = useState([""]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    const newFiles = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type) => {
    if (type.includes("image")) return "📷";
    if (type === "application/pdf") return "📄";
    return "📎";
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const addLink = () => {
    setLinks((prev) => [...prev, ""]);
  };

  const removeLink = (index) => {
    if (links.length > 1) {
      setLinks((prev) => prev.filter((_, i) => i !== index));
    } else {
      setLinks([""]);
    }
  };

  const handleAmountToggle = (value) => {
    // Toggle: if already selected, unselect; otherwise select
    setSelectedAmount(selectedAmount === value ? null : value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Structure form data ready for database storage
    const formData = {
      // Contact Information
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      message: e.target.message.value.trim(),

      // Budget Selection (can be null if unselected)
      budget: selectedAmount,
      budgetId: selectedAmount
        ? BUDGET_OPTIONS.find((opt) => opt.value === selectedAmount)?.id
        : null,

      // Files - for DB: you might want to upload to storage first and save URLs
      files: uploadedFiles.map((file) => ({
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        // In production: upload file and store URL
        // url: await uploadFileToStorage(file.file)
      })),

      // Links array
      links: links.filter((link) => link.trim() !== ""),

      // Metadata for database
      submittedAt: new Date().toISOString(),
      status: "pending", // e.g., 'pending', 'read', 'responded'
    };

    console.log("Form data ready for database:", formData);

    // Open chat popup after submission
    if (typeof window.openChatPopup === "function") {
      const chatMessage = `Hi! I just submitted a contact form. ${
        formData.budget ? `My budget is ${formData.budget}.` : ""
      } ${
        formData.message
          ? `Message: ${formData.message.substring(0, 100)}${
              formData.message.length > 100 ? "..." : ""
            }`
          : ""
      }`;
      window.openChatPopup(chatMessage, formData.email);
    }

    // Example database insert structure:
    // INSERT INTO contact_submissions (name, email, message, budget, budget_id, links, submitted_at, status)
    // VALUES (formData.name, formData.email, formData.message, formData.budget, formData.budgetId, JSON.stringify(formData.links), formData.submittedAt, formData.status)

    // Then handle file uploads separately:
    // for (const file of uploadedFiles) {
    //   const fileUrl = await uploadFileToStorage(file.file);
    //   INSERT INTO contact_files (submission_id, name, size, type, url)
    //   VALUES (submissionId, file.name, file.size, file.type, fileUrl)
    // }

    // TODO: Add your API call here
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
    //   if (response.ok) {
    //     // Reset form
    //     e.target.reset();
    //     setSelectedAmount(null);
    //     setUploadedFiles([]);
    //     setLinks(['']);
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  };

  return (
    <div
      id="contact"
      className="section-contact spacing-1 pb-0 section spacing-1"
    >
      <div className="heading-section mb_44">
        <div className="tag-heading text-uppercase text-label font-3 letter-spacing-1 mb_33">
          Contact
        </div>
        <h3 className="text_white fw-5 animationtext clip ">
          Lets{" "}
          <span className="tf-text s1 cd-words-wrapper text_primary-color">
            <span className="item-text is-visible">Design</span>
            <span className="item-text is-hidden">Create</span>
            <span className="item-text is-hidden">Craft</span>
          </span>{" "}
          <br />
          Incredible Work Together
        </h3>
      </div>
      <form className="form-contact bs-light-mode" onSubmit={handleSubmit}>
        <div className="heading-title d-flex justify-content-between align-items-center mb_32">
          <div>
            <h4 className="text_white fw-4 mb_4">
              <a
                href="mailto:themesflat@gmail.com"
                className="hover-underline-link link"
              >
                themesflat@gmail.com
              </a>
            </h4>
            <p className="text-caption-2 text_secondary-color font-3">
              Based in San Francisco, CA
            </p>
          </div>
          <ul className="list-icon d-flex">
            <li>
              <a href="#" className="icon-LinkedIn"></a>
            </li>
            <li>
              <a href="#" className="icon-GitHub"></a>
            </li>
            <li>
              <a href="#" className="icon-X"></a>
            </li>
            <li>
              <a href="#" className="icon-dribbble"></a>
            </li>
          </ul>
        </div>
        <div className="d-grid gap_24  mb_24">
          <fieldset>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              name="name"
              tabIndex="2"
              aria-required="true"
              required
            />
          </fieldset>
          <fieldset>
            <input
              className=""
              type="email"
              placeholder="Your email"
              name="email"
              tabIndex="2"
              id="email"
              aria-required="true"
              required
            />
          </fieldset>
          <fieldset>
            <textarea
              id="message"
              className=""
              rows="4"
              placeholder="Your Message..."
              tabIndex="2"
              aria-required="true"
              required
            ></textarea>
          </fieldset>
        </div>

        {/* File Upload Section */}
        <div className="contact-upload-section mb_24">
          <label className="upload-label text_white font-3 mb_8">
            Attach Files (PDF, Images)
          </label>
          <fieldset className="file-upload-fieldset">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
              onChange={handleFileUpload}
              className="file-input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="file-upload-label">
              <i className="icon-PaperPlaneTilt"></i>
              <span>Click to upload or drag and drop</span>
              <span className="file-upload-hint text_secondary-color font-3">
                Max 10MB per file
              </span>
            </label>
          </fieldset>
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files mt_16">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="uploaded-file-item">
                  <div className="file-info">
                    <span className="file-icon">{getFileIcon(file.type)}</span>
                    <div className="file-details">
                      <span className="file-name text_white font-3">
                        {file.name}
                      </span>
                      <span className="file-size text_secondary-color font-3">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="file-remove-btn"
                    aria-label="Remove file"
                  >
                    <FaXmark />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Links Section */}
        <div className="links-section mb_24">
          <label className="links-label text_white font-3 mb_8">
            Project Links (Optional)
          </label>
          {links.map((link, index) => (
            <fieldset key={index} className="link-fieldset">
              <input
                type="url"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                className="link-input"
              />
              {links.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="link-remove-btn"
                  aria-label="Remove link"
                >
                  <FaXmark />
                </button>
              )}
            </fieldset>
          ))}
          <button type="button" onClick={addLink} className="add-link-btn">
            <i className="icon-PaperPlaneTilt"></i>
            <span>Add Another Link</span>
          </button>
        </div>

        <ul className="list-tag">
          {BUDGET_OPTIONS.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => handleAmountToggle(option.value)}
                className={`text_white text-body-1 font-3 ${
                  selectedAmount === option.value ? "selected" : ""
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
        <Button type="submit" variant="style-1" animate>
          <span>Get Started !</span>
        </Button>
        <div className="item-shape">
          <img src={smallCometWebp} alt="item" />
        </div>
      </form>
      <p className="font-3 text_secondary-color">
        © 2025 ZenG. All Rights Reserved.
      </p>
    </div>
  );
};

export default SectionContact;
