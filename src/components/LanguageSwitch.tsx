type Props = { full?: boolean };

export default function LanguageSwitch({ full }: Props) {
  const hrefFor = (domain: "com" | "de") => {
    try {
      const u = new URL(window.location.href);
      u.hostname = domain === "de" ? "verteidiq.de" : "verteidiq.com";
      return u.toString();
    } catch {
      return domain === "de" ? "https://verteidiq.de" : "https://verteidiq.com";
    }
  };

  if (full) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <a className="underline-offset-4 hover:underline" href={hrefFor("com")}>
          EN
        </a>
        <span className="opacity-50">/</span>
        <a className="underline-offset-4 hover:underline" href={hrefFor("de")}>
          DE
        </a>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-2 text-sm">
      <a
        className="text-[var(--muted)] hover:underline underline-offset-4"
        href={hrefFor("com")}
        aria-label="English"
      >
        EN
      </a>
      <span className="opacity-40">/</span>
      <a
        className="text-[var(--muted)] hover:underline underline-offset-4"
        href={hrefFor("de")}
        aria-label="Deutsch"
      >
        DE
      </a>
    </div>
  );
}