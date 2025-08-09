export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 bg-[var(--brand)] text-black px-4 py-2 rounded font-semibold"
    >
      Skip to content
    </a>
  );
}