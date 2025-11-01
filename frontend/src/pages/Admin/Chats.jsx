import React, { useState, useEffect, useCallback } from "react";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";

const Chats = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'user', 'admin'

  const loadConversations = useCallback(() => {
    // Get all localStorage keys that start with 'chat_history_'
    const conversationsMap = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("chat_history_")) {
        try {
          const messages = JSON.parse(localStorage.getItem(key));
          if (Array.isArray(messages) && messages.length > 0) {
            // Extract email from key or from messages
            const email = key
              .replace("chat_history_", "")
              .replace(/^browser_/, "");
            const userEmail =
              messages.find((m) => m.userEmail)?.userEmail || email;

            if (!conversationsMap[userEmail]) {
              conversationsMap[userEmail] = {
                email: userEmail,
                messages: [],
                lastMessageTime: null,
                unreadCount: 0,
              };
            }

            messages.forEach((msg) => {
              if (
                msg &&
                msg.text &&
                (msg.sender === "user" || msg.sender === "admin")
              ) {
                conversationsMap[userEmail].messages.push(msg);

                const msgTime = new Date(msg.timestamp);
                if (
                  !conversationsMap[userEmail].lastMessageTime ||
                  msgTime > conversationsMap[userEmail].lastMessageTime
                ) {
                  conversationsMap[userEmail].lastMessageTime = msgTime;
                }
              }
            });

            // Sort messages by timestamp
            conversationsMap[userEmail].messages.sort(
              (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );
          }
        } catch (e) {
          console.error("Error parsing chat history:", e);
        }
      }
    }

    // Convert to array and sort by last message time
    const conversationsArray = Object.values(conversationsMap)
      .map((conv) => ({
        ...conv,
        lastMessage: conv.messages[conv.messages.length - 1],
      }))
      .sort((a, b) => {
        if (!a.lastMessageTime && !b.lastMessageTime) return 0;
        if (!a.lastMessageTime) return 1;
        if (!b.lastMessageTime) return -1;
        return b.lastMessageTime - a.lastMessageTime;
      });

    setConversations((prevConversations) => {
      // Auto-select first conversation if none selected
      if (
        prevConversations.length === 0 &&
        conversationsArray.length > 0 &&
        !selectedEmail
      ) {
        setSelectedEmail(conversationsArray[0].email);
      }
      return conversationsArray;
    });
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const getSelectedConversation = () => {
    return conversations.find((conv) => conv.email === selectedEmail);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const formatTimeShort = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "2")}`;
  };

  const getInitials = (email) => {
    if (!email) return "?";
    const parts = email.split("@")[0];
    if (parts.length >= 2) {
      return parts.substring(0, 2).toUpperCase();
    }
    return parts.charAt(0).toUpperCase();
  };

  return (
    <AdminDashbaodLayout>
      <div className="admin-chats-page">
        <div className="admin-page-header d-flex align-items-center justify-content-between">
          <div>
            <h1 className="admin-page-title">Chats</h1>
            <p className="admin-page-subtitle">Manage all chat conversations</p>
          </div>
          <div className="d-flex gap_8">
            <button
              className={`admin-btn admin-btn-secondary ${
                filter === "all" ? "active" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              All ({conversations.length})
            </button>
          </div>
        </div>

        <div className="admin-chats-layout">
          {/* Conversations List */}
          <div className="admin-chats-list">
            <div className="admin-chats-list-header">
              <h3 className="text_white font-4 mb_0">Conversations</h3>
              <span className="text-caption-1 text_muted-color">
                {conversations.length} total
              </span>
            </div>

            {conversations.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-state-icon">💬</div>
                <p>No conversations yet</p>
              </div>
            ) : (
              <div className="admin-conversation-list-items">
                {conversations.map((conversation) => {
                  const isSelected = selectedEmail === conversation.email;
                  const lastMessage = conversation.lastMessage;

                  return (
                    <div
                      key={conversation.email}
                      className={`admin-conversation-item ${
                        isSelected ? "active" : ""
                      }`}
                      onClick={() => setSelectedEmail(conversation.email)}
                    >
                      <div className="admin-conversation-avatar">
                        <span>{getInitials(conversation.email)}</span>
                      </div>
                      <div className="admin-conversation-content">
                        <div className="admin-conversation-header">
                          <span className="admin-conversation-email text_white">
                            {conversation.email}
                          </span>
                          {lastMessage && (
                            <span className="admin-conversation-time text-caption-1 text_muted-color">
                              {formatTimeShort(lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        {lastMessage && (
                          <div className="admin-conversation-preview text-caption-1 text_muted-color">
                            <span className="admin-conversation-sender">
                              {lastMessage.sender === "admin" ? "You: " : ""}
                            </span>
                            {lastMessage.text.length > 50
                              ? `${lastMessage.text.substring(0, 50)}...`
                              : lastMessage.text}
                          </div>
                        )}
                        <div className="admin-conversation-meta">
                          <span className="admin-conversation-count text-caption-1 text_muted-color">
                            {conversation.messages.length} messages
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Messages View */}
          <div className="admin-chats-messages">
            {selectedEmail && getSelectedConversation() ? (
              <>
                <div className="admin-chat-header">
                  <div className="admin-chat-header-info">
                    <div className="admin-chat-header-avatar">
                      <span>
                        {getInitials(getSelectedConversation().email)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text_white font-4 mb_4">
                        {getSelectedConversation().email}
                      </h3>
                      <p className="text-caption-1 text_muted-color">
                        {getSelectedConversation().messages.length} messages •
                        Last active{" "}
                        {formatTime(getSelectedConversation().lastMessageTime)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="chat-messages-container">
                  {getSelectedConversation().messages.length === 0 ? (
                    <div className="chat-empty-state">
                      <div className="chat-empty-icon">
                        <i className="icon-PaperPlaneTilt"></i>
                      </div>
                      <p className="text_secondary-color font-3">
                        No messages in this conversation
                      </p>
                    </div>
                  ) : (
                    <div className="chat-messages">
                      {getSelectedConversation().messages.map(
                        (message, idx) => {
                          const isUser = message.sender === "user";

                          return (
                            <div
                              key={message.id || idx}
                              className={`chat-message ${
                                isUser
                                  ? "chat-message-user"
                                  : "chat-message-admin"
                              }`}
                            >
                              <div className="chat-message-bubble">
                                <p className="chat-message-text font-3">
                                  {message.text}
                                </p>
                                <span className="chat-message-time text_secondary-color font-3">
                                  {formatTime(message.timestamp)}
                                </span>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="admin-empty-state">
                <div className="admin-empty-state-icon">💬</div>
                <p>Select a conversation to view messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminDashbaodLayout>
  );
};

export default Chats;
