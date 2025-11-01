import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import { subscribe, getToasts, removeToast } from "../../utils/toast";
import "./Toast.css";

// Toast Container Component
const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const unsubscribe = subscribe((newToasts) => {
      setToasts(newToasts);
    });

    setToasts(getToasts());

    return unsubscribe;
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="toast-container">
      {toasts.map((toastItem) => (
        <ToastItem
          key={toastItem.id}
          toast={toastItem}
          onClose={() => removeToast(toastItem.id)}
        />
      ))}
    </div>,
    document.body
  );
};

const ToastItem = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setIsVisible(false);
    // Wait for animation to complete before removing
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  // Auto-dismiss after duration
  useEffect(() => {
    if (toast.duration > 0 && !isExiting) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, isExiting, handleClose]);

  const icons = {
    success: FaCheckCircle,
    error: FaExclamationCircle,
    warning: FaExclamationTriangle,
    info: FaInfoCircle,
  };

  const Icon = icons[toast.type] || FaInfoCircle;

  return (
    <div
      className={`toast toast-${toast.type} ${
        isVisible ? "toast-visible" : ""
      } ${isExiting ? "toast-exiting" : ""}`}
    >
      <div className="toast-icon-wrapper">
        <Icon className="toast-icon" />
      </div>
      <div className="toast-content">
        <p className="toast-message">{toast.message}</p>
      </div>
      <button
        className="toast-close"
        onClick={handleClose}
        aria-label="Close"
        type="button"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default ToastContainer;
export { ToastContainer };
