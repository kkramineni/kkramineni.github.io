// Copies the Pagefind bundle from the scratch build into public/, where the
// running `hugo server` picks it up.
//
// Why not just build into public/ directly? `hugo server` renders to memory
// and only falls back to files on disk for paths its own build does not
// produce. /pagefind/ is produced by the Pagefind CLI, not by Hugo, so it has
// to exist on disk - but rewriting all of public/ under a live server is
// asking for trouble. This touches only the pagefind/ directory.
//
// Run via: npm run search

import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, ".search-index", "pagefind");
const dest = join(root, "public", "pagefind");

if (!existsSync(src)) {
  console.error(`No index at ${src}. Run: hugo --gc --minify --destination .search-index && pagefind --site .search-index`);
  process.exit(1);
}

await rm(dest, { recursive: true, force: true });
await mkdir(dirname(dest), { recursive: true });
await cp(src, dest, { recursive: true });
console.log(`Copied ${src} -> ${dest}`);
console.log("Search should now work at /search/. Hard-reload the browser.");