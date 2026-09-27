"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { footer, nav } from "@/content/site";

export function Footer() {
  const { lang } = useLang();
  const t = footer[lang];
  const n = nav[lang];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="brand" style={{ marginBottom: 8 }}>
              NEXUS
            </div>
            <p style={{ color: "var(--nx-text-muted)", fontSize: 14, maxWidth: "36ch" }}>
              {t.tagline}
            </p>
          </div>

          <nav className="footer-nav">
            <Link href="/features">{n.features}</Link>
            <Link href="/changelog">{n.changelog}</Link>
            <Link href="/faq">{n.faq}</Link>
            <Link href="/about">{t.contact}</Link>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} NEXUS. {t.rights}
          </span>
          <span>{t.madeWith}</span>
        </div>
      </div>
    </footer>
  );
}
