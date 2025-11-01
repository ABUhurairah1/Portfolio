import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";

// Mock data - in real app, this would come from API or localStorage
// Based on SectionContact component usage
const initialContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    subject: "Project Inquiry",
    message: "I would like to discuss a potential project opportunity.",
    date: new Date().toISOString(),
    read: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    subject: "Collaboration Proposal",
    message: "Interested in collaborating on an AI project.",
    date: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  },
];

const Contacts = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'read', 'unread'

  useEffect(() => {
    // In a real app, fetch contacts from API
    // loadContacts();
  }, []);

  const getFilteredContacts = () => {
    if (filter === "all") return contacts;
    return contacts.filter((c) => (filter === "read" ? c.read : !c.read));
  };

  const markAsRead = (id) => {
    setContacts(contacts.map((c) => (c.id === id ? { ...c, read: true } : c)));
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter((c) => c.id !== id));
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <AdminDashbaodLayout>
      <div className="admin-contacts-page">
        <div className="admin-page-header d-flex align-items-center justify-content-between">
          <div>
            <h1 className="admin-page-title">Contacts</h1>
            <p className="admin-page-subtitle">Manage contact submissions</p>
          </div>
          <div className="d-flex gap_8">
            <button
              className={`admin-btn admin-btn-secondary ${
                filter === "all" ? "active" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              All ({contacts.length})
            </button>
            <button
              className={`admin-btn admin-btn-secondary ${
                filter === "unread" ? "active" : ""
              }`}
              onClick={() => setFilter("unread")}
            >
              Unread ({contacts.filter((c) => !c.read).length})
            </button>
            <button
              className={`admin-btn admin-btn-secondary ${
                filter === "read" ? "active" : ""
              }`}
              onClick={() => setFilter("read")}
            >
              Read ({contacts.filter((c) => c.read).length})
            </button>
          </div>
        </div>

        <div className="admin-contacts-layout">
          <div className="admin-contacts-list">
            <h3 className="text_white font-4 mb_16">Contact Submissions</h3>
            {getFilteredContacts().length === 0 ? (
              <div className="admin-empty-state">
                <p>No contacts found.</p>
              </div>
            ) : (
              <div className="admin-contact-list-items">
                {getFilteredContacts().map((contact) => (
                  <div
                    key={contact.id}
                    className={`admin-contact-list-item ${
                      selectedContact?.id === contact.id ? "active" : ""
                    } ${!contact.read ? "unread" : ""}`}
                    onClick={() => {
                      setSelectedContact(contact);
                      if (!contact.read) {
                        markAsRead(contact.id);
                      }
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb_8">
                      <strong className="text_white">{contact.name}</strong>
                      {!contact.read && (
                        <span className="admin-unread-badge"></span>
                      )}
                    </div>
                    <div className="text-caption-1 text_muted-color mb_4">
                      <FaEnvelope className="mr_4" />
                      {contact.email}
                    </div>
                    <div className="text-caption-1 text_muted-color mb_4">
                      {contact.subject}
                    </div>
                    <div className="text-caption-1 text_muted-color">
                      {formatDate(contact.date)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin-contacts-detail">
            {selectedContact ? (
              <>
                <div className="admin-contact-header mb_24">
                  <div className="d-flex align-items-center justify-content-between mb_16">
                    <h3 className="text_white font-4 mb_0">
                      {selectedContact.name}
                    </h3>
                    <button
                      className="admin-btn admin-btn-danger admin-btn-small"
                      onClick={() => deleteContact(selectedContact.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="admin-contact-info">
                    <div className="admin-contact-info-item mb_12">
                      <FaEnvelope className="mr_8" />
                      <span className="text_white">
                        {selectedContact.email}
                      </span>
                    </div>
                    {selectedContact.phone && (
                      <div className="admin-contact-info-item mb_12">
                        <FaPhone className="mr_8" />
                        <span className="text_white">
                          {selectedContact.phone}
                        </span>
                      </div>
                    )}
                    <div className="admin-contact-info-item">
                      <span className="text-caption-1 text_muted-color">
                        {formatDate(selectedContact.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="admin-contact-body">
                  <h4 className="text_white font-4 mb_12">Subject</h4>
                  <p className="text-body-1 text_white mb_24">
                    {selectedContact.subject}
                  </p>

                  <h4 className="text_white font-4 mb_12">Message</h4>
                  <div className="admin-contact-message">
                    <p className="text-body-2 text_white">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="admin-empty-state">
                <div className="admin-empty-state-icon">📧</div>
                <p>Select a contact to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminDashbaodLayout>
  );
};

export default Contacts;
