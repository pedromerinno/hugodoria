#!/usr/bin/env node
// Figma REST API fetch helper.
// Usage:
//   node scripts/figma-fetch.mjs node <fileKey> <nodeId>
//   node scripts/figma-fetch.mjs image <fileKey> <nodeId> [scale]
//
// Reads the Personal Access Token from ~/.config/figma-token so it's
// never committed. Falls back to FIGMA_TOKEN env var.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const TOKEN_PATH = join(homedir(), ".config", "figma-token");

function loadToken() {
  if (process.env.FIGMA_TOKEN) return process.env.FIGMA_TOKEN.trim();
  try {
    return readFileSync(TOKEN_PATH, "utf8").trim();
  } catch {
    throw new Error(
      `No token found. Set FIGMA_TOKEN env var or write to ${TOKEN_PATH}.`
    );
  }
}

async function api(path) {
  const token = loadToken();
  const res = await fetch(`https://api.figma.com${path}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) {
    throw new Error(`Figma API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function cmdNode(fileKey, nodeId) {
  const normalized = nodeId.replace("-", ":");
  const data = await api(
    `/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(normalized)}`
  );
  console.log(JSON.stringify(data, null, 2));
}

async function cmdImage(fileKey, nodeId, scale = "2") {
  const normalized = nodeId.replace("-", ":");
  const data = await api(
    `/v1/images/${fileKey}?ids=${encodeURIComponent(normalized)}&format=png&scale=${scale}`
  );
  const url = data.images?.[normalized];
  if (!url) throw new Error("No image URL returned");

  const imgRes = await fetch(url);
  if (!imgRes.ok) throw new Error(`Image download ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());

  const outDir = resolve("src/assets");
  mkdirSync(outDir, { recursive: true });
  const safe = normalized.replace(":", "-");
  const out = join(outDir, `figma-${safe}.png`);
  writeFileSync(out, buf);
  console.log(out);
}

const [, , cmd, fileKey, nodeId, extra] = process.argv;

if (!cmd || !fileKey || !nodeId) {
  console.error("Usage: figma-fetch.mjs <node|image> <fileKey> <nodeId> [scale]");
  process.exit(1);
}

const dispatch = {
  node: () => cmdNode(fileKey, nodeId),
  image: () => cmdImage(fileKey, nodeId, extra),
};

const run = dispatch[cmd];
if (!run) {
  console.error(`Unknown command: ${cmd}`);
  process.exit(1);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
