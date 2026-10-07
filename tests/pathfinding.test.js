import test from "node:test";
import assert from "node:assert/strict";
import { route } from "../src/pathfinding.js";
test("navigation goes around rocks, reproducibly", () => {
  const obstacles = [{ x: 0, z: 0, r: 5 }],
    a = { x: -12, z: 0 },
    b = { x: 12, z: 0 };
  const p = route(a, b, obstacles);
  assert.deepEqual(p, route(a, b, obstacles));
  assert.ok(p.slice(0, -1).every((s) => Math.hypot(s.x, s.z) >= 5.65));
  assert.deepEqual(p.at(-1), b);
});
