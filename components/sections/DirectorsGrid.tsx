import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB DirectorCard / DirectorsGrid — uses the site's verbatim .directors__grid /
// .director-card CSS. Two registers: board (dark section, gold border, cream text)
// and exec (cream, white card, navy text). A card shows initials or a photo.

export interface Director {
  name: string;
  role: string;
  bio?: React.ReactNode;
  initials?: string;
  photo?: string;
}

export interface DirectorCardProps extends Director {
  exec?: boolean;
}

export const DirectorCard: React.FC<DirectorCardProps> = ({ name, role, bio, initials, photo, exec }) => (
  <article className="director-card">
    {photo ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="director-card__photo" src={photo} alt={name} />
    ) : (
      <span className="director-card__portrait">
        <span className="director-card__initials">{initials ?? name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
      </span>
    )}
    <div className="director-card__body">
      <span className="director-card__role">{role}</span>
      <span className="director-card__name">{name}</span>
      {bio && <p className="director-card__bio">{bio}</p>}
    </div>
  </article>
);

export interface DirectorsGridProps {
  directors: Director[];
  /** "board" = two-up cards; "four" = compact 4-up; "one" = single. */
  layout?: "board" | "four" | "one";
  exec?: boolean;
  className?: string;
}

export const DirectorsGrid: React.FC<DirectorsGridProps> = ({ directors, layout = "board", exec, className }) => (
  <div className={cn("directors__grid", layout === "four" && "directors__grid--four", layout === "one" && "directors__grid--one", exec && "directors--exec", className)}>
    {directors.map((d, i) => (
      <DirectorCard key={i} {...d} exec={exec} />
    ))}
  </div>
);
