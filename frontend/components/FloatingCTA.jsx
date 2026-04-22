"use client";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 80,
      }}
    >
      <Link href="/quotation">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 22px",
            borderRadius: 14,
            background: "linear-gradient(135deg, #a855f7, #3b82f6)",
            border: "none",
            color: "white",
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            boxShadow:
              "0 8px 30px rgba(168,85,247,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Pulse ring */}
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: 18,
              border: "2px solid rgba(168,85,247,0.4)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          <Rocket size={16} />
          <span>Start Your Project</span>
        </motion.button>
      </Link>
    </motion.div>
  );
}
