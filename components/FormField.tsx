import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB FormField — label + control + optional helper/error, from the apply/contact
// forms. Surface-aware (cream form panel by default).

export interface FormFieldProps {
  label: React.ReactNode;
  htmlFor?: string;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  children: React.ReactNode;
  surface?: "cream" | "navy";
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, htmlFor, helper, error, children, surface = "cream", className }) => {
  const onCream = surface === "cream";
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className={cn("text-[13px] font-medium", onCream ? "text-text-on-cream" : "text-text-on-navy")}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </label>
      {children}
      {error ? (
        <span className="text-xs text-red-600" style={{ fontFamily: "var(--font-sans)" }}>{error}</span>
      ) : helper ? (
        <span className={cn("text-xs", onCream ? "text-text-muted-on-cream" : "text-text-muted-on-navy")} style={{ fontFamily: "var(--font-sans)" }}>
          {helper}
        </span>
      ) : null}
    </div>
  );
};
