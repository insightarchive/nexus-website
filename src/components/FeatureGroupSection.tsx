"use client";

import { useLang } from "./LanguageProvider";
import { DynamicIcon } from "./DynamicIcon";
import type { FeatureGroup } from "@/content/features";

export function FeatureGroupSection({ group }: { group: FeatureGroup }) {
  const { lang } = useLang();

  return (
    <div>
      <div className="group-header">
        <div className="group-icon">
          <DynamicIcon name={group.icon} size={22} strokeWidth={2} />
        </div>
        <h3>{group.title[lang]}</h3>
      </div>
      <p className="group-description">{group.description[lang]}</p>
      <div className="feature-grid">
        {group.items.map((item) => (
          <div className="feature-card" key={item.name.en}>
            <h4>{item.name[lang]}</h4>
            <p>{item.description[lang]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
