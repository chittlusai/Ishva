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

    const particles = [];
    const PARTICLE_COUNT = 180;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const colors = ["#a855f7", "#3b82f6", "#06b6d4", "#ec4899", "#8b5cf6"];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    // Grid parameters
    const gridSpacing = 60;
    let gridOffset = 0;

    // Mouse tracking
    let mx = w / 2;
    let my = h / 2;
    const handleMouse = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Perspective grid floor
      ctx.save();
      ctx.strokeStyle = "rgba(168, 85, 247, 0.06)";
      ctx.lineWidth = 0.5;
      gridOffset = (gridOffset + 0.15) % gridSpacing;

      // Horizontal grid lines (perspective)
      for (let y = h * 0.55; y < h + gridSpacing; y += gridSpacing * 0.3) {
        const perspective = (y - h * 0.5) / (h * 0.5);
        ctx.globalAlpha = perspective * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y + gridOffset * perspective);
        ctx.lineTo(w, y + gridOffset * perspective);
        ctx.stroke();
      }

      // Vertical grid lines (converging to center)
      for (let x = -w * 0.5; x < w * 1.5; x += gridSpacing) {
        ctx.globalAlpha = 0.04;
        const cx = w / 2;
        const vanishY = h * 0.45;
        ctx.beginPath();
        ctx.moveTo(cx + (x - cx) * 0.05, vanishY);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      ctx.restore();

      // Particle connections
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = particles[i].color;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      for (const p of particles) {
        // Mouse repulsion
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const dmDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (dmDist < 150) {
          const force = (150 - dmDist) / 150;
          p.vx += (dmx / dmDist) * force * 0.2;
          p.vy += (dmy / dmDist) * force * 0.2;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw glow
        ctx.globalAlpha = p.alpha * 0.3;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Floating wireframe shapes
      const t = Date.now() * 0.001;

      // Rotating hexagon (top-right)
      drawHexagon(ctx, w * 0.78, h * 0.25, 60, t * 0.3, "#a855f720");
      // Rotating triangle (bottom-left)
      drawTriangle(ctx, w * 0.15, h * 0.7, 50, t * 0.4, "#06b6d420");
      // Circle orbit (center)
      drawOrbit(ctx, w * 0.5, h * 0.45, 100, t * 0.2, "#3b82f618");

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

function drawHexagon(ctx, cx, cy, r, angle, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  for (let i = 0; i <= 6; i++) {
    const a = (Math.PI / 3) * i;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawTriangle(ctx, cx, cy, r, angle, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  for (let i = 0; i <= 3; i++) {
    const a = (Math.PI * 2 / 3) * i - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawOrbit(ctx, cx, cy, r, angle, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Orbiting dot
  const dotX = cx + Math.cos(angle * 3) * r;
  const dotY = cy + Math.sin(angle * 3) * r;
  ctx.fillStyle = "#3b82f6";
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
