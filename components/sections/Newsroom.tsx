import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Newsroom — uses the site's verbatim .news__row / .featured / .story CSS.

export interface NewsStory {
  meta: React.ReactNode;
  title: React.ReactNode;
  href?: string;
}
export interface NewsFeatured extends NewsStory {
  chip?: React.ReactNode;
  date?: React.ReactNode;
  dek?: React.ReactNode;
  image?: string;
}

export interface NewsroomProps {
  featured: NewsFeatured;
  stories: NewsStory[];
  className?: string;
}

export const Newsroom: React.FC<NewsroomProps> = ({ featured, stories, className }) => (
  <div className={cn("news__row", className)}>
    <div className="featured">
      <a
        href={featured.href ?? "#"}
        className="featured__tile"
        style={featured.image ? { backgroundImage: `linear-gradient(180deg, rgba(6,26,46,0.2), rgba(6,26,46,0.92)), url(${featured.image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        {featured.chip && <span className="featured__chip">{featured.chip}</span>}
        {featured.date && <span className="featured__date">{featured.date}</span>}
        <h3 className="featured__title">{featured.title}</h3>
      </a>
      {featured.dek && <p className="featured__dek">{featured.dek}</p>}
    </div>
    <div className="secondary">
      {stories.map((s, i) => {
        const Tag: React.ElementType = s.href ? "a" : "div";
        return (
          <Tag key={i} href={s.href} className="story" style={{ textDecoration: "none" }}>
            <span className="story__meta">{s.meta}</span>
            <span className="story__title">{s.title}</span>
          </Tag>
        );
      })}
    </div>
  </div>
);
