import React, { useState, useEffect, useRef } from "react";
import { FaXmark, FaPaperPlane } from "react-icons/fa6";
import {
  getChatHistory,
  saveChatMessage,
  getUserEmail,
} from "../../utils/chatStorage";

const ChatPopup = ({
  isOpen,
  onClose,
  initialMessage = null,
  userEmail = null,
}) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Set user email if provided
  useEffect(() => {
    if (userEmail) {
      getUserEmail(userEmail); // This will set the email in storage
      setShowEmailPrompt(false);
    } else {
      // Check if email exists in storage
      const storedEmail = getUserEmail();
      if (!storedEmail) {
        setShowEmailPrompt(true);
      }
    }
  }, [userEmail]);

  // Load chat history on mount and when popup opens
  useEffect(() => {
    if (isOpen) {
      const history = getChatHistory();
      // Ensure all messages have proper structure
      const validHistory = history.filter(
        (msg) =>
          msg && msg.text && (msg.sender === "user" || msg.sender === "admin")
      );
      setMessages(validHistory);

      // If initial message provided and not already in history, add it
      if (
        initialMessage &&
        !validHistory.find((m) => m.text === initialMessage)
      ) {
        const userMsg = {
          sender: "user",
          text: initialMessage,
          timestamp: new Date().toISOString(),
          userEmail: userEmail || getUserEmail() || null,
        };
        const saved = saveChatMessage(userMsg);
        setMessages([saved]);
      }

      // Auto-scroll to bottom
      scrollToBottom();
    }
  }, [isOpen, initialMessage, userEmail]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    const email = emailInput.trim();
    if (email && email.includes("@")) {
      getUserEmail(email);
      setShowEmailPrompt(false);
      setEmailInput("");

      // Reload chat history with the new email identifier
      const history = getChatHistory();
      if (history.length > 0) {
        setMessages(history);
        scrollToBottom();
      }
    }
  };

  const handleSkipEmail = () => {
    setShowEmailPrompt(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userEmailStored = getUserEmail();

    // Create user message with proper structure
    const userMessage = {
      sender: "user",
      text: inputMessage.trim(),
      timestamp: new Date().toISOString(),
      userEmail: userEmailStored || userEmail || null,
      userName: null, // Can be added later if needed
    };

    // Save and add user message
    const savedUserMsg = saveChatMessage(userMessage);
    setMessages((prev) => [...prev, savedUserMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate admin response (in production, this would be a real API call)
    setTimeout(() => {
      const adminMessage = {
        sender: "admin",
        text: generateAutoResponse(inputMessage.trim()),
        timestamp: new Date().toISOString(),
        adminId: "admin-1", // Can be replaced with actual admin ID
        adminName: "Portfolio Owner", // Can be replaced with actual admin name
      };
      const savedAdminMsg = saveChatMessage(adminMessage);
      setMessages((prev) => [...prev, savedAdminMsg]);
      setIsTyping(false);
    }, 1500);
  };

  // Simple auto-response generator (replace with real API in production)
  const generateAutoResponse = (userText) => {
    const lowerText = userText.toLowerCase();

    if (
      lowerText.includes("hello") ||
      lowerText.includes("hi") ||
      lowerText.includes("hey")
    ) {
      return "Hello! Thanks for reaching out. How can I help you with your project today?";
    }
    if (
      lowerText.includes("portfolio") ||
      lowerText.includes("work") ||
      lowerText.includes("project")
    ) {
      return "I'd be happy to discuss your project! Could you tell me more about what you're looking to build?";
    }
    if (
      lowerText.includes("price") ||
      lowerText.includes("cost") ||
      lowerText.includes("budget")
    ) {
      return "Pricing depends on your project scope. Based on your contact form, I can provide a detailed quote. Would you like to schedule a call to discuss?";
    }
    if (
      lowerText.includes("time") ||
      lowerText.includes("duration") ||
      lowerText.includes("when")
    ) {
      return "Timeline varies by project complexity. For most projects, I aim for 2-4 weeks, but we can discuss specifics based on your requirements.";
    }

    return "Thank you for your message! I'll review your contact form and get back to you soon. Is there anything specific you'd like to discuss about your project?";
  };

  const formatTime = (timestamp) => {
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

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (!isOpen) return null;

  return (
    <div className="chat-popup-overlay" onClick={onClose}>
      <div
        className="chat-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="chat-popup-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <i className="icon-PaperPlaneTilt"></i>
            </div>
            <div>
              <h4 className="chat-header-name text_white font-4">
                Let's Chat!
              </h4>
              <p className="chat-header-status text_secondary-color font-3">
                Typically replies within a few hours
              </p>
            </div>
          </div>
          <button
            className="chat-close-btn"
            onClick={onClose}
            aria-label="Close chat"
          >
            <FaXmark />
          </button>
        </div>

        {/* Email Prompt Banner */}
        {showEmailPrompt && (
          <div className="chat-email-prompt">
            <div className="chat-email-prompt-content">
              <p className="chat-email-prompt-text text_white font-3">
                <i className="icon-EnvelopeSimple"></i>
                Enter your email to retrieve your chat history
              </p>
              <form
                onSubmit={handleSaveEmail}
                className="chat-email-prompt-form"
              >
                <fieldset className="chat-email-fieldset">
                  <input
                    type="email"
                    className="chat-email-input"
                    placeholder="your.email@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    autoFocus
                  />
                </fieldset>
                <div className="chat-email-actions">
                  <button
                    type="button"
                    onClick={handleSkipEmail}
                    className="chat-email-skip-btn text_secondary-color font-3"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    className="chat-email-save-btn text_white font-3"
                    disabled={!emailInput.trim() || !emailInput.includes("@")}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="chat-messages-container" ref={chatContainerRef}>
          {messages.length === 0 ? (
            <div className="chat-empty-state">
              <div className="chat-empty-icon">
                <i className="icon-PaperPlaneTilt"></i>
              </div>
              <p className="text_secondary-color font-3">
                Start a conversation! I'm here to help with your project.
              </p>
            </div>
          ) : (
            <div className="chat-messages">
              {messages.map((message) => {
                // Ensure message has proper structure
                if (
                  !message ||
                  !message.text ||
                  (message.sender !== "user" && message.sender !== "admin")
                ) {
                  return null;
                }

                const isUser = message.sender === "user";

                return (
                  <div
                    key={message.id || message.timestamp}
                    className={`chat-message ${
                      isUser ? "chat-message-user" : "chat-message-admin"
                    }`}
                  >
                    <div className="chat-message-bubble">
                      <p className="chat-message-text font-3">{message.text}</p>
                      <span className="chat-message-time text_secondary-color font-3">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="chat-message chat-message-admin">
                  <div className="chat-message-bubble chat-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form className="chat-input-container" onSubmit={handleSendMessage}>
          <fieldset className="chat-input-fieldset">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              autoFocus
            />
          </fieldset>
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!inputMessage.trim() || isTyping}
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPopup;
