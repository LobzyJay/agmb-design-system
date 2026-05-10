// app/page.tsx — full homepage removed 2026-05-09 PM per Adewale.
// The deliverable is the design system; redirect / to /design.
import { redirect } from "next/navigation";
export default function HomePage() { redirect("/design"); }
