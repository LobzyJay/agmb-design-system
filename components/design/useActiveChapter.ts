"use client";
import * as React from "react";

// IntersectionObserver — return the id of the chapter section currently
// dominating the viewport. Falls back to first id pre-mount.
//
// Strategy: observe each chapter section, pick the one whose top crossed the
// 25% viewport mark most recently. This handles long chapters whose body
// occupies the whole viewport (so isIntersecting alone isn't enough).

export function useActiveChapter(ids: string[]): [string, (id: string) => void] {
  const [active, setActive] = React.useState<string>(ids[0] ?? "");
  // Click-driven overrides — when the user clicks a sidebar link we set this
  // for the duration of the smooth-scroll, so the IO doesn't fight the user.
  const overrideRef = React.useRef<{ id: string; until: number } | null>(null);

  const setOverride = React.useCallback((id: string) => {
    overrideRef.current = { id, until: performance.now() + 700 };
    setActive(id);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const onScroll = () => {
      if (overrideRef.current && performance.now() < overrideRef.current.until) return;
      // Pick the chapter whose top is closest to (but not past) 25% of the viewport.
      const threshold = window.innerHeight * 0.25;
      let bestId = active;
      let bestDist = Number.POSITIVE_INFINITY;
      for (const el of elements) {
        const top = el.getBoundingClientRect().top;
        // Distance from threshold; favour sections whose top has just crossed it.
        const dist = top <= threshold ? threshold - top : Infinity;
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id;
        }
      }
      // If no section has crossed the threshold yet (page-top), fall back to the first.
      if (bestDist === Infinity) bestId = ids[0];
      setActive((prev) => (prev === bestId ? prev : bestId));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // intentional: ids is stable per render lifetime (literal array in page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  return [active, setOverride];
}
