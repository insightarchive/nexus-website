"use client";

import { useLang } from "@/components/LanguageProvider";
import { changelogEntries } from "@/content/changelog";

export default function ChangelogPage() {
  const { lang } = useLang();

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <span className="eyebrow">{lang === "en" ? "Changelog" : "চেঞ্জলগ"}</span>
        <h1 className="section-title">
          {lang === "en" ? "Built in the open." : "সবার সামনে বানানো হচ্ছে।"}
        </h1>
        <p className="section-subtitle">
          {lang === "en"
            ? "NEXUS hasn't had its public release yet, so think of this as a development log rather than version notes — real, dated progress on what's being built before launch."
            : "NEXUS-এর এখনো পাবলিক রিলিজ হয়নি, তাই এটাকে version note না ভেবে development log হিসেবে দেখুন — লঞ্চের আগে যা যা বানানো হচ্ছে তার real, তারিখ-সহ অগ্রগতি।"}
        </p>

        <div style={{ marginTop: 40 }}>
          {changelogEntries.map((entry) => (
            <div className="changelog-entry" key={entry.date + entry.title.en}>
              <div className="changelog-date">
                {new Date(entry.date).toLocaleDateString(lang === "en" ? "en-US" : "bn-BD", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div>
                <h3>{entry.title[lang]}</h3>
                <p>{entry.body[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
