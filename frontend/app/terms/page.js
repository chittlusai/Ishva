"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 800, margin: "60px auto", padding: 20 }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "var(--font-heading)",
              marginBottom: 20,
              color: "white",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Terms of Service
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass"
            style={{
              padding: 40,
              color: "var(--color-text-secondary)",
              lineHeight: 1.8,
              borderRadius: 20,
            }}
          >
            <p style={{ marginBottom: 30 }}>Effective Date: April 2026</p>

            <h2 style={{ color: "white", fontFamily: "var(--font-heading)", marginTop: 20 }}>
              1. Handover Timeline
            </h2>
            <p style={{ marginBottom: 20 }}>
              The project will be fully orchestrated and handed over to the client within 30 days of the initial agreement.
            </p>

            <h2 style={{ color: "white", fontFamily: "var(--font-heading)", marginTop: 20 }}>
              2. Payment Schedule
            </h2>
            <p style={{ marginBottom: 20 }}>
              A mandatory 50% payment must be provided by the client upfront before the project workflow is handled and initiated. The remaining 50% will be cleared upon handover.
            </p>

            <h2 style={{ color: "white", fontFamily: "var(--font-heading)", marginTop: 20 }}>
              3. Domain and Hosting Operations
            </h2>
            <p style={{ marginBottom: 20 }}>
              Domain acquisition and live hosting infrastructure are completely separate from the design quotation scope, and will be separately charged to the client.
            </p>

            <h2 style={{ color: "white", fontFamily: "var(--font-heading)", marginTop: 20 }}>
              4. Customizations
            </h2>
            <p style={{ marginBottom: 20 }}>
              Any additional parameters or architectures detailed in our portal notes are rigorously bound to these terms as the foundation of the build.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
