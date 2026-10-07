import test from "node:test";
import assert from "node:assert/strict";
import { Game, generateMap } from "../src/sim.js";
import { TOWERS, ENEMIES, BOSSES } from "../src/data.js";
test("map generation is reproducible, distinct and protects reactor space", () => {
  assert.deepEqual(generateMap(77), generateMap(77));
  assert.notDeepEqual(generateMap(77), generateMap(78));
  assert.ok(generateMap(77).rocks.every((r) => Math.hypot(r.x, r.z) > 11));
  assert.equal(new Set(generateMap(77).features.map((f) => f.type)).size, 6);
});
test("roster, construction economy, free placement and power constraints", () => {
  const g = new Game(42);
  assert.equal(TOWERS.length, 10);
  assert.equal(ENEMIES.length, 10);
  assert.equal(BOSSES.length, 3);
  assert.equal(g.power.used, 4);
  const before = g.alloy;
  assert.equal(g.build("mine", 8.23, 0), null);
  assert.equal(g.alloy, before - 100);
  assert.ok(g.valid("mine", 8.23, 0));
  assert.equal(g.structures.at(-1).x, 8.23);
  g.alloy = 10000;
  g.add("railgun", 7, 7);
  g.add("railgun", -7, -7);
  assert.equal(g.valid("railgun", 0, 8), "Build a power plant");
});
test("decoys attract their signal class but tracker ignores them", () => {
  const g = new Game(3);
  const decoy = g.add("vibration", 10, 0);
  const e = g.spawn(0, { x: 30, z: 0 });
  assert.equal(g.target(e), decoy);
  const tracker = g.spawn(8, { x: 30, z: 0 });
  assert.notEqual(g.target(tracker), decoy);
});
test("three tiers require final specialization and sell refunds investments", () => {
  const g = new Game(2);
  g.alloy = 1000;
  const s = g.structures[1];
  assert.ok(g.upgrade(s));
  assert.ok(g.upgrade(s));
  assert.equal(g.upgrade(s), false);
  assert.ok(g.upgrade(s, 0));
  assert.equal(s.tier, 3);
  const before = g.alloy;
  g.sell(s);
  assert.equal(g.alloy, before + Math.floor(s.spent * 0.55));
});
test("boss cycles, ability cooldowns and independent runs", () => {
  const g = new Game(1);
  g.wave = 9;
  g.startWave();
  assert.ok(g.queue.some((q) => q.boss));
  assert.equal(g.wave, 10);
  assert.ok(g.ability(0, 0, 0));
  assert.equal(g.ability(0, 0, 0), false);
  assert.equal(new Game(1).wave, 0);
});
test("simulation survives sustained combat with finite positions", () => {
  const g = new Game(45);
  g.alloy = 10000;
  for (let i = 0; i < 10; i++)
    g.add(TOWERS[i].id, Math.cos(i) * 9, Math.sin(i) * 9);
  for (let i = 0; i < 3000 && !g.dead; i++) {
    g.tick(0.1);
    g.events = [];
  }
  assert.ok(g.wave >= 2);
  for (const e of g.enemies) {
    assert.ok(Number.isFinite(e.x) && Number.isFinite(e.z));
  }
  assert.ok(g.kills > 0);
});
test("commander tree spends earned research and specializes ability", () => {
  const g = new Game(1);
  assert.equal(g.specializeAbility(0, 0), false);
  g.abilityPoints[0] = 1;
  assert.ok(g.specializeAbility(0, 0));
  assert.equal(g.abilityLevels[0], 1);
  assert.equal(g.abilityPoints[0], 0);
  assert.deepEqual(g.abilityBranches[0], [0]);
});
test("destroyed generation shuts down over-capacity structures", () => {
  const g = new Game(1);
  g.add("generator", 10, 0).build = 0;
  for (let i = 0; i < 5; i++) g.add("railgun", i * 3, 10).build = 0;
  g.tick(0.1);
  assert.ok(
    g.structures.filter((s) => s.type === "railgun").every((s) => s.powered),
  );
  const gen = g.structures.find((s) => s.type === "generator");
  gen.hp = 0;
  g.tick(0.1);
  g.tick(0.1);
  assert.ok(g.structures.some((s) => s.powered === false));
});
