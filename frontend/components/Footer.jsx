"use client";
import Link from "next/link";
import { Rocket, Github, Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/#services" },
      { label: "SEO Optimization", href: "/#services" },
      { label: "Performance Marketing", href: "/#services" },
      { label: "AI Automation", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Case Studies", href: "/#case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Templates", href: "/templates" },
      { label: "Quotation", href: "/quotation" },
      { label: "Login", href: "/login" },
      { label: "Privacy Policy", href: "/contact" },
    ],
  },
];

const socials = [
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Github, href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border-glass)",
        background: "rgba(6,6,10,0.8)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "5rem 1.5rem 2rem",
        }}
      >
        {/* Top */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(3, 1fr)",
            gap: "3rem",
            marginBottom: "4rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #a855f7, #3b82f6)",
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
                }}
              >
                Ishiva
              </span>
            </div>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: 300,
                marginBottom: 12,
              }}
            >
              From idea to revenue — your complete digital growth ecosystem.
              We build, market, and scale businesses with cutting-edge technology.
            </p>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.82rem", marginBottom: 4 }}>
              📞 <a href="tel:+918309939554" style={{ color: "var(--color-neon-purple)", textDecoration: "none" }}>+91 8309939554</a>
            </p>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.82rem", marginBottom: 24 }}>
              ✉️ <a href="mailto:Support@ishivadigitaltechnology.in" style={{ color: "var(--color-neon-cyan)", textDecoration: "none" }}>Support@ishivadigitaltechnology.in</a>
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    border: "1px solid var(--color-border-glass)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-text-secondary)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-neon-purple)";
                    e.currentTarget.style.color = "var(--color-neon-purple)";
                    e.currentTarget.style.background = "rgba(168,85,247,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border-glass)";
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: 20,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {col.title}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 0.25s",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--color-text-secondary)")
                    }
                  >
                    {l.label}
                    <ArrowUpRight size={13} style={{ opacity: 0.5 }} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid var(--color-border-glass)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Ishiva Digital Technologies Pvt Ltd. All rights reserved.
          </p>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
            Crafted with passion & precision
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
