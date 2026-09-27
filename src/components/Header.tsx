"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { nav } from "@/content/site";

const links = [
  { href: "/features", key: "features" as const },
  { href: "/changelog", key: "changelog" as const },
  { href: "/faq", key: "faq" as const },
  { href: "/about", key: "about" as const },
];

export function Header() {
  const { lang, setLang } = useLang();
  const t = nav[lang];
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="NEXUS" width={30} height={30} />
          NEXUS
        </Link>

        <nav className="main-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {t[l.key]}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button data-active={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
            <button data-active={lang === "bn"} onClick={() => setLang("bn")}>
              বাংলা
            </button>
          </div>
          <Link href="/#waitlist" className="btn btn-primary">
            {t.cta}
          </Link>
          <button
            className="mobile-menu-btn"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className="container">
        <div className="mobile-nav" data-open={open}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {t[l.key]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
