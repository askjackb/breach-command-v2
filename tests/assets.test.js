import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
test("all 74 exported models have geometry and resolvable generated material assets", () => {
  const manifest = JSON.parse(fs.readFileSync("public/assets/manifest.json"));
  assert.equal(manifest.length, 74);
  for (const asset of manifest) {
    const model = JSON.parse(fs.readFileSync("public/assets/" + asset.file));
    assert.ok(model.geometries.length > 0, asset.name);
    for (const image of model.images || [])
      assert.ok(
        fs.existsSync("public" + image.url),
        asset.name + " missing material",
      );
  }
  assert.equal(
    fs.readFileSync("public/assets/basalt.png").subarray(1, 4).toString(),
    "PNG",
  );
});
