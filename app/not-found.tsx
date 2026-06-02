import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center" style={{ fontFamily: "var(--font-inter)" }}>
      <p className="text-sm uppercase tracking-[0.18em] opacity-60">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <Link href="/" className="underline underline-offset-4 opacity-80 hover:opacity-100">
        Back to home
      </Link>
    </main>
  );
}
