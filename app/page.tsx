// Phase 1 stub landing — becomes the showcase landing in Phase 7.
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
        AGMB Design System
      </h1>
      <p className="opacity-70 max-w-md" style={{ fontFamily: "var(--font-inter)" }}>
        Rebuilding from the live website. Tokens, primitives and sections land shortly.
      </p>
    </main>
  );
}
