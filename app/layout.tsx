import type { Metadata } from "next";
import { Manrope } from "next/font/google"; // Using Manrope as primary
import "./globals.css";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { SiteNav } from "@/components/nav/SiteNav"; // Import Nav
import { Footer } from "@/components/sections/Footer"; // Import Footer

const fontSans = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.domain,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

import { SmoothScroll } from "@/components/providers/SmoothScroll";

// ... existing code ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-accent-foreground",
        fontSans.variable
      )} suppressHydrationWarning>
        <SmoothScroll>
          <SiteNav />
          <main className="flex-1 min-h-screen flex flex-col">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
