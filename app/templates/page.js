"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ShoppingCart, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/lib/userContext";

// --- Data ---
const TEMPLATES = [
  { id: 1, name: "Luxe Boutique", category: "Ecommerce", style: "Luxury", price: "Premium", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", features: ["3D Product Views", "Stripe Integration", "Cart Animation"], desc: "High-end fashion e-commerce with 3D product views" },
  { id: 2, name: "TechVault", category: "SaaS", style: "Modern", price: "Premium", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", features: ["Dashboard", "Analytics", "Dark Mode"], desc: "SaaS dashboard template with advanced data visualization" },
  { id: 3, name: "Minimalist Maker", category: "Portfolio", style: "Minimal", price: "Free", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", features: ["Gallery", "Contact Form", "SEO Ready"], desc: "Clean, distraction-free portfolio for creatives" },
  { id: 4, name: "Consultify", category: "Business", style: "Luxury", price: "Premium", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", features: ["Booking System", "Live Chat", "Testimonials"], desc: "Consulting firm website with booking system" },
  { id: 5, name: "LaunchPad", category: "Single Page", style: "Modern", price: "Premium", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", features: ["Countdown", "Email Capture", "3D Hero"], desc: "Product launch page with countdown and 3D hero" },
  { id: 6, name: "Artisan Co.", category: "Ecommerce", style: "Minimal", price: "Premium", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80", features: ["Inventory Sync", "Reviews", "Blog"], desc: "Handcrafted goods store with subtle animations" },
  { id: 7, name: "Neon Studio", category: "Portfolio", style: "Modern", price: "Free", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", features: ["Video Background", "Custom Cursor", "WebGL"], desc: "High-energy portfolio for studios and agencies" },
  { id: 8, name: "NextGen AI", category: "Business", style: "Modern", price: "Premium", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", features: ["AI Chatbot", "Dynamic Pricing", "Multi-language"], desc: "AI startup landing page with futuristic UI" },
];

const CATEGORIES = ["All", "Ecommerce", "Business", "Portfolio", "SaaS", "Single Page", "Blogs"];
const STYLES = ["All", "Minimal", "Luxury", "Modern"];
const PRICES = ["All", "Free", "Premium"];

export default function TemplatesPage() {
  const { userProfile } = useUser();
  const defaultBusiness = userProfile?.businessName || "";
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStyle, setActiveStyle] = useState("All");
  const [activePrice, setActivePrice] = useState("All");
  const [search, setSearch] = useState("");
  const [describeBusiness, setDescribeBusiness] = useState("");

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(t => {
      const matchCat = activeCategory === "All" || t.category === activeCategory;
      const matchStyle = activeStyle === "All" || t.style === activeStyle;
      const matchPrice = activePrice === "All" || t.price === activePrice;
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.desc.toLowerCase().includes(search.toLowerCase());
      
      const matchDesc = describeBusiness === "" || 
                        t.desc.toLowerCase().includes(describeBusiness.toLowerCase()) ||
                        t.category.toLowerCase().includes(describeBusiness.toLowerCase());

      return matchCat && matchStyle && matchPrice && matchSearch && matchDesc;
    });
  }, [activeCategory, activeStyle, activePrice, search, describeBusiness]);

  const getTemplateName = (originalName) => {
    if (!describeBusiness && !defaultBusiness) return originalName;
    const bizName = defaultBusiness || describeBusiness.split(" ")[0]; // basic heuristic
    return bizName ? `${bizName} ${originalName.split(" ").slice(1).join(" ") || "Theme"}` : originalName;
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72, minHeight: "100vh" }}>
        
        {/* Header */}
        <section style={{ padding: "4rem 0", textAlign: "center", borderBottom: "1px solid var(--color-border-glass)" }}>
          <div className="section-container">
            <h1 className="section-title">Website <span className="text-gradient">Templates</span></h1>
            <p className="section-subtitle" style={{ margin: "0 auto 2rem", maxWidth: 640 }}>
              Start with a premium codebase. All templates are built on Next.js 15, optimized for performance, and fully customizable.
            </p>

            {/* Smart Business Description (Magic Input) */}
            <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
              <div style={{ position: "absolute", top: -12, left: 24, background: "var(--color-bg)", padding: "0 8px", fontSize: "0.75rem", color: "var(--color-neon-cyan)", display: "flex", alignItems: "center", gap: 4 }}>
                <Sparkles size={12} /> Describing Business
              </div>
              <input
                type="text"
                placeholder={defaultBusiness ? `Filtering for ${defaultBusiness}...` : "e.g. 'A luxury clothing store'"}
                value={describeBusiness}
                onChange={e => setDescribeBusiness(e.target.value)}
                style={{
                  width: "100%", padding: "16px 24px", borderRadius: 30,
                  background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-neon-cyan)",
                  color: "white", outline: "none", fontSize: "1rem"
                }}
              />
            </div>
          </div>
        </section>

        {/* Filters & Grid */}
        <section style={{ padding: "3rem 0" }}>
          <div className="section-container">
            <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "3rem" }} className="templates-layout">
              
              {/* Sidebar Filters */}
              <div className="filters-sidebar" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div>
                  <h3 style={{ color: "white", fontSize: "1rem", marginBottom: 12, fontFamily: "var(--font-heading)" }}>Category</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {CATEGORIES.map(c => (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        style={{ textAlign: "left", background: "none", border: "none", color: activeCategory === c ? "var(--color-neon-purple)" : "var(--color-text-secondary)", cursor: "pointer", fontSize: "0.9rem" }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ color: "white", fontSize: "1rem", marginBottom: 12, fontFamily: "var(--font-heading)" }}>Style</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {STYLES.map(s => (
                      <button
                        key={s}
                        onClick={() => setActiveStyle(s)}
                        style={{ padding: "6px 12px", borderRadius: 20, fontSize: "0.8rem", border: `1px solid ${activeStyle === s ? "var(--color-neon-cyan)" : "var(--color-border-glass)"}`, background: activeStyle === s ? "rgba(6,182,212,0.1)" : "transparent", color: activeStyle === s ? "white" : "var(--color-text-secondary)", cursor: "pointer" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
                  <AnimatePresence>
                    {filteredTemplates.map((t, i) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={t.id}
                        className="glass-card"
                        style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
                      >
                        <div style={{ height: 180, background: "#111", position: "relative", borderBottom: "1px solid var(--color-border-glass)" }}>
                          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 4 }}>
                            <div style={{width:8, height:8, borderRadius:"50%", background:"#ef4444"}}></div>
                            <div style={{width:8, height:8, borderRadius:"50%", background:"#f59e0b"}}></div>
                            <div style={{width:8, height:8, borderRadius:"50%", background:"#10b981"}}></div>
                          </div>
                          {/* Fake screenshot skeleton */}
                          <div style={{ position: "absolute", top: 40, left: 20, right: 20, bottom: 0, background: "rgba(255,255,255,0.02)", borderRadius: "8px 8px 0 0", border: "1px solid var(--color-border-glass)", borderBottom: "none", padding: 12 }}>
                             <div style={{ width: "40%", height: 12, background: "var(--color-border-glass)", borderRadius: 4, marginBottom: 12 }}></div>
                             <div style={{ display: "flex", gap: 8 }}>
                               <div style={{ flex: 1, height: 60, background: "rgba(168,85,247,0.05)", borderRadius: 4 }}></div>
                               <div style={{ flex: 1, height: 60, background: "rgba(6,182,212,0.05)", borderRadius: 4 }}></div>
                             </div>
                          </div>
                        </div>

                        <div style={{ padding: "1.5rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                            <h3 style={{ color: "white", fontFamily: "var(--font-heading)", fontSize: "1.1rem" }}>{getTemplateName(t.name)}</h3>
                            <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 10, background: t.price === "Premium" ? "rgba(168,85,247,0.15)" : "rgba(16,185,129,0.15)", color: t.price === "Premium" ? "var(--color-neon-purple)" : "var(--color-neon-green)" }}>
                              {t.price}
                            </span>
                          </div>
                          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", marginBottom: 16, lineHeight: 1.5, flexGrow: 1 }}>
                            {t.desc}
                          </p>
                          <button className="btn-outline" style={{ width: "100%", padding: "0.6rem" }}>
                            Preview Template
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx global>{`
        @media (max-width: 768px) {
          .templates-layout { grid-template-columns: 1fr !important; }
          .filters-sidebar { flex-direction: row !important; overflow-x: auto; padding-bottom: 1rem; }
        }
      `}</style>
    </>
  );
}
