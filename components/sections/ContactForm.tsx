"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB ContactForm — uses the site's verbatim .contact-twin CSS: a cream info
// panel (eyebrow, heading, copy, contact rows) beside a lighter-cream form panel.

export interface ContactRow {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
}

export interface ContactFormProps {
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  copy?: React.ReactNode;
  rows: ContactRow[];
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ eyebrow, heading, copy, rows, className }) => (
  <div className={cn("contact-twin", className)}>
    {/* Info panel */}
    <div className="contact-twin__panel">
      {eyebrow && <span className="contact-eyebrow">{eyebrow}</span>}
      <h3>{heading}</h3>
      {copy && <p className="contact-copy">{copy}</p>}
      <div className="contact-rows">
        {rows.map((r, i) => (
          <div key={i} className="contact-row">
            <span className="contact-row__lbl">{r.label}</span>
            <span className="contact-row__val">{r.value}</span>
            {r.sub && <span className="contact-row__sub">{r.sub}</span>}
          </div>
        ))}
      </div>
    </div>

    {/* Form panel */}
    <div className="contact-twin__panel contact-twin__panel--form">
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field-group">
          <label className="field-label" htmlFor="cf-subject">Subject</label>
          <input className="field-input" id="cf-subject" type="text" placeholder="One-line summary" />
        </div>
        <div className="contact-form-row">
          <div className="field-group">
            <label className="field-label" htmlFor="cf-name">Name</label>
            <input className="field-input" id="cf-name" type="text" placeholder="First and last" />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="cf-email">Email</label>
            <input className="field-input" id="cf-email" type="email" placeholder="you@example.com" />
          </div>
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="cf-msg">How can we help?</label>
          <textarea className="field-textarea" id="cf-msg" placeholder="Tell us about the property and your situation…" />
        </div>
        <button type="submit" className="cta cta--secondary" style={{ alignSelf: "flex-start" }}>Send message</button>
      </form>
    </div>
  </div>
);
