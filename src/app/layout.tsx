import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS — One native app for your whole PC",
  description:
    "NEXUS bundles system cleanup, security, automation, and productivity tools into a single fast, native Windows app. Join the early access waitlist.",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-256.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
