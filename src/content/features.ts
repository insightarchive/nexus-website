export type FeatureItem = {
  name: { en: string; bn: string };
  description: { en: string; bn: string };
};

export type FeatureGroup = {
  id: string;
  icon: string; // lucide icon name
  title: { en: string; bn: string };
  description: { en: string; bn: string };
  items: FeatureItem[];
};

// Every item below is a feature that has actually been built and verified in
// the real app (see the project's own progress log). Anything still in
// development (like Voice Control or the Automation Studio workflow canvas)
// is deliberately left out until it's real, per the project's own rule:
// never advertise something that hasn't been built yet.
export const featureGroups: FeatureGroup[] = [
  {
    id: "system",
    icon: "monitor-cog",
    title: { en: "System", bn: "সিস্টেম" },
    description: {
      en: "Everything you'd normally bounce between five different apps for — monitoring, cleanup, protection, storage, and updates — in one place.",
      bn: "যেসব কাজে সাধারণত ৫টা আলাদা অ্যাপ খুলতে হয় — মনিটরিং, ক্লিনআপ, প্রোটেকশন, স্টোরেজ, আপডেট — সব একটা জায়গায়।",
    },
    items: [
      {
        name: { en: "System Monitor", bn: "সিস্টেম মনিটর" },
        description: {
          en: "Live CPU, RAM, network, and per-drive storage graphs that update every second.",
          bn: "প্রতি সেকেন্ডে আপডেট হওয়া CPU, RAM, নেটওয়ার্ক ও প্রতি-ড্রাইভ স্টোরেজ গ্রাফ।",
        },
      },
      {
        name: { en: "Cleanup suite", bn: "ক্লিনআপ স্যুট" },
        description: {
          en: "System Cleaner, Registry & System, Startup Manager, Network Cleanup, Context Menu Cleaner, and Empty Folder Cleaner — six focused tools.",
          bn: "System Cleaner, Registry & System, Startup Manager, Network Cleanup, Context Menu Cleaner, Empty Folder Cleaner — ছয়টা আলাদা টুল।",
        },
      },
      {
        name: { en: "Protection suite", bn: "প্রোটেকশন স্যুট" },
        description: {
          en: "Malware Scanner (YARA-compatible engine + VirusTotal lookups), Snoop Blocker for privacy settings, Network Watch, Firewall Audit, Weak Spot Finder, and Leak Check.",
          bn: "Malware Scanner (YARA-সামঞ্জস্যপূর্ণ ইঞ্জিন + VirusTotal), প্রাইভেসি সেটিংসের জন্য Snoop Blocker, Network Watch, Firewall Audit, Weak Spot Finder, আর Leak Check।",
        },
      },
      {
        name: { en: "Storage suite", bn: "স্টোরেজ স্যুট" },
        description: {
          en: "Disk Analyzer, Large File Finder, Duplicate Finder, Storage History, Disk Maintenance, and a secure File Shredder.",
          bn: "Disk Analyzer, Large File Finder, Duplicate Finder, Storage History, Disk Maintenance, আর নিরাপদ File Shredder।",
        },
      },
      {
        name: { en: "Update Engine", bn: "আপডেট ইঞ্জিন" },
        description: {
          en: "One place that knows which of your installed apps have updates available, powered by winget.",
          bn: "আপনার ইনস্টল-করা কোন অ্যাপের আপডেট আছে, তা এক জায়গায় — winget দিয়ে চালিত।",
        },
      },
    ],
  },
  {
    id: "productivity",
    icon: "zap",
    title: { en: "Productivity", bn: "প্রোডাক্টিভিটি" },
    description: {
      en: "The tools you reach for dozens of times a day, redesigned to be instant.",
      bn: "যেসব টুল দিনে বহুবার লাগে, সেগুলোকেই একদম দ্রুতগতির করে বানানো হয়েছে।",
    },
    items: [
      {
        name: { en: "Command Palette", bn: "কমান্ড প্যালেট" },
        description: {
          en: "335+ built-in commands, instant global search across the web and your apps, custom macros, and saved workspaces — one hotkey away.",
          bn: "৩৩৫+ বিল্ট-ইন কমান্ড, ওয়েব ও নিজের অ্যাপ জুড়ে instant global search, custom macro, আর সেভ-করা workspace — একটা hotkey-তেই।",
        },
      },
      {
        name: { en: "Clipboard & Snippets", bn: "ক্লিপবোর্ড ও স্নিপেট" },
        description: {
          en: "A full clipboard history plus a Group Clipboard for collecting several items before pasting them all at once.",
          bn: "সম্পূর্ণ ক্লিপবোর্ড হিস্ট্রি, আর Group Clipboard দিয়ে অনেকগুলো জিনিস জমিয়ে একসাথে পেস্ট করার সুবিধা।",
        },
      },
      {
        name: { en: "App Launcher & Workspaces", bn: "অ্যাপ লঞ্চার ও ওয়ার্কস্পেস" },
        description: {
          en: "Group the apps and folders for a project into one workspace and launch all of them together.",
          bn: "একটা কাজের সব অ্যাপ/ফোল্ডার একটা workspace-এ জড়ো করে একসাথে চালু করুন।",
        },
      },
      {
        name: { en: "Focus Timer", bn: "ফোকাস টাইমার" },
        description: {
          en: "A distraction-tracking focus timer built right into the same app you're already using.",
          bn: "যে অ্যাপ এমনিতেই ব্যবহার করছেন, তার ভেতরেই মনোযোগ-ট্র্যাক করা ফোকাস টাইমার।",
        },
      },
    ],
  },
  {
    id: "automation",
    icon: "workflow",
    title: { en: "Automation", bn: "অটোমেশন" },
    description: {
      en: "Batch work that used to take an afternoon, done in the background while you do something else.",
      bn: "যে কাজ একটা বিকেল লাগিয়ে করতেন, সেটা এখন ব্যাকগ্রাউন্ডে হয়ে যাবে, আপনি অন্য কাজ করার ফাঁকে।",
    },
    items: [
      {
        name: { en: "File & Folder Automation", bn: "ফাইল ও ফোল্ডার অটোমেশন" },
        description: {
          en: "Organizer, Batch Rename, Move/Copy, Convert, Compress/Extract, Watch Folder, and Scaffold — eight tools with pause, resume, and cancel on every job.",
          bn: "Organizer, Batch Rename, Move/Copy, Convert, Compress/Extract, Watch Folder, Scaffold — আটটা টুল, প্রতিটাতেই pause/resume/cancel।",
        },
      },
      {
        name: { en: "Image Automation", bn: "ইমেজ অটোমেশন" },
        description: {
          en: "Bulk download, background removal, resize, convert, compress, watermark, and color adjustment across whole folders at once.",
          bn: "Bulk download, background removal, resize, convert, compress, watermark, color adjustment — পুরো ফোল্ডার একসাথে।",
        },
      },
      {
        name: { en: "Video Automation", bn: "ভিডিও অটোমেশন" },
        description: {
          en: "FFmpeg-powered convert, compress, audio/frame extraction, and a custom command mode for anything else.",
          bn: "FFmpeg-চালিত convert, compress, audio/frame extraction, আর বাকি সব কাজের জন্য custom command mode।",
        },
      },
      {
        name: { en: "Browser Automation", bn: "ব্রাউজার অটোমেশন" },
        description: {
          en: "A visual Task Builder, a Data Scraper that exports to CSV/Excel/PDF, a Page Watcher that alerts you on changes, and an Account Manager with an encrypted vault.",
          bn: "ভিজ্যুয়াল Task Builder, CSV/Excel/PDF-এ export করা Data Scraper, বদল হলে জানানো Page Watcher, আর এনক্রিপ্টেড vault-সহ Account Manager।",
        },
      },
      {
        name: { en: "AI Automation", bn: "AI অটোমেশন" },
        description: {
          en: "Bulk AI image generation across five providers is live today, with more AI-powered tools shipping regularly.",
          bn: "৫টা provider জুড়ে bulk AI image generation এখনই কাজ করছে, আরও AI টুল নিয়মিত যোগ হচ্ছে।",
        },
      },
    ],
  },
  {
    id: "capture",
    icon: "camera",
    title: { en: "Capture", bn: "ক্যাপচার" },
    description: {
      en: "Screenshots and screen recording that go straight into an organized, searchable history.",
      bn: "স্ক্রিনশট আর স্ক্রিন রেকর্ডিং, সাথে সাজানো ও সার্চ-যোগ্য হিস্ট্রি।",
    },
    items: [
      {
        name: { en: "Screenshot Center", bn: "স্ক্রিনশট সেন্টার" },
        description: {
          en: "Seven capture modes, a live window picker, and a searchable history with built-in OCR and translation.",
          bn: "সাতটা capture মোড, লাইভ window picker, আর built-in OCR ও translation-সহ সার্চ-যোগ্য হিস্ট্রি।",
        },
      },
      {
        name: { en: "Circle to Search", bn: "সার্কেল টু সার্চ" },
        description: {
          en: "Circle anything on your screen to search or copy it instantly, with automatic language detection.",
          bn: "স্ক্রিনের যেকোনো কিছু চিহ্নিত করে সাথে সাথে search বা copy করুন, ভাষা নিজে থেকেই শনাক্ত হয়।",
        },
      },
    ],
  },
];
