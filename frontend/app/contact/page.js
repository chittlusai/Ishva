"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const contactInfo = [
  { icon: Mail, label: "Email", value: "Support@ishivadigitaltechnology.in", color: "#a855f7" },
  { icon: Phone, label: "Phone", value: "+91 8309939554", color: "#3b82f6" },
  { icon: MapPin, label: "Office", value: "Hyderabad, India", color: "#06b6d4" },
  { icon: Clock, label: "Hours", value: "Mon-Sat, 9AM–7PM IST", color: "#10b981" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid var(--color-border-glass)",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    fontSize: "0.9rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        <div className="section-container" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <div className="section-label" style={{ justifyContent: "center" }}>
              Get in Touch
            </div>
            <h1 className="section-title">
              Let's Start <span className="text-gradient">Building</span>
            </h1>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Have a project in mind? We'd love to hear about it. Reach out and
              let's create something amazing together.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "2rem",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Info Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {contactInfo.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card"
                  style={{
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${c.color}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <c.icon size={20} style={{ color: c.color }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 4,
                      }}
                    >
                      {c.label}
                    </p>
                    <p style={{ color: "white", fontSize: "0.9rem", fontWeight: 500 }}>
                      {c.value}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-card"
                style={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, rgba(168,85,247,0.05), rgba(6,182,212,0.03))",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <MapPin size={32} style={{ color: "var(--color-neon-purple)", marginBottom: 8, opacity: 0.5 }} />
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card"
              style={{ padding: "2rem" }}
            >
              {sent ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    textAlign: "center",
                    padding: "3rem 1rem",
                  }}
                >
                  <CheckCircle
                    size={56}
                    style={{
                      color: "var(--color-neon-green)",
                      marginBottom: 16,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.3rem",
                      color: "white",
                      marginBottom: 8,
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--color-text-secondary)" }}>
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.1rem",
                      color: "white",
                      marginBottom: 24,
                    }}
                  >
                    Send us a message
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6, fontWeight: 500 }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(168,85,247,0.5)";
                          e.target.style.boxShadow = "0 0 20px rgba(168,85,247,0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--color-border-glass)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6, fontWeight: 500 }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(168,85,247,0.5)";
                          e.target.style.boxShadow = "0 0 20px rgba(168,85,247,0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--color-border-glass)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6, fontWeight: 500 }}>
                      Service Interested In
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "none",
                      }}
                    >
                      <option value="" style={{ background: "#111" }}>Select a service</option>
                      <option value="website" style={{ background: "#111" }}>Website Development</option>
                      <option value="seo" style={{ background: "#111" }}>SEO Optimization</option>
                      <option value="marketing" style={{ background: "#111" }}>Performance Marketing</option>
                      <option value="ai" style={{ background: "#111" }}>AI Automation</option>
                      <option value="branding" style={{ background: "#111" }}>Branding & Design</option>
                      <option value="other" style={{ background: "#111" }}>Other</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6, fontWeight: 500 }}>
                      Project Details
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(168,85,247,0.5)";
                        e.target.style.boxShadow = "0 0 20px rgba(168,85,247,0.08)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--color-border-glass)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <Send size={18} /> Send Message
                    </span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatBot />

      <style jsx global>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
