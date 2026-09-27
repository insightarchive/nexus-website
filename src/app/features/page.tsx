"use client";

import { useLang } from "@/components/LanguageProvider";
import { FeatureGroupSection } from "@/components/FeatureGroupSection";
import { featureGroups } from "@/content/features";

export default function FeaturesPage() {
  const { lang } = useLang();

  return (
    <div className="section">
      <div className="container">
        <span className="eyebrow">{lang === "en" ? "Features" : "ফিচার"}</span>
        <h1 className="section-title">
          {lang === "en" ? "Everything that's actually built." : "যা সত্যিই বানানো হয়েছে।"}
        </h1>
        <p className="section-subtitle">
          {lang === "en"
            ? "This page only lists tools that are built and verified in the real app today. Nothing here is a roadmap promise — when something new ships, it gets added here, not before."
            : "এই পেজে শুধু সেই টুলগুলোই আছে যা আসলেই আজকের অ্যাপে বানানো ও যাচাই করা হয়েছে। এখানে কোনো ভবিষ্যতের প্রতিশ্রুতি নেই — নতুন কিছু চালু হলে তখনই এখানে যোগ হবে, তার আগে না।"}
        </p>

        <div className="groups-stack" style={{ marginTop: 48 }}>
          {featureGroups.map((group) => (
            <div id={group.id} key={group.id} style={{ scrollMarginTop: 90 }}>
              <FeatureGroupSection group={group} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
