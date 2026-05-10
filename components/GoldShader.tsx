"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB GoldShader — Canvas 2D procedural metallic gold (Adewale 2026-05-09 v4).
// Sanctioned ONLY for the SuccessScreen celebration tick. Does NOT re-introduce
// gold-fill buttons / gold CTAs anywhere else — the gold demotion stays in
// effect for those surfaces. This is the "we welcome you home" warmth
// exception, contained to a single decorative glyph per page.
//
// Track B (Canvas & Algorithmic Art) techniques applied 2026-05-09 v4 craft pass:
//
//  1. Multi-layer composition. Each frame is built up on a single offscreen
//     buffer in this order, then composited onto the visible canvas masked
//     by the stroke shape:
//       (a) BEVEL  — shape rendered 1px below the main pass in shadow gold,
//                    30% alpha, simulating a rim where metal turns under.
//       (b) BASE   — 5-stop linear gradient stroke (deep → mid → vivid →
//                    highlight → shadow) — body of the metal.
//       (c) CATCH  — radial highlight composited "lighter" on top of the
//                    base. This is what makes gold read as metal: a brighter
//                    spot riding the surface, not a smeared gradient.
//       (d) GRAIN  — pre-baked low-alpha noise, "source-atop" the buffer.
//                    Polished-metal micro-texture.
//     The whole buffer is then drawn to the visible canvas. Masking is
//     handled inside the buffer, so each layer composes cleanly without
//     resetting earlier work.
//
//  2. Eased orbit. Highlight position is driven by
//        s = (sin(2πt) + 1) / 2
//     instead of linear t — slows at apex, speeds through body. Same physics
//     as light catching the lip of a curved surface.
//
//  3. Highlight catch. At apex (|sin(2πt)| → 1) the radial brightness blooms
//     for ~200ms before fading. Modelled with smoothstep on |sin(2πt)|, peak
//     alpha 0.55 → trough 0.18. The "flash" moment.
//
//  4. Bevel. 1px y-offset darker shape underneath the main stroke at 30%
//     alpha. Cheap, but cell-shading-tier convincing.
//
//  5. devicePixelRatio scaling for retina sharpness, requestAnimationFrame
//     loop with proper teardown, prefers-reduced-motion → static gradient
//     (no rAF, single paint).
//
// Reference: AmEx Gold under spot light, NOT Apple Vision Pro chrome.
// Performance budget: ~56–96px canvas, four passes per frame on an
// equivalently-sized offscreen, negligible cost. No WebGL — pure 2D context.

export type GoldShape = "tick" | "ring" | "underline";

export interface GoldShaderProps {
  /** Glyph to render. */
  shape?: GoldShape;
  /** Pixel dimension (square). */
  size?: number;
  className?: string;
  /** Override `prefers-reduced-motion: reduce` — force the animated render. */
  forceMotion?: boolean;
  /** Force the static reduced-motion render, regardless of media query. Used by the design-system specimen to demo the fallback. */
  forceReduce?: boolean;
}

// Gold gradient stops — sourced from the locked palette plus shadow stops
// (#8A5E10 / #A06E15) that were retired in the dedupe but re-introduced here
// because the metallic effect needs a darker low-end than --ag-gold provides.
// Documented as the only sanctioned literal-hex use in the system.
const STOPS = [
  { at: 0.00, hex: "#8A5E10" }, // deepest shadow — pulled-back gold
  { at: 0.22, hex: "#A06E15" }, // shadow body
  { at: 0.46, hex: "#C8972A" }, // mid · --ag-gold
  { at: 0.58, hex: "#F0C441" }, // vivid catch · --ag-gold-vivid
  { at: 0.74, hex: "#FFE48F" }, // highlight — bright reflection
  { at: 1.00, hex: "#A6741A" }, // closes back to shadow body, not full body
];

// Highlight tint for the radial catch. Slightly cooler than the gradient
// highlight so the eye reads it as a separate light source rather than just
// "more gradient."
const CATCH_INNER = "rgba(255, 240, 180, 0.95)";
const CATCH_MID   = "rgba(255, 220, 130, 0.45)";
const CATCH_OUTER = "rgba(255, 220, 130, 0)";

export const GoldShader: React.FC<GoldShaderProps> = ({
  shape = "tick",
  size = 56,
  className,
  forceMotion = false,
  forceReduce = false,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const reduce =
      forceReduce ||
      (!forceMotion &&
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Offscreen buffer — every layer draws here, then we drawImage to the
    // visible canvas in one shot. Means composite ops (lighter, source-atop)
    // never collide with the visible context's transform/state.
    const buffer = document.createElement("canvas");
    buffer.width = size * dpr;
    buffer.height = size * dpr;
    const bctx = buffer.getContext("2d");
    if (!bctx) return;
    bctx.scale(dpr, dpr);
    bctx.lineCap = "round";
    bctx.lineJoin = "round";

    // Pre-baked noise pattern. Bright-side noise only — reads as polished-
    // metal micro-scratches, not TV static.
    const noiseLayer = (() => {
      const off = document.createElement("canvas");
      off.width = size;
      off.height = size;
      const octx = off.getContext("2d");
      if (!octx) return null;
      const img = octx.createImageData(size, size);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.floor(Math.random() * 40) + 215;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = Math.random() * 22;
      }
      octx.putImageData(img, 0, 0);
      return off;
    })();

    // Geometry — declared once, traced multiple times per frame.
    const traceShape = (c: CanvasRenderingContext2D) => {
      c.beginPath();
      if (shape === "tick") {
        c.moveTo(size * 0.20, size * 0.52);
        c.lineTo(size * 0.42, size * 0.72);
        c.lineTo(size * 0.78, size * 0.30);
      } else if (shape === "ring") {
        c.arc(size / 2, size / 2, size * 0.42, 0, Math.PI * 2);
      } else if (shape === "underline") {
        c.moveTo(size * 0.10, size * 0.50);
        c.lineTo(size * 0.90, size * 0.50);
      }
    };

    const strokeWidthFor = (s: GoldShape) => {
      if (s === "tick")      return Math.max(2, size * 0.11);
      if (s === "ring")      return Math.max(2, size * 0.07);
      /* underline */        return Math.max(2, size * 0.09);
    };

    let rafId = 0;
    const start = performance.now();

    const paint = (now: number) => {
      bctx.clearRect(0, 0, size, size);

      // ── Eased orbit — phase tRaw 0..1 over 4s, mapped through sine for
      // slow-at-apex motion. `s` is the eased position (0..1).
      const tRaw = ((now - start) / 4000) % 1;
      const s = reduce ? 0.65 : (Math.sin(tRaw * Math.PI * 2) + 1) / 2;

      // Linear gradient angle still does a full revolution — easing only
      // changes the catch position, not the gradient sweep.
      const angle = reduce ? Math.PI * 0.25 : tRaw * Math.PI * 2;
      const cx = size / 2;
      const cy = size / 2;
      const r = size;
      const x0 = cx + Math.cos(angle) * r;
      const y0 = cy + Math.sin(angle) * r;
      const x1 = cx - Math.cos(angle) * r;
      const y1 = cy - Math.sin(angle) * r;

      const grad = bctx.createLinearGradient(x0, y0, x1, y1);
      STOPS.forEach((stop) => grad.addColorStop(stop.at, stop.hex));

      const sw = strokeWidthFor(shape);

      // ── Layer (a): BEVEL — 1px y-offset shadow rim under the main stroke.
      bctx.save();
      bctx.translate(0, 1);
      bctx.strokeStyle = "rgba(80, 50, 8, 0.30)";
      bctx.lineWidth = sw;
      traceShape(bctx);
      bctx.stroke();
      bctx.restore();

      // ── Layer (b): BASE — 5-stop linear gradient stroke (the body).
      bctx.strokeStyle = grad;
      bctx.lineWidth = sw;
      traceShape(bctx);
      bctx.stroke();

      // ── Layer (c): CATCH — radial highlight composited "lighter" on top
      // of the base. `source-atop` clips the bloom to the existing painted
      // pixels (i.e. the stroke), so the catch only lives on the metal.
      if (!reduce) {
        const catchX = size * (0.20 + s * 0.60);
        const catchY = size * (0.30 + (1 - s) * 0.40);

        // Apex bloom — smoothstep on |sin(2πt)| so the catch flashes briefly
        // at the orbit's edges and fades through the body.
        const pulse = Math.abs(Math.sin(tRaw * Math.PI * 2));
        const eased = pulse * pulse * (3 - 2 * pulse);
        const catchAlpha = 0.18 + eased * 0.37; // 0.18 → 0.55

        const catchRadius = size * 0.42;
        const radial = bctx.createRadialGradient(
          catchX, catchY, 0,
          catchX, catchY, catchRadius,
        );
        radial.addColorStop(0, CATCH_INNER);
        radial.addColorStop(0.45, CATCH_MID);
        radial.addColorStop(1, CATCH_OUTER);

        // First pass: source-atop overlays the bright tint inside the stroke.
        bctx.save();
        bctx.globalCompositeOperation = "source-atop";
        bctx.globalAlpha = catchAlpha;
        bctx.fillStyle = radial;
        bctx.fillRect(0, 0, size, size);
        bctx.restore();

        // Second pass: `lighter` adds RGB inside the stroke region. `lighter`
        // ignores destination alpha, so we mask via source-atop too — gives
        // an additive flash that brightens the underlying gold rather than
        // sitting flat on top of it.
        bctx.save();
        bctx.globalCompositeOperation = "lighter";
        bctx.globalAlpha = catchAlpha * 0.65;
        bctx.fillStyle = radial;
        // Mask `lighter` to stroke region: paint into a clip path defined by
        // the stroked shape. We approximate the stroke region by widening
        // lineWidth slightly and using fillRect with source-atop fallback —
        // since `lighter` won't respect existing alpha we re-mask after.
        bctx.fillRect(0, 0, size, size);
        bctx.restore();

        // Re-mask: cut everything outside the stroke region with destination-
        // in against a re-stroked copy. (This is why we work on the buffer —
        // wiping the buffer's alpha mask doesn't touch the visible canvas.)
        bctx.save();
        bctx.globalCompositeOperation = "destination-in";
        bctx.strokeStyle = "#000";
        bctx.lineWidth = sw;
        traceShape(bctx);
        bctx.stroke();
        bctx.restore();
      }

      // ── Layer (d): GRAIN — clipped to stroke via source-atop. Pre-baked.
      if (noiseLayer) {
        bctx.save();
        bctx.globalCompositeOperation = "source-atop";
        bctx.drawImage(noiseLayer, 0, 0, size, size);
        bctx.restore();
      }

      // ── Composite buffer onto the visible canvas in one shot.
      // Both contexts share the same dpr scale transform — drawing the buffer
      // at logical (size × size) maps 1:1 to its raw dimensions.
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(buffer, 0, 0, size, size);

      if (!reduce) {
        rafId = requestAnimationFrame(paint);
      }
    };

    if (reduce) {
      paint(performance.now());
    } else {
      rafId = requestAnimationFrame(paint);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shape, size, forceMotion, forceReduce]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("inline-block", className)}
      aria-hidden="true"
    />
  );
};
GoldShader.displayName = "GoldShader";
