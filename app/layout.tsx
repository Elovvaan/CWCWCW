import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";

export const metadata: Metadata = {
  title: "Christian Women Connecting with Other Women Network",
  description: "Faith-centered women’s ministry for prayer, mentorship, outreach, and The Upper Room gatherings."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
