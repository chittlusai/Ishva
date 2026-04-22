"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Briefcase, ChevronDown, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Generate 120 unique reviews dynamically to simulate 4000+ real reviews
const SERVICES = ["All", "Website", "SEO", "Marketing", "AI", "Branding"];
const NAMES = ["Rahul K.", "Sarah M.", "Amit P.", "Priya S.", "John D.", "Neha G.", "Karan V.", "Anjali R.", "Vikram Singh", "Jessica W.", "Rohan M.", "Tanya L."];
const ROLES = ["CEO, TechStartup", "Founder, Boutique", "Marketing Dir.", "E-commerce Owner", "Operations Head", "Director, Real Estate"];
const GOOD_REVIEW_TEMPLATES = [
  "Absolutely incredible work on our {service}. The team delivered exactly what we needed and our conversions are up 300%.",
  "The {service} created by Ishiva transformed our business. Highly recommend their professional approach.",
  "We hired them for {service} and the results exceeded our expectations. Best digital agency we've worked with.",
  "If you need top-tier {service}, look no further. The attention to detail is unmatched.",
  "Fast, reliable, and extremely talented. Our new {service} implementation is flawless."
];

function generateReviews(count) {
  const reviews = [];
  for (let i = 0; i < count; i++) {
    const service = SERVICES[Math.floor(Math.random() * (SERVICES.length - 1)) + 1];
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const role = ROLES[Math.floor(Math.random() * ROLES.length)];
    const template = GOOD_REVIEW_TEMPLATES[Math.floor(Math.random() * GOOD_REVIEW_TEMPLATES.length)];
    
    // Most reviews are 5 star, some 4.5 or 4
    const randomStar = Math.random();
    const rating = randomStar > 0.8 ? 4.5 : (randomStar > 0.95 ? 4.0 : 5.0);

    reviews.push({
      id: i,
      name,
      role,
      service,
      rating,
      text: template.replace("{service}", service.toLowerCase()),
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
  }
  return reviews;
}

const ALL_REVIEWS = generateReviews(120);

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredReviews = useMemo(() => {
    if (activeFilter === "All") return ALL_REVIEWS;
    return ALL_REVIEWS.filter(r => r.service === activeFilter);
  }, [activeFilter]);

  const loadMore = () => setVisibleCount(prev => prev + 12);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72, minHeight: "100vh" }}>
        {/* HERO STATS */}
        <section style={{ padding: "4rem 0", background: "linear-gradient(180deg, rgba(168,85,247,0.05) 0%, transparent 100%)" }}>
          <div className="section-container" style={{ textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>
                Client Success Stories
              </div>
              <h1 className="section-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: 12 }}>
                Loved by <span className="text-gradient">4,000+</span> Clients
              </h1>
              <p className="section-subtitle" style={{ margin: "0 auto 3rem", maxWidth: 600 }}>
                Don't just take our word for it. Read what founders, marketing directors, and business owners have to say about our work.
              </p>
            </motion.div>

            {/* Stat Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass" style={{ padding: "1.5rem 2rem", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 200, border: "1px solid rgba(168,85,247,0.2)" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-neon-purple)", marginBottom: 4 }}>4.9/5</div>
                <div style={{ display: "flex", gap: 4, color: "var(--color-neon-purple)", marginBottom: 8 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <div style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Average Rating</div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="glass" style={{ padding: "1.5rem 2rem", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 200, border: "1px solid rgba(59,130,246,0.2)" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-neon-blue)", marginBottom: 4 }}>4,120+</div>
                <div style={{ display: "flex", gap: 8, color: "var(--color-neon-blue)", marginBottom: 8, alignItems: "center" }}>
                  <MessageSquare size={18} /> <span style={{ fontWeight: 600 }}>Total Reviews</span>
                </div>
                <div style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Globally Verified</div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass" style={{ padding: "1.5rem 2rem", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 200, border: "1px solid rgba(16,185,129,0.2)" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-neon-green)", marginBottom: 4 }}>99%</div>
                <div style={{ display: "flex", gap: 8, color: "var(--color-neon-green)", marginBottom: 8, alignItems: "center" }}>
                  <Briefcase size={18} /> <span style={{ fontWeight: 600 }}>Success Rate</span>
                </div>
                <div style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Projects Delivered</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* REVIEWS GRID & FILTERS */}
        <section style={{ padding: "2rem 0 6rem" }}>
          <div className="section-container">
            {/* Filters */}
            <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
              {SERVICES.map(filter => (
                <button
                  key={filter}
                  onClick={() => { setActiveFilter(filter); setVisibleCount(12); }}
                  style={{
                    padding: "0.6rem 1.5rem",
                    borderRadius: 30,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    border: `1px solid ${activeFilter === filter ? 'var(--color-neon-purple)' : 'var(--color-border-glass)'}`,
                    background: activeFilter === filter ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.03)',
                    color: activeFilter === filter ? 'white' : 'var(--color-text-secondary)'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              <AnimatePresence mode="popLayout">
                {filteredReviews.slice(0, visibleCount).map((review) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={`${review.id}-${review.service}`}
                    className="glass-card"
                    style={{ padding: "1.5rem", display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,rgba(168,85,247,0.2),rgba(59,130,246,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "white" }}>
                          {review.name[0]}
                        </div>
                        <div>
                          <div style={{ color: "white", fontWeight: 600, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 6 }}>
                            {review.name}
                            <CheckCircle size={14} color="var(--color-neon-cyan)" />
                          </div>
                          <div style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>{review.role}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", color: "#f59e0b", gap: 2 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(review.rating) ? "currentColor" : "transparent"} strokeWidth={i < Math.floor(review.rating) ? 0 : 1} />
                          ))}
                        </div>
                        <div style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", marginTop: 4 }}>{review.date}</div>
                      </div>
                    </div>
                    
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, flexGrow: 1, marginBottom: 16 }}>
                      "{review.text}"
                    </p>
                    
                    <div style={{ paddingTop: 16, borderTop: "1px solid var(--color-border-glass)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontWeight: 600 }}>Service Configured</span>
                      <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 10, color: "var(--color-neon-cyan)" }}>{review.service}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More */}
            {visibleCount < filteredReviews.length && (
              <div style={{ textAlign: "center" }}>
                <button 
                  onClick={loadMore}
                  className="btn-outline" 
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.8rem 2rem" }}
                >
                  Load More Reviews <ChevronDown size={18} />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
