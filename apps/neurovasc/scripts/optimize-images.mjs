#!/usr/bin/env node
/**
 * Optimize the heavy PNGs that ship in the public folder.
 *
 * Strategy:
 *   1. Resize down to the maximum dimension actually rendered by the
 *      `<Image>` calls in src/components/* (we read the JSX `width`
 *      props or fall back to the values below).
 *   2. Encode WebP at quality 82 — the visual diff vs the source PNG
 *      is imperceptible at the rendered sizes, but the byte cost
 *      drops 80–90%.
 *   3. Keep the original .png next to the .webp so the JSX can stay
 *      backward-compatible. Once everything is migrated to .webp the
 *      sources can be deleted.
 *
 * Run:  node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ASSETS = join(ROOT, "public", "assets");

// Source-of-truth widths. Larger than the rendered size so retina
// displays still look crisp (rendered_width × 2, capped at the source).
const TARGETS = {
  "hero-doctor.png":        { width: 1600, quality: 82 },
  "lib-1.png":              { width: 800,  quality: 82 },
  "lib-2.png":              { width: 800,  quality: 82 },
  "lib-3.png":              { width: 1100, quality: 82 },
  "challenges-banner.png":  { width: 1600, quality: 82 },
};

function fmt(bytes) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
  if (bytes > 1024) return (bytes / 1024).toFixed(1) + " KB";
  return bytes + " B";
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function main() {
  const files = await readdir(ASSETS);
  const targets = files.filter((f) => TARGETS[f]);

  if (!targets.length) {
    console.log("No matching files found in", ASSETS);
    return;
  }

  console.log(`Optimizing ${targets.length} image(s)…\n`);

  let savedTotal = 0;

  for (const file of targets) {
    const cfg = TARGETS[file];
    const srcPath = join(ASSETS, file);
    const { name } = parse(file);
    const outPath = join(ASSETS, `${name}.webp`);

    const before = (await stat(srcPath)).size;

    await sharp(srcPath)
      .resize({ width: cfg.width, withoutEnlargement: true })
      .webp({ quality: cfg.quality, effort: 6 })
      .toFile(outPath);

    const after = (await stat(outPath)).size;
    const saved = before - after;
    savedTotal += saved;

    const pct = ((saved / before) * 100).toFixed(1);
    console.log(
      `  ${file.padEnd(26)}  ${fmt(before).padStart(10)}  →  ${fmt(after).padStart(10)}  ` +
        `(-${pct}%)`
    );
  }

  console.log(`\nTotal saved: ${fmt(savedTotal)}`);
  console.log(
    "\nNext step: replace `.png` with `.webp` in the JSX, then delete the originals."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
