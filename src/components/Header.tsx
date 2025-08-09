import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LanguageSwitch from "@/components/LanguageSwitch";

const links = [
  { to: "/solutions", label: "Product" },
  { to: "/frameworks", label: "Frameworks" },
  { to: "/misconfig", label: "Library" },
  { to: "/remediation", label: "Remediation" },
  { to: "/roi-calculator", label: "ROI" },
  { to: "/github-app", label: "GitHub App" },
  { to: "/trust", label: "Trust" },
  { to: "/pricing", label: "Pricing" },
  { to: "/demo", label: "Demo" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={
        "fixed inset-x-0 top-0 z-40 transition backdrop-blur supports-[backdrop-filter]:bg-black/30 " +
        (scrolled ? "border-b border-white/10" : "")
      }
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="" className="h-6 w-6" />
          <span className="font-semibold tracking-tight">VerteidIQ</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                "text-sm hover:underline underline-offset-4 " +
                (isActive
                  ? "text-[var(--text)] font-medium"
                  : "text-[var(--muted)]")
              }
              onClick={() =>
                (window as any).trackEvent?.("nav_click", { to: l.to })
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="/demo"
            className="ml-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-black text-sm font-semibold px-3 py-1.5 rounded"
          >
            Get a demo
          </a>
          <LanguageSwitch />
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded border border-white/10"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0 z-50"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 right-0 h-dvh w-[84%] max-w-sm bg-[var(--bg)] shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between h-12">
              <span className="font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="h-9 w-9 inline-flex items-center justify-center rounded border border-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeWidth="2" d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-3 grid gap-1">
              {links.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  className="px-3 py-2 rounded hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/demo"
                className="mt-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-black font-semibold px-3 py-2 rounded text-center"
              >
                Get a demo
              </a>
              <div className="mt-3">
                <LanguageSwitch full />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}