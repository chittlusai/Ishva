"use client";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  BarChart3,
  Users,
  Bot,
  Palette,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Stunning, high-performance websites built with cutting-edge frameworks and 3D experiences.",
    color: "#a855f7",
    features: ["Next.js & React", "3D Animations", "E-commerce", "CMS Integration"],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    desc: "Dominate search rankings with data-driven SEO strategies and AI-powered analytics.",
    color: "#3b82f6",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"],
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    desc: "Maximize ROI with precision-targeted campaigns across Google, Meta, and beyond.",
    color: "#06b6d4",
    features: ["Google Ads", "Meta Ads", "Analytics", "A/B Testing"],
  },
  {
    icon: Users,
    title: "Lead Generation",
    desc: "Build high-converting funnels and automated systems that deliver qualified leads 24/7.",
    color: "#10b981",
    features: ["Landing Pages", "CRM Integration", "Email Automation", "Chatbots"],
  },
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Harness artificial intelligence to automate workflows, content, and customer interactions.",
    color: "#ec4899",
    features: ["AI Chatbots", "Auto Content", "Process Automation", "Predictive Analytics"],
  },
  {
    icon: Palette,
    title: "Branding & Design",
    desc: "Craft unforgettable brand identities with premium visual design and strategic storytelling.",
    color: "#f59e0b",
    features: ["Logo & Identity", "UI/UX Design", "Brand Strategy", "Social Media"],
  },
];

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card glow-border"
      style={{
        padding: "2rem",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow BG */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: service.color,
          filter: "blur(80px)",
          opacity: 0.1,
          transition: "opacity 0.4s",
        }}
        className="card-glow"
      />

      {/* Icon */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: `rgba(${hexToRgb(service.color)}, 0.12)`,
          border: `1px solid rgba(${hexToRgb(service.color)}, 0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <service.icon size={26} style={{ color: service.color }} />
      </div>

      {/* Content */}
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.2rem",
          fontWeight: 600,
          color: "white",
          marginBottom: 10,
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          marginBottom: 20,
        }}
      >
        {service.desc}
      </p>

      {/* Feature Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {service.features.map((f) => (
          <span
            key={f}
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: 8,
              background: `rgba(${hexToRgb(service.color)}, 0.08)`,
              border: `1px solid rgba(${hexToRgb(service.color)}, 0.15)`,
              color: service.color,
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default function Services() {
  return (
    <section id="services" style={{ position: "relative" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            What We Do
          </div>
          <h2 className="section-title">
            End-to-End <span className="text-gradient">Digital Services</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            A complete ecosystem of services designed to take your brand from zero
            to market leader with AI-powered precision.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
