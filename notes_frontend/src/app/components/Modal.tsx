import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

/**
 * PUBLIC_INTERFACE
 * Simple Modal component.
 */
export default function Modal({ open, onClose, children, title }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      aria-modal
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-lg shadow-lg min-w-[320px] max-w-lg w-full border border-[var(--color-border)]"
        style={{ animation: "appear 0.12s linear" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-5 pt-4 pb-0">
          <h2 className="text-lg font-semibold" style={{ color: "var(--color-primary)" }}>
            {title}
          </h2>
          <button className="text-xl text-gray-400 hover:text-gray-600 rounded"
            aria-label="Close"
            onClick={onClose}
          >&times;</button>
        </div>
        <div className="px-5 pb-5 pt-3">{children}</div>
      </div>
      <style>
        {`
        @keyframes appear {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        `}
      </style>
    </div>
  );
}
