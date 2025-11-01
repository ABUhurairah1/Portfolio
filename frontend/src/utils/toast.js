// Toast utility functions - separated for Fast Refresh compatibility
let toastListeners = [];
let toastState = [];

const notifyListeners = () => {
  toastListeners.forEach((listener) => listener([...toastState]));
};

const addToast = (type, message, duration = 5000) => {
  const id = Date.now() + Math.random();
  const toast = { id, type, message, duration };
  toastState.push(toast);
  notifyListeners();

  return id;
};

export const removeToast = (id) => {
  toastState = toastState.filter((toast) => toast.id !== id);
  notifyListeners();
};

const clearAll = () => {
  toastState = [];
  notifyListeners();
};

// Export toast functions
export const toast = {
  success: (message, duration) => addToast("success", message, duration),
  error: (message, duration) => addToast("error", message, duration),
  warning: (message, duration) => addToast("warning", message, duration),
  info: (message, duration) => addToast("info", message, duration),
  clear: clearAll,
};

// Export functions for ToastContainer
export const subscribe = (listener) => {
  toastListeners.push(listener);
  return () => {
    toastListeners = toastListeners.filter((l) => l !== listener);
  };
};

export const getToasts = () => [...toastState];
