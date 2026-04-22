"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/userContext";
import Link from "next/link";
import { Activity, Clock, Server, LogOut, Sun, Moon, Edit2, Save, X } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, updateUser, logoutUser } = useUser();
  const [mounted, setMounted] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");
  const [isLightMode, setIsLightMode] = useState(false);

  // Edit Name State
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState("");

  const [settings, setSettings] = useState({ notifications: true, twoFactor: false, marketing: false });

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ishiva_user_profile");
    if (!saved) {
      router.push("/");
    }
    // Check initial theme
    if (document.body.classList.contains("light-theme")) {
       setIsLightMode(true);
    }
  }, [router]);

  if (!mounted || !userProfile) return null;

  const toggleTheme = () => {
    if (isLightMode) {
       document.body.classList.remove("light-theme");
       setIsLightMode(false);
    } else {
       document.body.classList.add("light-theme");
       setIsLightMode(true);
    }
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const saveName = () => {
    if (editNameValue.trim()) {
      updateUser({ name: editNameValue });
    }
    setIsEditingName(false);
  };

  const userEmail = userProfile?.email || "No Email Synced";
  const userName = userProfile?.name || "Client Access";
  const userPhone = userProfile?.phone ? `${userProfile.countryCode || ''} ${userProfile.phone}` : "No Secure Line Linked";

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingBottom: 80, paddingTop: 72 }}>
        <div style={{ textAlign: "center", padding: "40px 20px 20px" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: 8 }}>Account Synced</div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              marginBottom: 10,
              color: "var(--color-text-primary)"
            }}
          >
            Good to see you, <span className="text-gradient">{userName}</span>!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ color: "var(--color-text-secondary)" }}
          >
            Manage your digital assets, settings, and active blueprints.
          </motion.p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 40 }}>
          <button onClick={() => setActiveTab("overview")} className={activeTab === "overview" ? "btn-primary" : "btn-outline"} style={{ padding: "8px 24px" }}>History & Projects</button>
          <button onClick={() => setActiveTab("settings")} className={activeTab === "settings" ? "btn-primary" : "btn-outline"} style={{ padding: "8px 24px" }}>Profile Settings</button>
        </div>

        <section className="profile-grid" style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          
          {/* LEFT SIDEBAR: PROFILE INFO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass"
            style={{ padding: 30, borderRadius: 20, textAlign: "center" }}
          >
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-neon-blue), var(--color-neon-purple))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", color: "white", margin: "0 auto 20px", boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}>
              {userName[0]}
            </div>
            
            {/* Edit Name Block */}
            {isEditingName ? (
               <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 15 }}>
                 <input 
                   autoFocus
                   value={editNameValue} 
                   onChange={e => setEditNameValue(e.target.value)}
                   style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid var(--color-neon-cyan)", color: "var(--color-text-primary)", outline: "none", width: "120px" }}
                 />
                 <button onClick={saveName} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-neon-green)" }}><Save size={18} /></button>
                 <button onClick={() => setIsEditingName(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)" }}><X size={18} /></button>
               </div>
            ) : (
               <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 5 }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", color: "var(--color-text-primary)" }}>{userName}</h3>
                  <button onClick={() => { setIsEditingName(true); setEditNameValue(userName); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)" }}><Edit2 size={14} /></button>
               </div>
            )}

            <h4 title={userEmail} style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", marginBottom: 5 }}>
              {userEmail}
            </h4>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", marginBottom: 30 }}>
              {userPhone}
            </p>
            <Link href="/quotation">
              <button className="btn-primary" style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                Return to Quotation Blueprint
              </button>
            </Link>
          </motion.div>

          {/* RIGHT PANEL: TABS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass"
            style={{ padding: 40, borderRadius: 20 }}
          >
            {activeTab === "overview" && (
              <AnimatePresence mode="wait">
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-text-primary)", marginBottom: 25, borderBottom: "1px solid var(--color-border-glass)", paddingBottom: 15 }}>
                    Your Tracked History
                  </h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
                     <div className="glass-card" style={{ padding: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                          <Activity color="var(--color-neon-blue)" size={20} />
                          <h4 style={{ color: "var(--color-text-primary)", fontSize: "1.1rem", fontFamily: "var(--font-heading)" }}>Your Upcoming Projects</h4>
                        </div>
                        <div style={{ padding: "16px", borderRadius: 12, background: "rgba(0,0,0,0.1)", border: "1px solid var(--color-border-glass)" }}>
                           {userProfile.websiteType ? (
                             <>
                               <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: 4 }}>Architecture Pending</div>
                               <div style={{ color: "var(--color-neon-blue)", fontWeight: 600 }}>{userProfile.businessName} - {userProfile.websiteType} Platform</div>
                               <div style={{ marginTop: 12, fontSize: "0.75rem", color: "#f59e0b" }}>⚠️ Awaiting Final Quotation Validation</div>
                             </>
                           ) : (
                             <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>No active projects recorded natively.</div>
                           )}
                        </div>
                     </div>

                     <div className="glass-card" style={{ padding: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                          <Clock color="var(--color-neon-purple)" size={20} />
                          <h4 style={{ color: "var(--color-text-primary)", fontSize: "1.1rem", fontFamily: "var(--font-heading)" }}>Account History</h4>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 8, borderBottom: "1px solid var(--color-border-glass)" }}>
                             <span style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Account Registered</span>
                             <span style={{ color: "var(--color-text-primary)", fontSize: "0.85rem" }}>Today</span>
                           </div>
                           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 8, borderBottom: "1px solid var(--color-border-glass)" }}>
                             <span style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Security Clearance</span>
                             <span style={{ color: "var(--color-neon-green)", fontSize: "0.85rem" }}>Verified</span>
                           </div>
                           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                             <span style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Network Node</span>
                             <span style={{ color: "var(--color-neon-purple)", fontSize: "0.85rem", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: 120 }}>{userProfile.email}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {activeTab === "settings" && (
              <AnimatePresence mode="wait">
                <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-text-primary)", marginBottom: 25, borderBottom: "1px solid var(--color-border-glass)", paddingBottom: 15 }}>
                    System Settings
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  
                    {/* Visual Theme Toggle */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--color-border-glass)" }}>
                      <div>
                        <h4 style={{ color: "var(--color-text-primary)", fontSize: "1rem", marginBottom: 4 }}>Interface Theme</h4>
                        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Switch between light and dark modes.</p>
                      </div>
                      <button 
                        onClick={toggleTheme}
                        className="btn-outline"
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", color: isLightMode ? "#f59e0b" : "var(--color-neon-purple)", borderColor: isLightMode ? "#f59e0b" : "var(--color-neon-purple)" }}
                      >
                        {isLightMode ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
                      </button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h4 style={{ color: "var(--color-text-primary)", fontSize: "1rem", marginBottom: 4 }}>Email Notifications</h4>
                        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Receive project updates via email.</p>
                      </div>
                      <button onClick={() => setSettings(s => ({...s, notifications: !s.notifications}))} style={{ width: 48, height: 24, borderRadius: 12, background: settings.notifications ? "var(--color-neon-cyan)" : "transparent", border: "1px solid var(--color-border-glass)", position: "relative", cursor: "pointer", transition: "0.3s" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: settings.notifications ? "white" : "var(--color-text-secondary)", position: "absolute", top: 1, left: settings.notifications ? 26 : 2, transition: "0.3s" }} />
                      </button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h4 style={{ color: "var(--color-text-primary)", fontSize: "1rem", marginBottom: 4 }}>Two-Factor Authentication</h4>
                        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Require an extra security step on login.</p>
                      </div>
                      <button onClick={() => setSettings(s => ({...s, twoFactor: !s.twoFactor}))} style={{ width: 48, height: 24, borderRadius: 12, background: settings.twoFactor ? "var(--color-neon-cyan)" : "transparent", border: "1px solid var(--color-border-glass)", position: "relative", cursor: "pointer", transition: "0.3s" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: settings.twoFactor ? "white" : "var(--color-text-secondary)", position: "absolute", top: 1, left: settings.twoFactor ? 26 : 2, transition: "0.3s" }} />
                      </button>
                    </div>

                    {/* Authentication Options (Log Out / Delete) */}
                    <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--color-border-glass)" }}>
                      <h4 style={{ color: "#ef4444", fontSize: "1rem", marginBottom: 12 }}>Account Management</h4>
                      <div style={{ display: "flex", gap: 12 }}>
                        <button onClick={handleLogout} className="btn-outline" style={{ display: "flex", alignItems: "center", gap: 8, borderColor: "var(--color-border-glass)", color: "var(--color-text-primary)" }}>
                          <LogOut size={16}/> Log Out Safely
                        </button>
                        <button className="btn-outline" style={{ borderColor: "rgba(239, 68, 68, 0.3)", color: "#ef4444" }}>
                          Delete Account
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
