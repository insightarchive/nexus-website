"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { faqItems } from "@/content/faq";

export default function FaqPage() {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <span className="eyebrow">{lang === "en" ? "FAQ" : "প্রশ্নোত্তর"}</span>
        <h1 className="section-title">
          {lang === "en" ? "Questions people actually ask." : "মানুষ আসলেই যা জিজ্ঞেস করে।"}
        </h1>

        <div style={{ marginTop: 32 }}>
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div className="faq-item" key={item.question.en}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  {item.question[lang]}
                  <ChevronDown
                    size={18}
                    style={{
                      flexShrink: 0,
                      transform: open ? "rotate(180deg)" : "none",
                      transition: "transform 150ms ease",
                      color: "var(--nx-text-faint)",
                    }}
                  />
                </button>
                {open && <p className="faq-answer">{item.answer[lang]}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
