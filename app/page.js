"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  BarChart3,
  Globe,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import AISearchBar from "@/components/AISearchBar";
import ProcessTimeline from "@/components/ProcessTimeline";
import CaseStudies from "@/components/CaseStudies";
import TestimonialSlider from "@/components/TestimonialSlider";
import ChatBot from "@/components/ChatBot";
import FloatingCTA from "@/components/FloatingCTA";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
});

const floatingCards = [
  { icon: Search, label: "SEO", x: "8%", y: "18%", delay: 0.3, color: "#3b82f6" },
  { icon: BarChart3, label: "Ads", x: "78%", y: "12%", delay: 0.5, color: "#06b6d4" },
  { icon: Globe, label: "Website", x: "5%", y: "68%", delay: 0.7, color: "#a855f7" },
  { icon: Users, label: "Leads", x: "82%", y: "72%", delay: 0.9, color: "#10b981" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <HeroScene />

        {/* Floating UI Cards */}
        {floatingCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: card.delay + 0.8, duration: 0.6, ease: "backOut" }}
            style={{
              position: "absolute",
              left: card.x,
              top: card.y,
              zIndex: 5,
              animation: `float-card ${3 + i * 0.5}s ease-in-out infinite`,
            }}
            className="hero-floating-card"
          >
            <div
              className="glass"
              style={{
                padding: "12px 20px",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: `1px solid ${card.color}30`,
                boxShadow: `0 4px 20px ${card.color}15`,
              }}
            >
              <card.icon size={18} style={{ color: card.color }} />
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  color: "white",
                }}
              >
                {card.label}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Hero Text */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 1.5rem",
            maxWidth: 800,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="section-label"
              style={{ justifyContent: "center", marginBottom: 20 }}
            >
              Ishiva Digital Technologies Pvt Ltd
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            <span className="text-gradient">We Build.</span> We Market.{" "}
            <br />
            <span className="text-gradient">We Scale.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "1.15rem",
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 560,
              margin: "0 auto 40px",
            }}
          >
            From idea to revenue — complete digital growth ecosystem.
            Premium websites, AI automation, and data-driven marketing under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/quotation">
              <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "1rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  Start Your Project <ArrowRight size={18} />
                </span>
              </button>
            </Link>
            <Link href="/templates">
              <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "1rem" }}>
                Explore Templates
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            background: "linear-gradient(transparent, var(--color-bg))",
            zIndex: 8,
            pointerEvents: "none",
          }}
        />
      </section>

      {/* ═══════ REMAINING SECTIONS ═══════ */}
      <Services />
      <AISearchBar />
      <ProcessTimeline />
      <CaseStudies />
      <TestimonialSlider />

      {/* ═══════ FINAL CTA ═══════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="section-title"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              Ready to Build Your{" "}
              <span className="text-gradient">Digital Empire?</span>
            </h2>
            <p
              className="section-subtitle"
              style={{
                margin: "0 auto 2.5rem",
                maxWidth: 520,
              }}
            >
              Join 500+ businesses that trust Ishiva to power their digital growth.
              Let's create something extraordinary together.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/quotation">
                <button
                  className="btn-primary"
                  style={{ padding: "1rem 2.5rem", fontSize: "1rem" }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    Get Your Free Quote <ArrowRight size={18} />
                  </span>
                </button>
              </Link>
              <Link href="/contact">
                <button
                  className="btn-outline"
                  style={{ padding: "1rem 2.5rem", fontSize: "1rem" }}
                >
                  Schedule a Call
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
      <ChatBot />

      <style jsx global>{`
        @media (max-width: 768px) {
          .hero-floating-card { display: none !important; }
        }
      `}</style>
    </>
  );
}
