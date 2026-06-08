// Hero 星空画像の派生生成（avif/webp/jpg）＋ LQIP(base64) 出力。
// 既存 hero-shuttle-* と同じ構成で hero-star-* を作る。
// プロジェクトルートから `node scripts/gen-hero-star.mjs` で実行する。
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const outDir = "public/images/hero";

const jobs = [
  {
    src: "public/images/gallery/standard-30-milkyway-landscape-nopeople.jpg",
    out: "hero-star-desktop",
    w: 1600,
    h: 900,
  },
  {
    src: "public/images/gallery/standard-49-woman-beach-reach-milkyway.jpg",
    out: "hero-star-mobile",
    w: 900,
    h: 1600,
  },
];

for (const j of jobs) {
  const base = sharp(j.src).resize(j.w, j.h, { fit: "cover", position: "centre" });
  await base.clone().avif({ quality: 52 }).toFile(`${outDir}/${j.out}.avif`);
  await base.clone().webp({ quality: 78 }).toFile(`${outDir}/${j.out}.webp`);
  await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(`${outDir}/${j.out}.jpg`);
  console.log(`generated ${j.out}.{avif,webp,jpg} (${j.w}x${j.h})`);
}

// LQIP: desktop 画像を 24px 幅まで縮小したぼかしを base64 で。bg-cover で全面に敷く用途。
const lqipBuf = await sharp(jobs[0].src)
  .resize(24, 14, { fit: "cover", position: "centre" })
  .jpeg({ quality: 40 })
  .toBuffer();
const lqip = `data:image/jpeg;base64,${lqipBuf.toString("base64")}`;
await writeFile(`${outDir}/hero-star.lqip.txt`, lqip);
console.log("LQIP length:", lqip.length);
