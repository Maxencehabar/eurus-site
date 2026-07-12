// Vérifie que chaque asset "ready" du registre a un fichier src existant
// dans public/ et des dimensions conformes au registre (tolérance ±5 %).
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/data/assets.ts"), "utf8");

const blocks = [...source.matchAll(/"([\w-]+)":\s*\{([\s\S]*?)\n  \}/g)];
const errors = [];
let readyCount = 0;

for (const [, id, body] of blocks) {
  const status = body.match(/status:\s*"(\w+)"/)?.[1];
  if (status !== "ready") continue;
  readyCount++;
  const src = body.match(/src:\s*"([^"]+)"/)?.[1];
  const width = Number(body.match(/width:\s*(\d+)/)?.[1]);
  const height = Number(body.match(/height:\s*(\d+)/)?.[1]);
  if (!src) { errors.push(`${id}: ready sans src`); continue; }
  const file = join(root, "public", src);
  if (!existsSync(file)) { errors.push(`${id}: fichier manquant ${src}`); continue; }
  try {
    const out = execSync(`sips -g pixelWidth -g pixelHeight "${file}"`, { encoding: "utf8" });
    const w = Number(out.match(/pixelWidth: (\d+)/)?.[1]);
    const h = Number(out.match(/pixelHeight: (\d+)/)?.[1]);
    const okW = Math.abs(w - width) / width <= 0.05;
    const okH = Math.abs(h - height) / height <= 0.05;
    if (!okW || !okH) errors.push(`${id}: ${w}x${h} attendu ${width}x${height} (±5%)`);
  } catch {
    errors.push(`${id}: dimensions illisibles pour ${src}`);
  }
}

if (errors.length) {
  console.log(`ERREURS (${errors.length}) sur ${readyCount} ready:`);
  errors.forEach((e) => console.log(" -", e));
  process.exit(1);
}
console.log(`ALL OK (${readyCount} assets ready vérifiés)`);
