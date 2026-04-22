"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ExternalLink } from "lucide-react";

const templates = [
  { name: "Luxe E-commerce", category: "Ecommerce", style: "Luxury", color: "#a855f7" },
  { name: "SaaS Dashboard", category: "Business", style: "Modern", color: "#3b82f6" },
  { name: "Creative Portfolio", category: "Portfolio", style: "Minimal", color: "#06b6d4" },
  { name: "Blog Magazine", category: "Blog", style: "Modern", color: "#10b981" },
  { name: "Startup Landing", category: "Landing Pages", style: "Modern", color: "#ec4899" },
  { name: "Restaurant App", category: "Business", style: "Luxury", color: "#f59e0b" },
  { name: "Job Finder Portfolio", category: "Portfolio", style: "Minimal", color: "#8b5cf6" },
  { name: "Fashion Store", category: "Ecommerce", style: "Luxury", color: "#ef4444" },
  { name: "Tech Blog", category: "Blog", style: "Modern", color: "#14b8a6" },
  { name: "Agency Multi-Page", category: "Business", style: "Modern", color: "#6366f1" },
];

const suggestions = [
  "Ecommerce website for fashion brand",
  "Portfolio for freelance designer",
  "Business landing page with CTA",
  "Blog with newsletter integration",
  "SaaS product showcase",
  "Restaurant booking website",
];

export default function AISearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [activeSuggestions, setActiveSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length > 0) {
      const lower = query.toLowerCase();
      const filtered = templates.filter(
        (t) =>
          t.name.toLowerCase().includes(lower) ||
          t.category.toLowerCase().includes(lower) ||
          t.style.toLowerCase().includes(lower)
      );
      setFilteredTemplates(filtered);
      setActiveSuggestions(
        suggestions.filter((s) => s.toLowerCase().includes(lower)).slice(0, 3)
      );
    } else {
      setFilteredTemplates([]);
      setActiveSuggestions(suggestions.slice(0, 4));
    }
  }, [query]);

  return (
    <section style={{ position: "relative" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            <Sparkles size={14} /> AI-Powered Search
          </div>
          <h2 className="section-title">
            Find Your Perfect <span className="text-gradient">Website</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Describe what you need and our AI engine finds the best match instantly.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            maxWidth: 720,
            margin: "0 auto 3rem",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              border: focused
                ? "1px solid rgba(168,85,247,0.5)"
                : "1px solid var(--color-border-glass)",
              background: "rgba(12,12,20,0.8)",
              backdropFilter: "blur(20px)",
              transition: "all 0.3s",
              boxShadow: focused
                ? "0 0 40px rgba(168,85,247,0.12), 0 0 80px rgba(168,85,247,0.05)"
                : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "1rem 1.5rem",
              }}
            >
              <Search size={20} style={{ color: "var(--color-neon-purple)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for your website (e.g., Ecommerce, Portfolio, Business...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-body)",
                }}
              />
              {query && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setQuery("")}
                  style={{
                    background: "rgba(168,85,247,0.15)",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    color: "var(--color-neon-purple)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Clear
                </motion.button>
              )}
            </div>
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {focused && activeSuggestions.length > 0 && !query && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  background: "rgba(12,12,20,0.95)",
                  border: "1px solid var(--color-border-glass)",
                  borderRadius: 14,
                  padding: 12,
                  backdropFilter: "blur(20px)",
                  zIndex: 10,
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    marginBottom: 8,
                    padding: "0 8px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Try searching for
                </p>
                {activeSuggestions.map((s) => (
                  <div
                    key={s}
                    onClick={() => {
                      setQuery(s);
                      inputRef.current?.focus();
                    }}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color: "var(--color-text-secondary)",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(168,85,247,0.08)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                    }}
                  >
                    <Sparkles size={14} style={{ color: "var(--color-neon-purple)" }} />
                    {s}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Grid */}
        <AnimatePresence>
          {filteredTemplates.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.25rem",
                maxWidth: 960,
                margin: "0 auto",
              }}
            >
              {filteredTemplates.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* Preview */}
                  <div
                    style={{
                      height: 160,
                      background: `linear-gradient(135deg, ${t.color}22, ${t.color}08)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        height: "80%",
                        borderRadius: 10,
                        background: "rgba(0,0,0,0.3)",
                        border: `1px solid ${t.color}30`,
                        display: "flex",
                        flexDirection: "column",
                        padding: 12,
                        gap: 6,
                      }}
                    >
                      <div style={{ width: "60%", height: 6, borderRadius: 3, background: `${t.color}40` }} />
                      <div style={{ width: "40%", height: 4, borderRadius: 2, background: `${t.color}25` }} />
                      <div style={{ flex: 1, borderRadius: 6, background: `${t.color}12`, marginTop: 6 }} />
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{ padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h4
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "white",
                            marginBottom: 4,
                          }}
                        >
                          {t.name}
                        </h4>
                        <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                          {t.category} · {t.style}
                        </p>
                      </div>
                      <ExternalLink size={16} style={{ color: "var(--color-text-muted)" }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
