"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calculator, PenTool, Rocket } from "lucide-react";

export default function ProcessPage() {
  const steps = [
    {
      icon: Calculator,
      title: "1. Dynamic Quotation",
      desc: "Enter our interactive portal to visually generate a highly precise, down-to-the-rupee quotation tailored instantly to your feature selections.",
    },
    {
      icon: PenTool,
      title: "2. Architectural Customization",
      desc: "Once approved, our team deploys cutting-edge Figma workflows to customize color palettes, 3D interactives, and micro-animations exclusively matching your brand identity.",
    },
    {
      icon: Rocket,
      title: "3. Deployment & Launch",
      desc: "We push your platform into our high-speed hosting nodes globally, executing rigorous SEO caching and mobile optimizations before handing over the admin keys.",
    },
  ];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 80, paddingBottom: 80 }}>
        <section style={{ textAlign: "center", padding: "60px 20px 20px" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              marginBottom: 10,
            }}
          >
            The Ishiva Process
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ color: "var(--color-text-secondary)" }}
          >
            From concept to high-performance launch. Total transparency.
          </motion.p>
        </section>

        <section style={{ maxWidth: 800, margin: "60px auto", padding: 20 }}>
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              style={{
                display: "flex",
                gap: 30,
                marginBottom: 40,
                position: "relative",
              }}
            >
              {idx !== steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 24,
                    top: 50,
                    bottom: -40,
                    width: 2,
                    background: "rgba(255,255,255,0.1)",
                    zIndex: -1,
                  }}
                />
              )}
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  flexShrink: 0,
                  boxShadow: "0 0 20px rgba(59,130,246,0.4)",
                  zIndex: 2,
                }}
              >
                <step.icon size={24} />
              </div>
              <div
                className="glass"
                style={{
                  padding: 30,
                  borderRadius: 16,
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    marginBottom: 10,
                    color: "white",
                    fontSize: "1.4rem",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
