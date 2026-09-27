"use client";

import { useLang } from "@/components/LanguageProvider";
import { ContactForm } from "@/components/ContactForm";
import { about } from "@/content/site";

export default function AboutPage() {
  const { lang } = useLang();
  const t = about[lang];

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48 }} className="hero-grid">
          <div>
            <span className="eyebrow">{t.eyebrow}</span>
            <h1 className="section-title">{t.title}</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
              {t.body.map((p) => (
                <p key={p} className="section-subtitle" style={{ maxWidth: "60ch" }}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: 20, marginBottom: 6 }}>{t.contactTitle}</h2>
            <p style={{ color: "var(--nx-text-muted)", fontSize: 14, marginBottom: 18 }}>{t.contactBody}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
