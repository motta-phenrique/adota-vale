// Renomeia as pastas -slug- para [slug]. Rode UMA vez apos descompactar o zip:
//   node scripts/fix-dynamic-routes.mjs
import { rename, readdir } from "node:fs/promises";
import { join } from "node:path";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    await walk(full);
    const match = entry.name.match(/^-(.+)-$/);
    if (match) {
      const target = join(dir, "[" + match[1] + "]");
      await rename(full, target);
      console.log("renomeado:", full, "->", target);
    }
  }
}

await walk("app");
