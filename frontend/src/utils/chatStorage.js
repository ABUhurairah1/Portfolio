// Utility functions for chat storage and browser ID management

/**
 * Message Structure:
 * {
 *   id: string (unique identifier),
 *   sender: 'user' | 'admin',
 *   text: string (message content),
 *   timestamp: string (ISO date string),
 *   userEmail: string | null (user's email),
 *   browserId: string (browser identifier),
 *   createdAt: string (ISO date string),
 *   adminId: string | null (admin identifier, only for admin messages),
 *   adminName: string | null (admin name, only for admin messages),
 *   userName: string | null (user name, only for user messages)
 * }
 */

/**
 * Generate or retrieve a unique browser ID
 * @returns {string} Unique browser identifier
 */
export const getBrowserId = () => {
  const STORAGE_KEY = "chat_browser_id";
  let browserId = localStorage.getItem(STORAGE_KEY);

  if (!browserId) {
    // Generate a unique ID based on browser fingerprint
    browserId = `browser_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    localStorage.setItem(STORAGE_KEY, browserId);
  }

  return browserId;
};

/**
 * Get or set user email for chat identification
 * @param {string|null} email - Email to set, or null to get current email
 * @returns {string|null} Current user email
 */
export const getUserEmail = (email = null) => {
  const STORAGE_KEY = "chat_user_email";
  if (email !== null) {
    localStorage.setItem(STORAGE_KEY, email);
    return email;
  }
  return localStorage.getItem(STORAGE_KEY);
};

/**
 * Get user identifier (prefers email, falls back to browser ID)
 * @returns {string} User identifier
 */
export const getUserIdentifier = () => {
  const email = getUserEmail();
  return email || getBrowserId();
};

/**
 * Save a chat message to history
 * @param {Object} message - Message object with sender, text, timestamp
 * @returns {Object} Saved message with complete structure
 */
export const saveChatMessage = (message) => {
  const identifier = getUserIdentifier();
  const STORAGE_KEY = `chat_history_${identifier}`;

  const history = getChatHistory();

  // Ensure proper message structure
  const newMessage = {
    id: message.id || Date.now() + Math.random(),
    sender: message.sender || "user", // 'user' or 'admin'
    text: message.text || "",
    timestamp: message.timestamp || new Date().toISOString(),
    // Additional metadata for future use
    userEmail: message.userEmail || getUserEmail() || null,
    browserId: identifier,
    createdAt: message.createdAt || new Date().toISOString(),
    // For admin messages
    adminId: message.adminId || null,
    adminName: message.adminName || null,
    // For user messages
    userName: message.userName || null,
  };

  const updatedHistory = [...history, newMessage];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

  return newMessage;
};

/**
 * Get chat history for current user
 * @returns {Array} Array of chat messages
 */
export const getChatHistory = () => {
  const identifier = getUserIdentifier();
  const STORAGE_KEY = `chat_history_${identifier}`;

  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error loading chat history:", error);
    return [];
  }
};

/**
 * Clear chat history for current user
 */
export const clearChatHistory = () => {
  const identifier = getUserIdentifier();
  const STORAGE_KEY = `chat_history_${identifier}`;
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Get messages filtered by sender type
 * @param {string} senderType - 'user' or 'admin'
 * @returns {Array} Filtered array of messages
 */
export const getMessagesBySender = (senderType) => {
  const history = getChatHistory();
  return history.filter((message) => message.sender === senderType);
};

/**
 * Get only user messages
 * @returns {Array} Array of user messages
 */
export const getUserMessages = () => {
  return getMessagesBySender("user");
};

/**
 * Get only admin messages
 * @returns {Array} Array of admin messages
 */
export const getAdminMessages = () => {
  return getMessagesBySender("admin");
};

/**
 * Validate message structure
 * @param {Object} message - Message to validate
 * @returns {boolean} True if message is valid
 */
export const isValidMessage = (message) => {
  return (
    message &&
    typeof message === "object" &&
    typeof message.text === "string" &&
    message.text.trim() !== "" &&
    (message.sender === "user" || message.sender === "admin") &&
    message.timestamp &&
    message.id
  );
};
