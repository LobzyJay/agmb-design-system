"use client";
import * as React from "react";

// AGMB ScrollProgress — the 2px gold thread pinned to the top of the viewport,
// filling left→right with reading progress. Gold gradient + soft glow.

export const ScrollProgress: React.FC = () => {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 h-0.5" style={{ zIndex: "var(--z-scroll-progress)" }} aria-hidden>
      <div
        className="h-full"
        style={{
          width: `${Math.min(1, Math.max(0, p)) * 100}%`,
          background: "linear-gradient(90deg, var(--color-gold-rich) 0%, var(--color-gold-vivid) 60%, rgba(240,196,65,0.4) 100%)",
          boxShadow: "0 0 12px rgba(240,196,65,0.5)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
};
