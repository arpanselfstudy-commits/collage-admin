import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  icon?: ReactNode;
  variant?: "danger" | "warning" | "info";
}

const variantStyles = {
  danger: {
    iconBg: "#fff1f1",
    iconColor: "#e53e3e",
    confirmBg: "#e53e3e",
    confirmHover: "#c53030",
  },
  warning: {
    iconBg: "#fffbeb",
    iconColor: "#d97706",
    confirmBg: "#d97706",
    confirmHover: "#b45309",
  },
  info: {
    iconBg: "#eff8ff",
    iconColor: "#0567a6",
    confirmBg: "#0567a6",
    confirmHover: "#074167",
  },
};

const ConfirmModal = ({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  icon,
  variant = "danger",
}: ConfirmModalProps) => {
  if (!open) return null;

  const styles = variantStyles[variant];

  const modal = (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)", zIndex: 9999 }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl w-full mx-4 overflow-hidden"
        style={{ maxWidth: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div style={{ height: "4px", background: styles.confirmBg }} />

        <div className="p-8">
          {/* Icon */}
          {icon && (
            <div
              className="flex items-center justify-center mx-auto mb-5"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: styles.iconBg,
                color: styles.iconColor,
                fontSize: "32px",
              }}
            >
              {icon}
            </div>
          )}

          {/* Title */}
          <h2
            className="text-center mb-2"
            style={{ fontSize: "20px", fontWeight: 700, color: "#074167", margin: "0 0 8px" }}
          >
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p
              className="text-center"
              style={{ fontSize: "14px", color: "#7a7a7a", margin: "0 0 28px", lineHeight: "1.6" }}
            >
              {description}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "1.5px solid #dce1e9",
                background: "#fff",
                color: "#5a5a5a",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#f6f0f0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              }}
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: styles.confirmBg,
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = styles.confirmHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = styles.confirmBg;
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default ConfirmModal;
