#!/usr/bin/env node
// Generates a bcrypt hash for ADMIN_PASSWORD_HASH.
// Usage: npm run hash-password -- "your-password-here"
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password -- "your-password-here"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

// Next.js's env loader expands `$name` in .env values (like shell variable
// substitution), which silently corrupts a raw bcrypt hash such as
// "$2a$12$...". Escaping every `$` as `\$` disables that expansion so the
// hash survives unchanged — this is the value that's actually safe to
// paste into .env, not the raw hash above.
const escaped = hash.replace(/\$/g, "\\$");

console.log("\nAdd this to your .env as ADMIN_PASSWORD_HASH:\n");
console.log(`ADMIN_PASSWORD_HASH="${escaped}"`);
console.log("");
