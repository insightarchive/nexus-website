"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { WaitlistForm } from "@/components/WaitlistForm";
import { DynamicIcon } from "@/components/DynamicIcon";
import { hero } from "@/content/site";
import { featureGroups } from "@/content/features";

export default function HomePage() {
  const { lang } = useLang();
  const t = hero[lang];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge">
              <span className="badge-dot" />
              {t.badge}
            </span>
            <h1>{t.title}</h1>
            <p className="hero-subtitle">{t.subtitle}</p>

            <div className="hero-stats">
              <div>
                <div className="hero-stat-value">{t.stat1}</div>
                <div className="hero-stat-label">{t.stat1Label}</div>
              </div>
              <div>
                <div className="hero-stat-value">{t.stat2}</div>
                <div className="hero-stat-label">{t.stat2Label}</div>
              </div>
              <div>
                <div className="hero-stat-value">{t.stat3}</div>
                <div className="hero-stat-label">{t.stat3Label}</div>
              </div>
            </div>
          </div>

          <WaitlistForm source="hero" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">{lang === "en" ? "What's inside" : "ভেতরে যা যা আছে"}</span>
          <h2 className="section-title">
            {lang === "en" ? "Four groups, one native app." : "চারটা গ্রুপ, একটাই নেটিভ অ্যাপ।"}
          </h2>
          <p className="section-subtitle">
            {lang === "en"
              ? "Every item below is already built and verified in the real app — not a roadmap promise."
              : "নিচের প্রতিটা জিনিস ইতিমধ্যে আসল অ্যাপে বানানো ও যাচাই করা হয়েছে — শুধু পরিকল্পনা না।"}
          </p>

          <div className="feature-grid" style={{ marginTop: 32 }}>
            {featureGroups.map((group) => (
              <Link
                key={group.id}
                href={`/features#${group.id}`}
                className="feature-card"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div className="group-icon" style={{ marginBottom: 14 }}>
                  <DynamicIcon name={group.icon} size={20} />
                </div>
                <h4 style={{ fontSize: 17, marginBottom: 8 }}>{group.title[lang]}</h4>
                <p style={{ marginBottom: 14 }}>{group.description[lang]}</p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--nx-accent-hover)",
                  }}
                >
                  {lang === "en" ? "See what's included" : "কী কী আছে দেখুন"}
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="panel" style={{ textAlign: "center", padding: "48px 32px" }}>
            <h2 className="section-title" style={{ fontSize: 26 }}>
              {lang === "en" ? "Windows first. macOS and Linux planned." : "প্রথমে Windows। macOS ও Linux পরিকল্পনায় আছে।"}
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto 24px" }}>
              {lang === "en"
                ? "We're not shipping a half-working version to every platform at once. Windows gets the real, tested experience first."
                : "একসাথে সব প্ল্যাটফর্মে অর্ধেক-কাজ-করা ভার্সন দিচ্ছি না। Windows-এই প্রথমে আসল, পরীক্ষিত অভিজ্ঞতা আসবে।"}
            </p>
            <Link href="#waitlist" className="btn btn-primary">
              {t.formSubmit}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
