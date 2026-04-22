"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const user = localStorage.getItem("ishva_user");
    if (user) {
      setUserName(user.split("@")[0]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ishva_user");
    localStorage.removeItem("ishva_phone");
    router.push("/");
  };

  return (
    <>
      <nav className="navbar glass" style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <div className="logo">
          <Link href="/"><span className="logo-text">Ishva</span></Link>
        </div>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/about">About Us</Link>
          <Link href="/process">Process</Link>
          <Link href="/contact">Contact</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 12px", borderRadius: 30, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              👤
            </div>
            <div style={{ textAlign: "left", lineHeight: 1.2 }}>
              <div style={{ fontSize: "0.95rem", color: "white", fontFamily: "var(--font-heading)" }}>{userName}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-secondary" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
            Log Out
          </button>
        </div>
      </nav>

      <main style={{ minHeight: "100vh", padding: "100px 20px" }}>
        <section style={{ maxWidth: 600, margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Order Checkout
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass"
            style={{ padding: 40, borderRadius: 20 }}
          >
            <h3 style={{ marginBottom: 20, color: "white" }}>Review Order Summary</h3>
            <div
              style={{
                marginBottom: 24, padding: 20, borderRadius: 12,
                background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)",
                color: "var(--color-text-secondary)", lineHeight: 1.8
              }}
            >
              Order initialized. Proceed to configure modules in blueprint.
            </div>
            <h3 style={{ marginBottom: 20, color: "white" }}>Payment Simulation</h3>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 8, color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
                Card Number (Dummy Input)
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                style={{
                  width: "100%", padding: 12, borderRadius: 8,
                  border: "1px solid var(--border-glass)", background: "rgba(255,255,255,0.02)",
                  color: "white", outline: "none", fontSize: "1rem"
                }}
              />
            </div>
            <button className="btn-primary w-100" style={{ padding: 16 }}>
              Process Payment
            </button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
