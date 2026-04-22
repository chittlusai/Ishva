"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, BarChart3, Zap } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 340,
    suffix: "%",
    label: "Average Traffic Increase",
    color: "#a855f7",
  },
  {
    icon: BarChart3,
    value: 4.8,
    suffix: "x",
    label: "Conversion Rate Boost",
    color: "#3b82f6",
    decimals: 1,
  },
  {
    icon: Users,
    value: 12000,
    suffix: "+",
    label: "Leads Generated Monthly",
    color: "#06b6d4",
  },
  {
    icon: Zap,
    value: 99,
    suffix: "%",
    label: "Client Satisfaction Score",
    color: "#10b981",
  },
];

function AnimatedCounter({ value, suffix = "", decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * value);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const display =
    decimals > 0
      ? count.toFixed(decimals)
      : value >= 1000
      ? Math.floor(count).toLocaleString()
      : Math.floor(count);

  return (
    <span ref={ref} style={{ animation: "counter-glow 3s ease-in-out infinite" }}>
      {display}
      {suffix}
    </span>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" style={{ position: "relative" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            Proven Results
          </div>
          <h2 className="section-title">
            Real <span className="text-gradient">Growth Metrics</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Our data-driven approach has delivered transformative results for
            businesses across every industry.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            maxWidth: 1100,
            margin: "0 auto 4rem",
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: "2rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: stat.color,
                  filter: "blur(60px)",
                  opacity: 0.12,
                }}
              />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${stat.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "white",
                  marginBottom: 8,
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mini Graphs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {/* Traffic Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: "1.5rem" }}
          >
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.9rem",
                color: "white",
                marginBottom: 20,
              }}
            >
              Traffic Growth
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 6,
                height: 100,
              }}
            >
              {[20, 35, 30, 50, 45, 65, 55, 80, 75, 95, 90, 100].map(
                (h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    style={{
                      flex: 1,
                      borderRadius: "4px 4px 0 0",
                      background: `linear-gradient(180deg, #a855f780, #a855f720)`,
                      minWidth: 8,
                    }}
                  />
                )
              )}
            </div>
          </motion.div>

          {/* Conversion Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card"
            style={{ padding: "1.5rem" }}
          >
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.9rem",
                color: "white",
                marginBottom: 20,
              }}
            >
              Conversion Rate
            </h4>
            <div style={{ position: "relative", height: 100 }}>
              <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 Q30,70 60,65 T120,50 T180,35 T240,20 T300,10 V100 H0Z"
                  fill="url(#lineGrad)"
                />
                <path
                  d="M0,80 Q30,70 60,65 T120,50 T180,35 T240,20 T300,10"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
