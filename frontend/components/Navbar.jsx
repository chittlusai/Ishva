"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  Rocket,
  Home,
  Layers,
  LayoutGrid,
  Calculator,
  Users,
  Mail,
  UserCircle
} from "lucide-react";
import { useUser } from "@/lib/userContext";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#services", label: "Services", icon: Layers },
  { href: "/templates", label: "Create your Website", icon: LayoutGrid },
  { href: "/quotation", label: "Quotation", icon: Calculator },
  { href: "/reviews", label: "Reviews", icon: Users },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userProfile, isLoaded } = useUser() || { userProfile: null, isLoaded: true };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 2rem",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: scrolled
            ? "1px solid rgba(168,85,247,0.12)"
            : "1px solid transparent",
          background: scrolled
            ? "rgba(6,6,10,0.85)"
            : "rgba(6,6,10,0.4)",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, #a855f7, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Rocket size={18} color="white" />
            </div>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              Ishiva
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                transition: "color 0.25s",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "white")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  "var(--color-text-secondary)")
              }
            >
              {l.label}
            </Link>
          ))}
          {isLoaded && userProfile ? (
            <Link href="/profile">
              <button className="btn-outline" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem", borderColor: "var(--color-neon-purple)", color: "var(--color-neon-purple)", display: "flex", alignItems: "center", gap: "6px" }}>
                <UserCircle size={16} /> Admin / Profile
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="btn-outline" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem", borderColor: "var(--color-neon-purple)", color: "var(--color-neon-purple)" }}>
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Desktop CTA */}
        <Link href="/contact" className="nav-desktop">
          <button className="btn-primary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.85rem" }}>
            <span>Start Your Project</span>
          </button>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "rgba(6,6,10,0.97)",
              backdropFilter: "blur(30px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              paddingTop: 72,
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "1.5rem",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <l.icon size={22} style={{ color: "var(--color-neon-purple)" }} />
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16 }}
            >
              {isLoaded && userProfile ? (
                <Link href="/profile" onClick={() => setMobileOpen(false)}>
                  <button className="btn-outline" style={{ width: "100%", padding: "1rem 2.5rem", fontSize: "1rem", borderColor: "var(--color-neon-purple)", color: "var(--color-neon-purple)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <UserCircle size={18} /> Admin / Profile
                  </button>
                </Link>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <button className="btn-outline" style={{ width: "100%", padding: "1rem 2.5rem", fontSize: "1rem", borderColor: "var(--color-neon-purple)", color: "var(--color-neon-purple)" }}>
                    Login
                  </button>
                </Link>
              )}
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem" }}>
                  <span>Start Your Project</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
