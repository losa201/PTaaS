export default function Footer() {
  return (
    <footer role="contentinfo" className="mt-12 border-t border-white/10">
      <div className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-4">
        <div>
          <div className="font-semibold">VerteidIQ</div>
          <p className="text-sm text-[var(--muted)] mt-2">
            Autonomous PTaaS to stop breaches before they happen.
          </p>
          <a
            href="/demo"
            className="inline-block mt-3 px-3 py-2 rounded bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-black font-semibold"
          >
            Get a demo
          </a>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Product</div>
          <ul className="space-y-1 text-sm">
            <li>
              <a className="hover:underline" href="/solutions">
                Solutions
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/frameworks">
                Frameworks
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/misconfig">
                Library
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/remediation">
                Remediation
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Resources</div>
          <ul className="space-y-1 text-sm">
            <li>
              <a className="hover:underline" href="/roi-calculator">
                ROI Calculator
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/github-app">
                GitHub App
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/trust">
                Trust
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/pricing">
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Company</div>
          <ul className="space-y-1 text-sm">
            <li>
              <a className="hover:underline" href="/terms">
                Terms
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/privacy">
                Privacy
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 text-xs text-[var(--muted)] flex items-center justify-between">
          <span>© {new Date().getFullYear()} VerteidIQ</span>
          <span>Made for security teams</span>
        </div>
      </div>
    </footer>
  );
}