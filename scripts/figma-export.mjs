// Export Figma nodes as 2x PNGs into public/<dir>.
// Usage: FIGMA_TOKEN=... node scripts/figma-export.mjs <fileKey> <outDir> name=1:23 name2=1:45 ...
const [fileKey, outDir, ...pairs] = process.argv.slice(2);
const token = process.env.FIGMA_TOKEN;
if (!token || !fileKey || !outDir || pairs.length === 0) {
  console.error("Usage: FIGMA_TOKEN=... node scripts/figma-export.mjs <fileKey> <outDir> name=1:23 ...");
  process.exit(1);
}
const { mkdir, writeFile } = await import("node:fs/promises");
const assets = Object.fromEntries(pairs.map((p) => p.split("=")));
const ids = encodeURIComponent(Object.values(assets).join(","));
const res = await fetch(`https://api.figma.com/v1/images/${fileKey}?ids=${ids}&scale=2&format=png`, {
  headers: { "X-Figma-Token": token },
});
const { images, err } = await res.json();
if (err) throw new Error(err);
await mkdir(`public/${outDir}`, { recursive: true });
for (const [name, id] of Object.entries(assets)) {
  if (!images[id]) { console.warn("missing", name, id); continue; }
  const buf = Buffer.from(await (await fetch(images[id])).arrayBuffer());
  await writeFile(`public/${outDir}/${name}.png`, buf);
  console.log("ok", name);
}
