"use client";
import { motion } from "framer-motion";
import {
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
  Megaphone,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Idea & Strategy",
    desc: "Deep-dive discovery session to understand your vision, audience, and competitive landscape.",
    color: "#a855f7",
  },
  {
    icon: PenTool,
    title: "Design & UX",
    desc: "Premium UI/UX crafted with attention to every pixel — wireframes, prototypes, and visual design.",
    color: "#3b82f6",
  },
  {
    icon: Code2,
    title: "Development",
    desc: "Built with cutting-edge frameworks for blazing performance, scalability, and 3D interactivity.",
    color: "#06b6d4",
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "Rigorous QA testing, SEO optimization, and flawless deployment to production environments.",
    color: "#10b981",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    desc: "Data-driven campaigns across Google, Meta, and social — precision targeting for maximum ROI.",
    color: "#ec4899",
  },
  {
    icon: TrendingUp,
    title: "Scaling",
    desc: "Continuous optimization, analytics, and AI-powered automation to compound your growth.",
    color: "#f59e0b",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            Our Process
          </div>
          <h2 className="section-title">
            From Concept to <span className="text-gradient">Scale</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            A proven 6-stage framework that transforms raw ideas into
            revenue-generating digital ecosystems.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          {/* Vertical Line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
              width: 2,
              background:
                "linear-gradient(180deg, var(--color-neon-purple), var(--color-neon-cyan), var(--color-neon-blue), transparent)",
              opacity: 0.3,
            }}
            className="timeline-line"
          />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  paddingBottom: 48,
                  position: "relative",
                }}
                className="timeline-step"
              >
                {/* Dot on center line */}
                <div
                  className="timeline-dot"
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: step.color,
                    border: "3px solid var(--color-bg)",
                    boxShadow: `0 0 20px ${step.color}50`,
                    zIndex: 2,
                  }}
                />

                {/* Card */}
                <div
                  className="glass-card"
                  style={{
                    width: "42%",
                    padding: "1.5rem",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${step.color}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <step.icon size={20} style={{ color: step.color }} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: step.color,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Step {i + 1}
                      </span>
                      <h4
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.05rem",
                          fontWeight: 600,
                          color: "white",
                        }}
                      >
                        {step.title}
                      </h4>
                    </div>
                  </div>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .timeline-line { left: 20px !important; }
          .timeline-dot { left: 20px !important; }
          .timeline-step { justify-content: flex-end !important; padding-left: 50px !important; }
          .timeline-step > .glass-card { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
