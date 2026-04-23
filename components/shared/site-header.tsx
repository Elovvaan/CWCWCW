import Link from "next/link";
import { ministryName, navLinks } from "@/lib/data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-blush/60 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="max-w-[240px] text-sm font-semibold text-sage sm:text-base">{ministryName}</Link>
        <nav className="hidden gap-4 text-sm md:flex">
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-sage">{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
