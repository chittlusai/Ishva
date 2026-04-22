"use client";
import { motion } from "framer-motion";
import {
  Target,
  Heart,
  Zap,
  Shield,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const values = [
  { icon: Target, title: "Precision", desc: "Every pixel, every campaign, every line of code — crafted with surgical precision for maximum impact.", color: "#a855f7" },
  { icon: Heart, title: "Passion", desc: "We don't just build websites, we pour our hearts into creating digital experiences that captivate.", color: "#ec4899" },
  { icon: Zap, title: "Innovation", desc: "Always at the frontier — leveraging AI, 3D, and cutting-edge frameworks to stay ahead of the curve.", color: "#f59e0b" },
  { icon: Shield, title: "Trust", desc: "Transparent processes, honest pricing, and results you can measure. 99% client satisfaction speaks volumes.", color: "#10b981" },
];

const team = [
  { name: "Rahul Khanna", role: "Founder & CEO", color: "#a855f7" },
  { name: "Aarti Joshi", role: "Head of Design", color: "#ec4899" },
  { name: "Vikram Singh", role: "Tech Lead", color: "#3b82f6" },
  { name: "Neha Gupta", role: "Marketing Director", color: "#06b6d4" },
  { name: "Arjun Patel", role: "AI Engineering Lead", color: "#10b981" },
  { name: "Divya Rao", role: "Client Success Manager", color: "#f59e0b" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          <div className="section-container" style={{ textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="section-label" style={{ justifyContent: "center" }}>
                About Ishiva
              </div>
              <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                We Are the <span className="text-gradient">Digital Growth</span> Architects
              </h1>
              <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: 640 }}>
                Ishiva Digital Technologies Pvt Ltd is a full-spectrum digital agency that combines
                world-class design, cutting-edge technology, and data-driven marketing to build
                businesses that scale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <div className="section-container" style={{ paddingTop: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {[
                { num: "500+", label: "Projects Delivered" },
                { num: "98%", label: "Client Retention" },
                { num: "40+", label: "Team Members" },
                { num: "12", label: "Countries Served" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card"
                  style={{ padding: "2rem", textAlign: "center" }}
                >
                  <div style={{
                    fontFamily: "var(--font-heading)", fontSize: "2.5rem",
                    fontWeight: 800, marginBottom: 4,
                  }}>
                    <span className="text-gradient">{s.num}</span>
                  </div>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "3rem" }}
            >
              <div className="section-label" style={{ justifyContent: "center" }}>Our Values</div>
              <h2 className="section-title">What <span className="text-gradient">Drives Us</span></h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card"
                  style={{ padding: "2rem" }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${v.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16,
                  }}>
                    <v.icon size={24} style={{ color: v.color }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: "white", marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", lineHeight: 1.7 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "3rem" }}
            >
              <div className="section-label" style={{ justifyContent: "center" }}>
                <Users size={14} /> Our Team
              </div>
              <h2 className="section-title">Meet the <span className="text-gradient">Minds</span></h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem" }}>
              {team.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="glass-card"
                  style={{ padding: "1.5rem", textAlign: "center", cursor: "pointer" }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.color}40, ${t.color}15)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 14px",
                    fontSize: "1.5rem", fontWeight: 700,
                    fontFamily: "var(--font-heading)",
                    color: t.color,
                  }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", color: "white", marginBottom: 4 }}>{t.name}</h4>
                  <p style={{ fontSize: "0.8rem", color: t.color }}>{t.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="section-container" style={{ textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Ready to Work <span className="text-gradient">Together?</span></h2>
              <p className="section-subtitle" style={{ margin: "0 auto 2rem" }}>
                Let's build something extraordinary. Your next chapter starts here.
              </p>
              <Link href="/contact">
                <button className="btn-primary" style={{ padding: "1rem 2.5rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    Get in Touch <ArrowRight size={18} />
                  </span>
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
