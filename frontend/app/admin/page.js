"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin User");
  const [adminIcon, setAdminIcon] = useState("👑");

  useEffect(() => {
    const user = localStorage.getItem("ishva_user");
    if (!user) {
      router.push("/");
    } else {
      setCurrentUser(user);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ishva_user");
    localStorage.removeItem("ishva_phone");
    router.push("/");
  };

  return (
    <>
      <nav className="navbar glass logged-in" style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <div className="logo">
          <span className="logo-text">Ishva Admin</span>
        </div>
        
        <button
          onClick={() => setSettingsOpen(true)}
          style={{
            position: "absolute",
            right: 20,
            cursor: "pointer",
            background: "transparent",
            border: "none",
            zIndex: 105,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
              fontFamily: "var(--font-heading)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          >
            {adminIcon}
          </div>
        </button>

        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <button onClick={handleLogout} className="btn-secondary" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
            Log Out
          </button>
        </div>
      </nav>

      <main style={{ minHeight: "100vh", padding: "100px 20px" }}>
        <section style={{ maxWidth: 800, margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Leads & Active Quotes
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass"
            style={{ padding: 40, borderRadius: 20, overflowX: "auto" }}
          >
            <table style={{ width: "100%", color: "var(--color-text-secondary)", textAlign: "left", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "white", borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: 12 }}>Contact Num.</th>
                  <th style={{ padding: 12 }}>Package & Addons</th>
                  <th style={{ padding: 12 }}>Total Value</th>
                  <th style={{ padding: 12 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} style={{ padding: 20, textAlign: "center" }}>No active leads currently in system.</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {settingsOpen && (
          <div className="modal-overlay" style={{ zIndex: 1000, display: "flex" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass"
              style={{ padding: 40, borderRadius: 20, maxWidth: 400, width: "100%", position: "relative" }}
            >
              <button
                onClick={() => setSettingsOpen(false)}
                style={{ position: "absolute", top: 20, right: 20, background: "transparent", border: "none", color: "white", cursor: "pointer" }}
              >
                <X />
              </button>
              <h2 style={{ fontFamily: "var(--font-heading)", marginBottom: 8, color: "white" }}>Profile Settings</h2>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: 24 }}>
                Update your admin display properties.
              </p>
              <form>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", marginBottom: 8, color: "var(--color-text-secondary)" }}>Profile Name</label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    style={{
                      width: "100%", padding: 12, borderRadius: 8,
                      border: "1px solid var(--border-glass)", background: "rgba(255,255,255,0.02)",
                      color: "white", outline: "none",
                    }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", marginBottom: 8, color: "var(--color-text-secondary)" }}>Profile Icon (Emoji)</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={adminIcon}
                    onChange={(e) => setAdminIcon(e.target.value)}
                    style={{
                      width: "100%", padding: 12, borderRadius: 8,
                      border: "1px solid var(--border-glass)", background: "rgba(255,255,255,0.02)",
                      color: "white", outline: "none",
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="btn-primary w-100"
                  style={{ padding: 16 }}
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
