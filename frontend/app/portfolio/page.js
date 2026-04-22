"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const portfolioItems = [
  {
    title: "NexTech Platform",
    desc: "Corporate Multi-Page • 3D Interactive Design",
    gradient: "linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)",
  },
  {
    title: "Aura Fashion",
    desc: "E-Commerce Ecosystem • Payment Integrations",
    gradient: "linear-gradient(45deg, #0f0c29, #302b63, #24243e)",
  },
  {
    title: "Elevate Analytics",
    desc: "Single Page Landing • High SEO Ranking",
    gradient: "linear-gradient(135deg, #232526, #414345)",
  },
  {
    title: "Lumina Studio",
    desc: "Creative Portfolio • Minimalist Architecture",
    gradient: "linear-gradient(135deg, #141e30, #243b55)",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 80, paddingBottom: 80 }}>
        <section style={{ textAlign: "center", padding: "60px 20px 40px" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              marginBottom: 20,
            }}
          >
            <span className="text-gradient">Our Masterpieces</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              color: "var(--color-text-secondary)",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Explore our curated gallery of premium, high-conversion websites built
            for industry leaders. We blend stunning aesthetics with rigorous
            performance standards.
          </motion.p>
        </section>

        <section
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "40px 20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 40,
          }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass"
              style={{
                borderRadius: 20,
                overflow: "hidden",
                cursor: "pointer",
                border: "1px solid var(--border-glass)",
                position: "relative",
              }}
            >
              <div style={{ width: "100%", height: 280, background: item.gradient }} />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 20,
                  background: "linear-gradient(to top, rgba(10,10,12,0.95), transparent)",
                }}
              >
                <h3
                  style={{
                    color: "white",
                    marginBottom: 5,
                    fontFamily: "var(--font-heading)",
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.85rem",
                    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        <section
          style={{
            padding: "80px 20px",
            background: "rgba(255,255,255,0.02)",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                marginBottom: 40,
                color: "white",
              }}
            >
              Client Trust
            </h2>
            <div
              className="glass"
              style={{
                maxWidth: 800,
                margin: "0 auto",
                padding: "40px 20px",
                borderRadius: 20,
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  color: "white",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                "Ishiva entirely modernized our digital footprint. The transition to
                a true multi-page ecosystem with an integrated admin backend has been
                flawless. Unbelievable precision."
              </p>
              <p
                style={{
                  color: "var(--color-primary)",
                  fontWeight: "bold",
                  fontFamily: "var(--font-heading)",
                }}
              >
                - Sarah Jenkins, VP at NexTech
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
