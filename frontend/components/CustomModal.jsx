"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function CustomModal({ isOpen, onClose, message, type = "success" }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "relative",
              width: "90%",
              maxWidth: 400,
              padding: "2rem",
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              color: "white",
              textAlign: "center"
            }}
          >
            <button
              onClick={onClose}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "var(--color-text-secondary)", cursor: "pointer" }}
            >
              <X size={20} />
            </button>
            
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              {type === "success" ? (
                <CheckCircle size={48} style={{ color: "#10b981" }} />
              ) : (
                <XCircle size={48} style={{ color: "#ef4444" }} />
              )}
            </div>

            <h3 style={{ fontSize: "1.2rem", marginBottom: 12, fontFamily: "var(--font-heading)" }}>
              {type === "success" ? "Success!" : "Action Required"}
            </h3>
            
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: 24 }}>
              {message}
            </p>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ width: "100%", padding: "0.8rem" }}
            >
              Okay
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
