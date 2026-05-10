// Minimal classname merger — joins truthy strings with spaces.
// Avoids adding clsx + tailwind-merge as deps for Day 1; if conflicting Tailwind
// utility precedence becomes a problem during Day 2/3, we add tailwind-merge then.
//
// Accepts strings, falsy values, and nested arrays — call sites can pass
// `[varA, varB]` for grouped conditional classes without manual flattening.
type ClassInput = string | false | null | undefined | ClassInput[];

export function cn(...args: ClassInput[]): string {
  const parts: string[] = [];
  const walk = (input: ClassInput) => {
    if (!input) return;
    if (Array.isArray(input)) input.forEach(walk);
    else if (typeof input === "string") parts.push(input);
  };
  args.forEach(walk);
  return parts.join(" ");
}
