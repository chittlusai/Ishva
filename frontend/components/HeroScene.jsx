"use client";
import { useEffect, useRef } from "react";

export default function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let w, h;
    
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let targetMx = mx;
    let targetMy = my;

    const onMouseMove = (e) => {
      targetMx = e.clientX;
      targetMy = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Elegant Fluid Orbs
    const orbs = [
      { x: w * 0.2, y: h * 0.3, r: Math.max(w, h) * 0.4, color: "rgba(139, 92, 246, 0.5)", vx: 0.3, vy: 0.2 }, // Violet
      { x: w * 0.8, y: h * 0.7, r: Math.max(w, h) * 0.4, color: "rgba(6, 182, 212, 0.4)", vx: -0.2, vy: 0.3 }, // Cyan
      { x: w * 0.5, y: h * 0.9, r: Math.max(w, h) * 0.5, color: "rgba(236, 72, 153, 0.3)", vx: 0.2, vy: -0.2 }  // Pink
    ];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Smooth mouse follow (easing)
      mx += (targetMx - mx) * 0.05;
      my += (targetMy - my) * 0.05;

      ctx.globalCompositeOperation = "screen";

      orbs.forEach((orb, i) => {
        // Slow organic floating
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Gentle bounds bounce
        if (orb.x < -orb.r * 0.5) orb.vx *= -1;
        if (orb.x > w + orb.r * 0.5) orb.vx *= -1;
        if (orb.y < -orb.r * 0.5) orb.vy *= -1;
        if (orb.y > h + orb.r * 0.5) orb.vy *= -1;

        // Interaction: The main violet orb stretches towards the mouse gracefully
        let drawX = orb.x;
        let drawY = orb.y;

        if (i === 0) {
           drawX += (mx - w/2) * 0.3;
           drawY += (my - h/2) * 0.3;
        }

        const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, orb.r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, "transparent");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", filter: "blur(80px)" }}
      />
      {/* Deep luxury vignette mask to blend edges smoothly into the #050505 background */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 0%, #050505 90%)" }} />
      {/* Subtle Noise Texture for high-end cinematic feel */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", mixBlendMode: "overlay" }} />
    </div>
  );
}
