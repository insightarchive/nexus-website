export type FaqItem = {
  question: { en: string; bn: string };
  answer: { en: string; bn: string };
};

export const faqItems: FaqItem[] = [
  {
    question: {
      en: "What exactly is NEXUS?",
      bn: "NEXUS আসলে কী?",
    },
    answer: {
      en: "NEXUS is a native Windows productivity suite that bundles system monitoring, cleanup, security, storage tools, automation, and productivity utilities (clipboard, launcher, command palette) into one fast app — instead of a dozen separate downloads.",
      bn: "NEXUS একটা নেটিভ Windows প্রোডাক্টিভিটি সুইট — সিস্টেম মনিটরিং, ক্লিনআপ, সিকিউরিটি, স্টোরেজ টুল, অটোমেশন আর প্রোডাক্টিভিটি (ক্লিপবোর্ড, লঞ্চার, কমান্ড প্যালেট) সব একটা দ্রুতগতির অ্যাপে — আলাদা আলাদা ডজনখানেক অ্যাপের বদলে।",
    },
  },
  {
    question: {
      en: "When can I download it?",
      bn: "কবে ডাউনলোড করতে পারবো?",
    },
    answer: {
      en: "NEXUS is still being built — there's no public download yet, and we'd rather ship something solid than rush a broken installer out. Join the waitlist above and you'll get one email the moment Windows early access opens. No spam, no other emails before that.",
      bn: "NEXUS এখনো বানানো হচ্ছে — এখনো কোনো পাবলিক ডাউনলোড নেই, তাড়াহুড়ো করে ভাঙা installer দেওয়ার চেয়ে ঠিকভাবে তৈরি করে দেওয়াটাই ভালো মনে করি। উপরের waitlist-এ যোগ দিন, Windows early access খোলার সাথে সাথে একটা ইমেইল পাবেন। এর আগে কোনো স্প্যাম বা অন্য ইমেইল যাবে না।",
    },
  },
  {
    question: {
      en: "Which operating systems will be supported?",
      bn: "কোন কোন অপারেটিং সিস্টেমে চলবে?",
    },
    answer: {
      en: "Windows 10/11 is the primary target and is where all real functionality is being built and tested first. macOS and Linux support is planned but not built yet — we won't claim it's ready before it actually is.",
      bn: "Windows 10/11-ই মূল লক্ষ্য, সব real ফিচার আগে এখানেই বানানো ও যাচাই হচ্ছে। macOS আর Linux পরিকল্পনায় আছে, কিন্তু এখনো বানানো হয়নি — আসলে রেডি হওয়ার আগে সেটা দাবি করবো না।",
    },
  },
  {
    question: {
      en: "Will NEXUS be free?",
      bn: "NEXUS কি ফ্রি হবে?",
    },
    answer: {
      en: "Pricing hasn't been finalized yet. We'll announce it clearly before public launch — whatever it is, it won't be a surprise.",
      bn: "দাম এখনো ঠিক করা হয়নি। লঞ্চের আগে স্পষ্ট করে জানানো হবে — যা-ই হোক, হঠাৎ চমকে দেওয়া হবে না।",
    },
  },
  {
    question: {
      en: "Does NEXUS send my data anywhere?",
      bn: "NEXUS কি আমার ডেটা কোথাও পাঠায়?",
    },
    answer: {
      en: "NEXUS is built local-first: your files, clipboard history, and system data stay on your machine. Some optional tools (like AI image generation or malware hash lookups) call out to a provider you explicitly connect a key for — nothing runs in the background without your say-so.",
      bn: "NEXUS local-first — আপনার ফাইল, ক্লিপবোর্ড হিস্ট্রি, সিস্টেম ডেটা নিজের কম্পিউটারেই থাকে। কিছু ঐচ্ছিক টুল (যেমন AI image generation বা malware hash lookup) আপনার নিজের দেওয়া key দিয়ে বাইরের provider-কে কল করে — আপনার অনুমতি ছাড়া কিছু ব্যাকগ্রাউন্ডে চলে না।",
    },
  },
  {
    question: {
      en: "How is this different from Electron-based PC utilities?",
      bn: "Electron-ভিত্তিক অন্য PC টুলের চেয়ে এটা আলাদা কীভাবে?",
    },
    answer: {
      en: "NEXUS is built with Tauri and Rust instead of Electron, which means a dramatically smaller install (tens of MB instead of 80–150 MB) and lower memory/CPU use at idle.",
      bn: "NEXUS বানানো হয়েছে Tauri আর Rust দিয়ে, Electron দিয়ে না — তাই install সাইজ অনেক ছোট (৮০–১৫০ MB-এর জায়গায় মাত্র কয়েক dozen MB) আর বসে থাকা অবস্থায় মেমোরি/CPU খরচও কম।",
    },
  },
  {
    question: {
      en: "I have a feature idea or found an issue — who do I tell?",
      bn: "আমার একটা ফিচার আইডিয়া আছে বা একটা সমস্যা পেয়েছি — কাকে জানাবো?",
    },
    answer: {
      en: "Use the contact form on the About page. A real person reads every message.",
      bn: "About পেজের contact ফর্ম ব্যবহার করুন। প্রতিটা মেসেজ একজন real মানুষ পড়ে।",
    },
  },
];
