import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text)]">
      <SkipLink />
      <Header />
      <main id="main" className="container mx-auto px-4 pt-20 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}