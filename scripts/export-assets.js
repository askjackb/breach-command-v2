import fs from "node:fs";
import { deflateSync } from "node:zlib";
function crc32(buf) {
  let crc = -1;
  for (const value of buf) {
    crc ^= value;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ -1) >>> 0;
}
function chunk(type, data) {
  const name = Buffer.from(type),
    len = Buffer.alloc(4),
    crc = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([len, name, data, crc]);
}
function saveTexture(image) {
  const { width, height, data } = image;
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    Buffer.from(data.slice(y * width * 4, (y + 1) * width * 4)).copy(
      raw,
      y * (width * 4 + 1) + 1,
    );
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  fs.writeFileSync(
    "public/assets/metal-surface.png",
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk("IHDR", header),
      chunk("IDAT", deflateSync(raw)),
      chunk("IEND", Buffer.alloc(0)),
    ]),
  );
}
import { towerModel, enemyModel, featureModel } from "../src/assets.js";
import { TOWERS, SUPPORT, ENEMIES, BOSSES } from "../src/data.js";
fs.mkdirSync("public/assets/models", { recursive: true });
const manifest = [];
function save(name, model) {
  const file = `models/${name}.json`;
  fs.writeFileSync(
    "public/assets/" + file,
    JSON.stringify(
      (() => {
        model.traverse((o) => {
          o.userData = {};
        });
        model.updateMatrixWorld(true);
        const json = model.toJSON();
        for (const image of json.images || []) {
          if (image.url?.data) {
            saveTexture(image.url);
            image.url = "/assets/metal-surface.png";
          }
        }
        return json;
      })(),
    ),
  );
  manifest.push({ name, file });
}
for (const t of [...TOWERS, ...SUPPORT, { id: "reactor" }]) {
  save(t.id, towerModel(t.id));
  if (TOWERS.includes(t)) {
    for (let tier = 1; tier <= 2; tier++)
      save(t.id + "-tier" + tier, towerModel(t.id, tier));
    for (let b = 0; b < 2; b++)
      save(t.id + "-tier3-" + b, towerModel(t.id, 3, b));
  }
}
ENEMIES.forEach((e, i) => save("enemy-" + i, enemyModel(i)));
BOSSES.forEach((e, i) => save("boss-" + i, enemyModel(i, i)));
for (let i = 0; i < 6; i++) save("feature-" + i, featureModel(i));
fs.writeFileSync(
  "public/assets/manifest.json",
  JSON.stringify(manifest, null, 2),
);
console.log(`Exported ${manifest.length} self-authored Three.js model assets`);
