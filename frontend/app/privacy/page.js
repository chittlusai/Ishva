"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
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
            Privacy Policy
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
            <p style={{ marginBottom: 30 }}>Last Updated: April 2026</p>

            <h2 style={{ color: "white", fontFamily: "var(--font-heading)", marginTop: 20 }}>
              1. Data Collection
            </h2>
            <p style={{ marginBottom: 20 }}>
              We strictly collect only necessary information such as client names, operational emails, and phone numbers exclusively for generating and forwarding bespoke web-design quotations. Your data is dispatched securely via encrypted gateways directly to our administrative systems.
            </p>

            <h2 style={{ color: "white", fontFamily: "var(--font-heading)", marginTop: 20 }}>
              2. Data Storage
            </h2>
            <p style={{ marginBottom: 20 }}>
              Your quotation lead states are stored natively within local secure clusters via our authenticated portals. We pledge a zero-trust structural standard where no third-party analytic trackers access your direct requirements or financial calculations.
            </p>

            <h2 style={{ color: "white", fontFamily: "var(--font-heading)", marginTop: 20 }}>
              3. Cookies
            </h2>
            <p style={{ marginBottom: 20 }}>
              Ishiva utilizes localized browser caching exclusively to persist your session progression throughout the quotation wizard. We do not distribute external tracking cookies or sell session meta-data.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
