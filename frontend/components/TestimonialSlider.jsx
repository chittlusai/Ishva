"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "CEO, FinVault",
    text: "Ishiva transformed our digital presence completely. The 3D website they built generated 4x more leads in the first month. Their marketing team is equally brilliant — a true one-stop ecosystem.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Founder, StyleNest",
    text: "The e-commerce platform Ishiva built for us is stunning. Our conversion rate jumped by 280% and the SEO team got us to page 1 for 15+ keywords in just 3 months.",
    rating: 5,
  },
  {
    name: "Vikram Desai",
    role: "CTO, CloudPeak",
    text: "Working with Ishiva feels like having an entire digital department. The AI automation they implemented saved us 40+ hours per week. Absolutely premium quality work.",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Marketing Head, GreenEarth",
    text: "From branding to performance marketing — Ishiva delivered everything with surgical precision. Our ad ROI increased by 5.2x. They don't just build websites, they build revenue machines.",
    rating: 5,
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (d) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            Testimonials
          </div>
          <h2 className="section-title">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
        </motion.div>

        {/* Slider */}
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card"
              style={{
                padding: "2.5rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "var(--color-neon-purple)",
                  filter: "blur(100px)",
                  opacity: 0.06,
                }}
              />

              <Quote
                size={36}
                style={{
                  color: "var(--color-neon-purple)",
                  opacity: 0.3,
                  marginBottom: 16,
                }}
              />

              <p
                style={{
                  color: "var(--color-text-primary)",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  marginBottom: 24,
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>

              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                  marginBottom: 16,
                }}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="#f59e0b"
                    style={{ color: "#f59e0b" }}
                  />
                ))}
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: 4,
                }}
              >
                {t.name}
              </h4>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.85rem",
                }}
              >
                {t.role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              marginTop: 24,
            }}
          >
            <button
              onClick={prev}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid var(--color-border-glass)",
                background: "rgba(12,12,20,0.6)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  style={{
                    width: current === i ? 32 : 8,
                    height: 8,
                    borderRadius: 4,
                    border: "none",
                    background:
                      current === i
                        ? "var(--color-neon-purple)"
                        : "rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid var(--color-border-glass)",
                background: "rgba(12,12,20,0.6)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
