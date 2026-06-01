import * as React from "react";
import { cn } from "@/lib/cn";
import { Pill } from "@/components/Pill";

// AGMB Newsroom — a featured story as a tall navy tile (gold chip, large title)
// beside a column of story rows whose titles shift to gold on hover.

export interface NewsStory {
  meta: React.ReactNode;
  title: React.ReactNode;
  href?: string;
}
export interface NewsFeatured extends NewsStory {
  chip?: React.ReactNode;
  image?: string;
}

export interface NewsroomProps {
  eyebrow?: React.ReactNode;
  heading?: React.ReactNode;
  featured: NewsFeatured;
  stories: NewsStory[];
  className?: string;
}

export const Newsroom: React.FC<NewsroomProps> = ({ eyebrow, heading, featured, stories, className }) => {
  const Featured: React.ElementType = featured.href ? "a" : "article";
  return (
    <section className={cn("bg-black px-6 py-24 md:px-10", className)}>
      <div className="mx-auto max-w-[1400px]">
        {(eyebrow || heading) && (
          <header className="mb-12 flex flex-col gap-3">
            {eyebrow && <span className="eyebrow text-text-muted-on-navy">{eyebrow}</span>}
            {heading && <h2 className="h2 text-cream-warm">{heading}</h2>}
          </header>
        )}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Featured
            href={featured.href}
            className="group relative flex min-h-[360px] items-end overflow-hidden rounded-xl border border-cream-warm/10 bg-navy p-10"
            style={featured.image ? { backgroundImage: `url(${featured.image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,26,46,0.2) 0%, rgba(6,26,46,0.55) 55%, rgba(6,26,46,0.92) 100%)" }} />
            {featured.chip && <span className="absolute left-6 top-6 z-[1]"><Pill tone="glass">{featured.chip}</Pill></span>}
            <div className="relative z-[1] flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.06em] text-text-muted-on-navy">{featured.meta}</span>
              <h3 className="max-w-2xl text-[32px] font-medium leading-[1.1] tracking-[-0.04em] text-cream-warm">{featured.title}</h3>
            </div>
          </Featured>
          <div className="flex flex-col">
            {stories.map((s, i) => {
              const Tag: React.ElementType = s.href ? "a" : "div";
              return (
                <Tag key={i} href={s.href} className="group flex flex-col gap-3 border-b border-cream-warm/10 py-7 last:border-b-0">
                  <span className="text-xs uppercase tracking-[0.06em] text-text-muted-on-navy">{s.meta}</span>
                  <span className="numeric text-xl tracking-[-0.05em] text-cream-warm transition group-hover:text-gold-vivid" style={{ lineHeight: 1.18 }}>{s.title}</span>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
