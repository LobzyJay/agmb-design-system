"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Summary — Wise primitive (PRD §4.5 + §5.3 wizard step 5).
// Read-only data summary grouped by previous wizard steps, with an "Edit"
// link per row that returns the user to that step in the same session.
//
// Anatomy:
//   ┌───────────────────────────────────────────────────────┐
//   │ ABOUT YOU                                  [Edit]     │  ← group header (eyebrow + edit jump)
//   │ Full name        Adaeze Okafor                        │
//   │ Date of birth    14 May 1992                          │
//   │ BVN              ••• 4321                             │
//   ├───────────────────────────────────────────────────────┤
//   │ EMPLOYMENT                                 [Edit]     │
//   │ ...                                                   │
//   └───────────────────────────────────────────────────────┘

export interface SummaryRow {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Optional override for `value` — useful for redacted data ("••• 4321"). */
  display?: React.ReactNode;
}

export interface SummaryGroup {
  /** Step ID — passed to `onEdit` so the wizard can route back. */
  id: string;
  title: React.ReactNode;
  rows: SummaryRow[];
}

export interface SummaryProps {
  groups: SummaryGroup[];
  /** Fired when the user clicks "Edit" on a group. Receives the group's `id`. */
  onEdit?: (groupId: string) => void;
  className?: string;
}

export const Summary: React.FC<SummaryProps> = ({ groups, onEdit, className }) => (
  <dl
    className={cn(
      "bg-ag-white border border-ag-border rounded-lg overflow-hidden divide-y divide-ag-border",
      className,
    )}
  >
    {groups.map((group) => (
      <section key={group.id} className="p-5">
        <header className="flex items-baseline justify-between mb-3">
          <p className="eyebrow !text-ag-navy">{group.title}</p>
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(group.id)}
              className="text-sm text-ag-navy underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2 rounded"
            >
              Edit
            </button>
          )}
        </header>
        <div className="grid grid-cols-[max-content,1fr] gap-x-6 gap-y-2 text-sm">
          {group.rows.map((row, i) => (
            <React.Fragment key={i}>
              <dt className="text-ag-muted">{row.label}</dt>
              <dd className="text-ag-text">{row.display ?? row.value}</dd>
            </React.Fragment>
          ))}
        </div>
      </section>
    ))}
  </dl>
);
Summary.displayName = "Summary";
