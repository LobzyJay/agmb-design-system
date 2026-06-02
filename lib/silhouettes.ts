// Per-product silhouette draws for the tile viz — ported verbatim from the live
// site. Each fills a white silhouette on a transparent canvas; the dither engine
// samples its alpha into a dot field. house (NHF), refinance (M-REIF), stacked
// phases (Construction), skyline (REIF), storefront (Commercial).

export type SilhouetteFn = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = hex.replace("#", "");
  return {
    r: parseInt(m.substring(0, 2), 16),
    g: parseInt(m.substring(2, 4), 16),
    b: parseInt(m.substring(4, 6), 16),
  };
}

export const SILHOUETTES: Record<string, SilhouetteFn> = {
  nhf(ctx, w, h) {
    ctx.fillStyle = "#fff";
    const base = h * 0.88;
    const houseW = w * 0.5;
    const houseH = h * 0.6;
    const hx = (w - houseW) / 2;
    const hy = base - houseH;
    ctx.beginPath();
    ctx.moveTo(hx - 14, hy + 6);
    ctx.lineTo(hx + houseW / 2, hy - houseH * 0.32);
    ctx.lineTo(hx + houseW + 14, hy + 6);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(hx + houseW * 0.74, hy - houseH * 0.24, houseW * 0.08, houseH * 0.3);
    ctx.fillRect(hx, hy, houseW, houseH);
    const upH = houseH * 0.22, upY = hy + houseH * 0.1, upW = houseW * 0.18;
    ctx.clearRect(hx + houseW * 0.1, upY, upW, upH);
    ctx.clearRect(hx + houseW * 0.41, upY, upW, upH);
    ctx.clearRect(hx + houseW * 0.72, upY, upW, upH);
    const gfTop = hy + houseH * 0.52, gfH = houseH * 0.36;
    ctx.clearRect(hx + houseW * 0.08, gfTop, houseW * 0.2, gfH * 0.78);
    ctx.clearRect(hx + houseW * 0.72, gfTop, houseW * 0.2, gfH * 0.78);
    ctx.clearRect(hx + houseW * 0.41, gfTop - houseH * 0.04, houseW * 0.18, gfH * 0.96);
    ctx.beginPath();
    ctx.arc(hx - houseW * 0.1, base - houseH * 0.18, houseH * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(hx - houseW * 0.1 - 3, base - houseH * 0.08, 6, houseH * 0.08);
    ctx.beginPath();
    ctx.arc(hx + houseW + houseW * 0.1, base - houseH * 0.18, houseH * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(hx + houseW + houseW * 0.1 - 3, base - houseH * 0.08, 6, houseH * 0.08);
    ctx.fillRect(0, base, w, 3);
  },

  mreif(ctx, w, h) {
    ctx.fillStyle = "#fff";
    const base = h * 0.88;
    const lw = w * 0.3, lh = h * 0.36, lx = w * 0.04, ly = base - lh;
    ctx.beginPath();
    ctx.moveTo(lx - 6, ly + 4);
    ctx.lineTo(lx + lw / 2, ly - lh * 0.4);
    ctx.lineTo(lx + lw + 6, ly + 4);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(lx, ly, lw, lh);
    ctx.clearRect(lx + lw * 0.12, ly + lh * 0.2, lw * 0.3, lh * 0.45);
    ctx.clearRect(lx + lw * 0.58, ly + lh * 0.32, lw * 0.3, lh * 0.6);
    const ax = w * 0.4, ay = base - h * 0.28, ah = h * 0.06;
    ctx.fillRect(ax, ay, w * 0.14, ah);
    ctx.beginPath();
    ctx.moveTo(ax + w * 0.14, ay - ah * 0.6);
    ctx.lineTo(ax + w * 0.14 + ah * 1.2, ay + ah / 2);
    ctx.lineTo(ax + w * 0.14, ay + ah * 1.6);
    ctx.closePath();
    ctx.fill();
    const rw = w * 0.32, rh = h * 0.74, rx = w * 0.62, ry = base - rh;
    ctx.fillRect(rx - 4, ry - h * 0.025, rw + 8, h * 0.025);
    ctx.fillRect(rx, ry, rw, rh);
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const wx = rx + rw * (0.1 + col * 0.28);
        const wy = ry + rh * (0.08 + row * 0.25);
        ctx.clearRect(wx, wy, rw * 0.2, rh * 0.16);
      }
    }
    ctx.clearRect(rx + rw * 0.38, ry + rh * 0.84, rw * 0.24, rh * 0.16);
    ctx.fillRect(0, base, w, 3);
  },

  construction(ctx, w, h) {
    ctx.fillStyle = "#fff";
    const base = h * 0.88;
    const pw = w * 0.2, gap = w * 0.046;
    let x = w * 0.025;
    ctx.fillRect(x, base - h * 0.08, pw, h * 0.08);
    x += pw + gap;
    const fh = h * 0.52, fy = base - fh, colW = pw * 0.06;
    for (let i = 0; i < 4; i++) ctx.fillRect(x + (pw - colW) * (i / 3), fy, colW, fh);
    ctx.fillRect(x, fy, pw, h * 0.02);
    ctx.fillRect(x, fy + fh * 0.5 - h * 0.01, pw, h * 0.02);
    ctx.fillRect(x, fy + fh - h * 0.02, pw, h * 0.02);
    x += pw + gap;
    const wh3 = h * 0.58, w3y = base - wh3;
    ctx.fillRect(x, w3y, pw, wh3);
    ctx.clearRect(x + pw * 0.52, w3y + wh3 * 0.5, pw * 0.5, wh3 * 0.5);
    ctx.clearRect(x + pw * 0.15, w3y + wh3 * 0.15, pw * 0.28, wh3 * 0.18);
    ctx.clearRect(x + pw * 0.55, w3y + wh3 * 0.15, pw * 0.28, wh3 * 0.18);
    x += pw + gap;
    const wh4 = h * 0.66, w4y = base - wh4;
    ctx.beginPath();
    ctx.moveTo(x - 4, w4y + 4);
    ctx.lineTo(x + pw / 2, w4y - h * 0.1);
    ctx.lineTo(x + pw + 4, w4y + 4);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x, w4y, pw, wh4);
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 2; col++) {
        ctx.clearRect(x + pw * (0.18 + col * 0.4), w4y + wh4 * (0.1 + row * 0.22), pw * 0.26, wh4 * 0.14);
      }
    }
    ctx.clearRect(x + pw * 0.4, w4y + wh4 * 0.78, pw * 0.22, wh4 * 0.22);
    ctx.fillRect(0, base, w, 3);
  },

  reif(ctx, w, h) {
    ctx.fillStyle = "#fff";
    const base = h * 0.84;
    const buildings = [
      { x: 0.0, w: 0.1, hRatio: 0.42, cols: 3, rows: 5 },
      { x: 0.09, w: 0.09, hRatio: 0.6, cols: 3, rows: 7 },
      { x: 0.17, w: 0.12, hRatio: 0.86, cols: 4, rows: 10 },
      { x: 0.28, w: 0.1, hRatio: 0.55, cols: 3, rows: 6 },
      { x: 0.37, w: 0.09, hRatio: 0.72, cols: 3, rows: 8 },
      { x: 0.45, w: 0.13, hRatio: 0.98, cols: 4, rows: 12 },
      { x: 0.57, w: 0.09, hRatio: 0.62, cols: 3, rows: 7 },
      { x: 0.65, w: 0.12, hRatio: 0.8, cols: 4, rows: 9 },
      { x: 0.76, w: 0.1, hRatio: 0.55, cols: 3, rows: 6 },
      { x: 0.85, w: 0.1, hRatio: 0.42, cols: 3, rows: 5 },
      { x: 0.93, w: 0.07, hRatio: 0.36, cols: 2, rows: 4 },
    ];
    for (const b of buildings) {
      const bx = b.x * w, bw = b.w * w, bh = b.hRatio * base * 0.9, by = base - bh;
      ctx.fillRect(bx, by, bw, bh);
      const padX = 0.14, padY = 0.05;
      const colW = (bw * (1 - 2 * padX)) / b.cols;
      const rowH = (bh * (1 - 2 * padY)) / b.rows;
      const winW = colW * 0.55, winH = rowH * 0.55;
      const offX = (colW - winW) / 2, offY = (rowH - winH) / 2;
      for (let r = 0; r < b.rows; r++) {
        for (let c = 0; c < b.cols; c++) {
          const wx = bx + bw * padX + c * colW + offX;
          const wy = by + bh * padY + r * rowH + offY;
          if (winW > 0.8 && winH > 0.8) ctx.clearRect(wx, wy, winW, winH);
        }
      }
    }
    ctx.fillRect(0, base, w, 3);
  },

  commercial(ctx, w, h) {
    ctx.fillStyle = "#fff";
    const base = h * 0.88;
    const bw = w * 0.76, bh = h * 0.66, bx = (w - bw) / 2, by = base - bh;
    ctx.fillRect(bx, by, bw, bh);
    const sigY = by + bh * 0.04, sigH = bh * 0.1;
    ctx.fillRect(bx - 6, sigY, bw + 12, sigH);
    for (let i = 0; i < 5; i++) ctx.clearRect(bx + bw * (0.22 + i * 0.12), sigY + sigH * 0.25, bw * 0.06, sigH * 0.5);
    const awY = by + bh * 0.46;
    ctx.fillRect(bx - 10, awY, bw + 20, bh * 0.05);
    const upY = by + bh * 0.22, upH = bh * 0.16;
    for (let i = 0; i < 4; i++) ctx.clearRect(bx + bw * (0.09 + i * 0.21), upY, bw * 0.14, upH);
    const gfY = by + bh * 0.58, gfH = bh * 0.36;
    ctx.clearRect(bx + bw * 0.07, gfY, bw * 0.22, gfH * 0.92);
    ctx.clearRect(bx + bw * 0.39, gfY, bw * 0.22, gfH * 0.92);
    ctx.clearRect(bx + bw * 0.71, gfY, bw * 0.22, gfH * 0.92);
    ctx.fillRect(0, base, w, 3);
  },
};
