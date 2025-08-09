import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SkipLink />
      <Header />
      <main id="main" className="container mx-auto px-4 pt-20 pb-12 relative">
        <div className="absolute inset-0 cyber-mesh pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}