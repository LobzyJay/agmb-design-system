"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { SILHOUETTES, hexToRgb } from "@/lib/silhouettes";

// AGMB TileViz — the product-tile viz, ported from the live site. A per-product
// silhouette is Bayer 8×8 ordered-dithered into a dot field in the accent colour;
// cursor proximity displaces dots outward with smoothed iron-filings repulsion.
// Pauses off-screen (IntersectionObserver) and renders static under reduced-motion.

const BAYER8 = (() => {
  const m = [
    0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
    3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
  ];
  const out = new Float32Array(64);
  for (let i = 0; i < 64; i++) out[i] = m[i] / 64;
  return out;
})();

export interface TileVizProps {
  /** Silhouette kind: nhf | mreif | construction | reif | commercial. */
  viz: keyof typeof SILHOUETTES | string;
  /** Accent colour (hex) for the dot field. */
  accent?: string;
  /** Aspect ratio (w:h) the silhouette is drawn at, so it never stretches to
   *  the container. Skylines suit wider (≈2.6), houses ≈1.6. */
  ar?: number;
  className?: string;
}

export const TileViz: React.FC<TileVizProps> = ({ viz, accent = "#22C55E", ar = 1.7, className }) => {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    const silhouette = SILHOUETTES[viz];
    if (!ctx || !silhouette) return;

    const accentRGB = hexToRgb(accent);
    const RADIUS = 130, MAX_PUSH = 14, FOLLOW_LERP = 0.15, DISP_LERP = 0.2, DOT_ALPHA = 0.88, DOT = 2, SAMPLE_STEP = 3;
    const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles: { bx: number; by: number; dx: number; dy: number }[] = [];
    const mouse = { x: -10000, y: -10000, active: false };
    const smooth = { x: -10000, y: -10000 };
    let raf = 0, needsSeed = true, cw = 0, ch = 0;

    function seed() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(2, Math.floor(rect.width * dpr));
      canvas!.height = Math.max(2, Math.floor(rect.height * dpr));
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
      cw = rect.width; ch = rect.height;

      const off = document.createElement("canvas");
      off.width = Math.floor(cw); off.height = Math.floor(ch);
      const octx = off.getContext("2d")!;
      // Draw the silhouette inside a fixed-AR box so it keeps its proportions
      // regardless of the container shape: fit by the tighter axis, centre
      // horizontally, anchor to the bottom (so the building stays grounded).
      let bw = off.width;
      let bh = bw / ar;
      if (bh > off.height) { bh = off.height; bw = bh * ar; }
      const ox = (off.width - bw) / 2;
      const oy = off.height - bh;
      octx.save();
      octx.translate(ox, oy);
      silhouette!(octx, bw, bh);
      octx.restore();
      const data = octx.getImageData(0, 0, off.width, off.height).data;

      particles = [];
      for (let y = 0; y < off.height; y += SAMPLE_STEP) {
        for (let x = 0; x < off.width; x += SAMPLE_STEP) {
          const a8 = data[(y * off.width + x) * 4 + 3];
          if (a8 > 24 && a8 / 255 > BAYER8[(y & 7) * 8 + (x & 7)]) {
            particles.push({ bx: x + (Math.random() - 0.5) * 1.4, by: y + (Math.random() - 0.5) * 1.4, dx: 0, dy: 0 });
          }
        }
      }
      needsSeed = false;
    }

    function render() {
      ctx!.clearRect(0, 0, cw, ch);
      if (mouse.active) {
        if (smooth.x < -9000) { smooth.x = mouse.x; smooth.y = mouse.y; }
        else { smooth.x += (mouse.x - smooth.x) * FOLLOW_LERP; smooth.y += (mouse.y - smooth.y) * FOLLOW_LERP; }
      }
      const R = RADIUS;
      ctx!.fillStyle = `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b},${DOT_ALPHA})`;
      for (let i = 0, n = particles.length; i < n; i++) {
        const p = particles[i];
        let tx = 0, ty = 0;
        if (mouse.active) {
          const dx = p.bx - smooth.x, dy = p.by - smooth.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < R && d > 0.0001) { const s = (1 - d / R) ** 2; tx = (dx / d) * MAX_PUSH * s; ty = (dy / d) * MAX_PUSH * s; }
        }
        p.dx += (tx - p.dx) * DISP_LERP;
        p.dy += (ty - p.dy) * DISP_LERP;
        ctx!.fillRect(p.bx + p.dx, p.by + p.dy, DOT, DOT);
      }
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.fillStyle = `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b},${DOT_ALPHA})`;
      for (const p of particles) ctx!.fillRect(p.bx, p.by, DOT, DOT);
    }

    const loop = () => { render(); raf = requestAnimationFrame(loop); };
    const start = () => { if (needsSeed) seed(); if (REDUCED) { drawStatic(); return; } if (!raf) loop(); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
      if (!mouse.active) { smooth.x = mouse.x; smooth.y = mouse.y; }
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    if (!REDUCED) { host.addEventListener("mousemove", onMove); host.addEventListener("mouseleave", onLeave); }

    const io = new IntersectionObserver((entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())), { threshold: 0.15 });
    io.observe(host);
    const onResize = () => { needsSeed = true; };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
    };
  }, [viz, accent]);

  return (
    <div ref={hostRef} className={cn("relative h-full w-full", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};
