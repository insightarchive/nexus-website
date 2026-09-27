export type ChangelogEntry = {
  date: string; // ISO date, real build dates from the project's own progress log
  title: { en: string; bn: string };
  body: { en: string; bn: string };
};

// This is a development log, not a version-release history — NEXUS hasn't
// had a public release yet. Entries are real, dated milestones pulled from
// the project's internal (verified-only) progress notes, written for a
// general audience instead of a technical changelog.
export const changelogEntries: ChangelogEntry[] = [
  {
    date: "2026-09-27",
    title: {
      en: "First AI-powered automation tool",
      bn: "প্রথম AI-চালিত অটোমেশন টুল",
    },
    body: {
      en: "Bulk AI image generation shipped, working across five different AI providers. Automation History now tracks every automation job in one place, across all 24 tools.",
      bn: "Bulk AI image generation চালু হলো, ৫টা ভিন্ন AI provider-এ কাজ করে। Automation History এখন সব ২৪টা টুলের প্রতিটা automation job এক জায়গায় দেখায়।",
    },
  },
  {
    date: "2026-09-26",
    title: {
      en: "Browser automation, complete",
      bn: "ব্রাউজার অটোমেশন সম্পূর্ণ",
    },
    body: {
      en: "A visual Task Builder, a Data Scraper (exports to CSV/Excel/PDF), a Page Watcher that logs every change, Browser Profiles, and an Account Manager with an encrypted vault — all shipped and verified this week.",
      bn: "ভিজ্যুয়াল Task Builder, Data Scraper (CSV/Excel/PDF export), প্রতিটা বদল লগ করা Page Watcher, Browser Profiles, আর এনক্রিপ্টেড vault-সহ Account Manager — এই সপ্তাহেই সব বানানো ও যাচাই হয়েছে।",
    },
  },
  {
    date: "2026-09-25",
    title: {
      en: "Command Palette redesign is live",
      bn: "কমান্ড প্যালেটের নতুন ডিজাইন চালু",
    },
    body: {
      en: "The redesigned Command Palette landed in the real app: 335+ commands, grouped views, custom macros built from a visual picker, and saved workspaces.",
      bn: "নতুন ডিজাইনের কমান্ড প্যালেট আসল অ্যাপে বসে গেছে: ৩৩৫+ কমান্ড, grouped view, ভিজ্যুয়াল picker দিয়ে বানানো custom macro, আর সেভ-করা workspace।",
    },
  },
  {
    date: "2026-09-22",
    title: {
      en: "Image & video automation suites shipped",
      bn: "ইমেজ ও ভিডিও অটোমেশন স্যুট চালু",
    },
    body: {
      en: "Bulk download, background removal, resize, convert, compress, watermarking for images; convert, compress, and audio/frame extraction for video — all running on your machine, no cloud round-trip required.",
      bn: "ছবির জন্য bulk download, background removal, resize, convert, compress, watermark; ভিডিওর জন্য convert, compress, audio/frame extraction — সব নিজের কম্পিউটারেই চলে, cloud-এ পাঠাতে হয় না।",
    },
  },
  {
    date: "2026-09-20",
    title: {
      en: "Protection & Storage suites complete",
      bn: "প্রোটেকশন ও স্টোরেজ স্যুট সম্পূর্ণ",
    },
    body: {
      en: "Malware Scanner, Snoop Blocker, Network Watch, Firewall Audit, Weak Spot Finder, and Leak Check joined a completed Storage suite (Disk Analyzer, Duplicate Finder, File Shredder, and more).",
      bn: "Malware Scanner, Snoop Blocker, Network Watch, Firewall Audit, Weak Spot Finder, Leak Check — এগুলো যুক্ত হলো সম্পূর্ণ Storage স্যুটের সাথে (Disk Analyzer, Duplicate Finder, File Shredder আরও অনেক কিছু)।",
    },
  },
];
