import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, options = {}) => {
    const id = Date.now().toString();
    const toastOptions = {
      duration: options.duration || 5000,
      style: {
        background:
          options.type === "error"
            ? "#FEE2E2"
            : options.type === "success"
            ? "#ECFDF5"
            : options.type === "warning"
            ? "#FFFBEB"
            : "#EFF6FF",
        color:
          options.type === "error"
            ? "#B91C1C"
            : options.type === "success"
            ? "#065F46"
            : options.type === "warning"
            ? "#92400E"
            : "#1E40AF",
        padding: "16px",
        borderRadius: "8px",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        fontWeight: "500",
      },
      icon:
        options.type === "error"
          ? "❌"
          : options.type === "success"
          ? "✅"
          : options.type === "warning"
          ? "⚠️"
          : "ℹ️",
    };

    return toast(message, toastOptions);
  };

  const showSuccess = (message, options = {}) => {
    return addToast(message, { ...options, type: "success" });
  };

  const showError = (message, options = {}) => {
    return addToast(message, { ...options, type: "error" });
  };

  const showWarning = (message, options = {}) => {
    return addToast(message, { ...options, type: "warning" });
  };

  const showInfo = (message, options = {}) => {
    return addToast(message, { ...options, type: "info" });
  };

  const showLoading = (message, options = {}) => {
    return toast.loading(message, {
      style: {
        background: "#EFF6FF",
        color: "#1E40AF",
        padding: "16px",
        borderRadius: "8px",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        fontWeight: "500",
      },
      ...options,
    });
  };

  const dismissToast = (toastId) => {
    toast.dismiss(toastId);
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showLoading,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
