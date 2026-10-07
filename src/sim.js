import { TOWERS, SUPPORT, ENEMIES, BOSSES, FEATURE_NAMES } from "./data.js";
import { route } from "./pathfinding.js";
export function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
export function generateMap(seed) {
  const r = rng(seed),
    rocks = [],
    features = [],
    breaches = [];
  for (let i = 0; i < 65; i++) {
    const x = (r() - 0.5) * 90,
      z = (r() - 0.5) * 90;
    if (Math.hypot(x, z) < 11) continue;
    rocks.push({ x, z, r: 1 + r() * 2.8, h: 1 + r() * 5 });
  }
  for (let i = 0; i < 18; i++) {
    const a = i * 2.39996,
      d = 13 + r() * 24;
    features.push({
      id: i,
      type: i % 6,
      name: FEATURE_NAMES[i % 6],
      x: Math.cos(a) * d,
      z: Math.sin(a) * d,
      used: false,
    });
  }
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 + r() * 0.35;
    breaches.push({ x: Math.cos(a) * 46, z: Math.sin(a) * 46 });
  }
  return { rocks, features, breaches };
}
export class Game {
  constructor(seed = Date.now(), doctrine = "engineer", unlocks = 0) {
    this.seed = seed;
    this.random = rng(seed);
    this.map = generateMap(seed);
    this.doctrine = doctrine;
    this.alloy = 440;
    this.wave = 0;
    this.kills = 0;
    this.time = 0;
    this.nextWave = 12;
    this.structures = [];
    this.enemies = [];
    this.events = [];
    this.queue = [];
    this.choices = [];
    this.available = ["autocannon", "missile", "cryo"];
    this.mods = {
      damage: 1,
      rate: 1,
      mining: doctrine === "prospector" ? 1.2 : 1,
      range: 1,
    };
    this.cooldowns = [0, 0, 0];
    this.abilityLevels = [0, 0, 0];
    this.abilityPoints = [0, 0, 0];
    this.abilityBranches = [[], [], []];
    this.nextId = 1;
    this.dead = false;
    this.unlocks = unlocks;
    this.add("reactor", 0, 0);
    this.add("autocannon", -4, 4);
    this.add("autocannon", 4, -4);
  }
  add(type, x, z) {
    const def =
      TOWERS.find((t) => t.id === type) || SUPPORT.find((t) => t.id === type);
    const s = {
      id: this.nextId++,
      type,
      x,
      z,
      hp: type === "reactor" ? 2200 : 450,
      maxHp: type === "reactor" ? 2200 : 450,
      tier: 0,
      branch: null,
      heat: 0,
      vibration: 0,
      cooldown: 0,
      build: type === "reactor" ? 0 : 2,
      spent: def?.cost || 0,
    };
    this.structures.push(s);
    this.events.push({ type: "build", s });
    return s;
  }
  get reactor() {
    return this.structures.find((s) => s.type === "reactor");
  }
  get power() {
    return {
      used: this.structures.reduce(
        (v, s) =>
          v +
          ((
            TOWERS.find((t) => t.id === s.type) ||
            SUPPORT.find((t) => t.id === s.type)
          )?.power || 0),
        0,
      ),
      capacity:
        12 +
        this.structures.filter((s) => s.type === "generator" && s.build <= 0)
          .length *
          12,
    };
  }
  valid(type, x, z) {
    const def = [...TOWERS, ...SUPPORT].find((t) => t.id === type);
    if (!def) return "Unknown structure";
    if (Math.hypot(x, z) > this.radius) return "Outside colony territory";
    if (
      this.structures.some(
        (s) => distance(s, { x, z }) < (s.type === "reactor" ? 4 : 2.7),
      )
    )
      return "Structure overlap";
    if (this.map.rocks.some((s) => distance(s, { x, z }) < s.r + 1))
      return "Uneven terrain";
    if (this.alloy < def.cost) return "Insufficient alloy";
    if (this.power.used + def.power > this.power.capacity)
      return "Build a power plant";
    return null;
  }
  get radius() {
    return Math.min(43, 19 + Math.floor(this.wave / 5) * 5);
  }
  build(type, x, z) {
    const error = this.valid(type, x, z);
    if (error) return error;
    const def = [...TOWERS, ...SUPPORT].find((t) => t.id === type);
    this.alloy -= def.cost;
    this.add(type, x, z);
    return null;
  }
  upgrade(s, branch) {
    if (!TOWERS.some((t) => t.id === s.type) || s.tier >= 3) return false;
    const cost = 60 + s.tier * 55;
    if (this.alloy < cost || (s.tier === 2 && branch == null)) return false;
    this.alloy -= cost;
    s.spent += cost;
    s.tier++;
    s.maxHp += 140;
    s.hp += 140;
    if (s.tier === 3) s.branch = branch;
    this.events.push({ type: "upgrade", s });
    return true;
  }
  repair(s) {
    if (this.alloy < 40 || s.hp >= s.maxHp) return false;
    this.alloy -= 40;
    s.hp = Math.min(s.maxHp, s.hp + (this.doctrine === "engineer" ? 250 : 200));
    return true;
  }
  sell(s) {
    if (s.type === "reactor") return;
    this.alloy += Math.floor(s.spent * 0.55);
    s.hp = 0;
  }
  target(e) {
    let best = this.reactor,
      score = -Infinity;
    for (const s of this.structures) {
      if (s.hp <= 0) continue;
      let attraction = s.type === "reactor" ? 35 : 5;
      if (s.type === "generator") attraction += e.signal === "heat" ? 32 : 10;
      if (!e.tracker) {
        if (s.type === e.signal) attraction += 110;
        if (s.type === "mine" && e.signal === "vibration") attraction += 48;
        attraction += (e.signal === "heat" ? s.heat : s.vibration) * 2;
      }
      const value = attraction / (8 + distance(e, s));
      if (value > score) {
        score = value;
        best = s;
      }
    }
    return best;
  }
  spawn(type, breach, boss = false) {
    const base = boss ? BOSSES[type] : ENEMIES[type];
    const scale = 1 + this.wave * 0.13;
    const e = {
      ...base,
      id: this.nextId++,
      kind: type,
      x: breach.x,
      z: breach.z,
      hp: base.hp * scale,
      maxHp: base.hp * scale,
      cooldown: 0,
      retarget: 0,
      slow: 0,
      phase: this.random() * 6,
      target: null,
    };
    this.enemies.push(e);
    this.events.push({ type: "spawn", e });
    return e;
  }
  startWave() {
    this.wave++;
    this.events.push({ type: "wave", wave: this.wave });
    const breach = this.map.breaches[(this.wave - 1) % 6];
    const count = Math.min(90, 7 + this.wave * 3);
    for (let i = 0; i < count; i++) {
      let kind = Math.floor(
        this.random() * Math.min(10, 1 + Math.floor(this.wave / 2)),
      );
      if (
        kind === 5 &&
        !this.available.some((t) =>
          ["autocannon", "missile", "flak", "arc", "cryo", "drone"].includes(t),
        )
      )
        kind = 0;
      this.queue.push({ at: this.time + i * 0.55, kind, breach });
    }
    if (this.wave % 10 === 0)
      this.queue.push({
        at: this.time + count * 0.55 + 2,
        kind: (Math.floor(this.wave / 10) - 1) % 3,
        breach,
        boss: true,
      });
    this.nextWave = this.time + Math.max(28, count * 0.55 + 15);
  }
  makeChoices() {
    const locked = TOWERS.filter((t) => !this.available.includes(t.id));
    const r = this.random;
    const options = [];
    if (locked.length)
      options.push({
        kind: "tower",
        id: locked[Math.floor(r() * locked.length)].id,
      });
    const pool = [
      {
        kind: "damage",
        name: "Kinetic calibration",
        text: "+18% all weapon damage",
      },
      { kind: "rate", name: "Rapid cycling", text: "+12% weapon fire rate" },
      { kind: "mining", name: "Deep extraction", text: "+25% mining income" },
      { kind: "range", name: "Sensor fusion", text: "+10% weapon range" },
      ...this.abilityLevels.map((_, id) => ({
        kind: "ability",
        id,
        name: ["Orbital refinement", "Overdrive protocol", "Repair nanites"][
          id
        ],
        text: "Improve commander ability",
      })),
    ];
    while (options.length < 3) {
      const o = pool.splice(Math.floor(r() * pool.length), 1)[0];
      options.push(o);
    }
    this.choices.push(options);
  }
  choose(index) {
    const options = this.choices.shift();
    if (!options) return;
    const o = options[index];
    if (o.kind === "tower") this.available.push(o.id);
    else if (o.kind === "ability") this.abilityPoints[o.id]++;
    else
      this.mods[o.kind] *=
        o.kind === "damage"
          ? 1.18
          : o.kind === "rate"
            ? 1.12
            : o.kind === "mining"
              ? 1.25
              : 1.1;
    this.events.push({ type: "choice" });
  }
  specializeAbility(id, branch) {
    if (this.abilityPoints[id] <= 0 || this.abilityLevels[id] >= 3)
      return false;
    this.abilityPoints[id]--;
    this.abilityLevels[id]++;
    this.abilityBranches[id].push(branch);
    return true;
  }
  ability(id, x = 0, z = 0) {
    if (this.cooldowns[id] > 0 || this.dead) return false;
    const level = this.abilityLevels[id],
      branches = this.abilityBranches[id],
      potency = branches.filter((b) => b === 0).length,
      utility = branches.filter((b) => b === 1).length;
    this.cooldowns[id] =
      [35, 45, 40][id] *
      (this.doctrine === "tactician" ? 0.75 : 1) *
      Math.pow(0.88, utility);
    if (id === 0) {
      for (const e of this.enemies)
        if (distance(e, { x, z }) < 8 + utility)
          e.hp -= 350 * (1 + potency * 0.45);
      this.events.push({ type: "blast", x, z, r: 8 });
    }
    if (id === 1) this.overdrive = 8 + utility * 3;
    this.overdriveStrength = 1.8 + potency * 0.3;
    if (id === 2)
      for (const s of this.structures)
        if (distance(s, { x, z }) < 14 + utility * 2)
          s.hp = Math.min(s.maxHp, s.hp + 280 * (1 + potency * 0.4));
    return true;
  }
  activate(f) {
    if (f.used || distance(f, { x: 0, z: 0 }) > this.radius) return false;
    f.used = true;
    if (f.type === 0) {
      this.add("vibration", f.x, f.z).spent = 0;
    }
    if (f.type === 1)
      for (const e of this.enemies) if (distance(e, f) < 12) e.slow = 8;
    if (f.type === 2) {
      for (const e of this.enemies) if (distance(e, f) < 10) e.hp -= 600;
      this.events.push({ type: "blast", x: f.x, z: f.z, r: 10 });
    }
    if (f.type === 3) this.add("generator", f.x, f.z).spent = 0;
    if (f.type === 4) {
      this.map.rocks = this.map.rocks.filter((r) => distance(r, f) > 10);
      this.events.push({ type: "terrain" });
      for (const e of this.enemies) e.path = [];
    }
    if (f.type === 5) this.alloy += 220;
    return true;
  }
  tick(dt) {
    if (this.dead) return;
    dt = Math.min(dt, 0.1);
    this.time += dt;
    this.overdrive = Math.max(0, (this.overdrive || 0) - dt);
    this.cooldowns = this.cooldowns.map((c) => Math.max(0, c - dt));
    if (
      this.time >= this.nextWave &&
      this.enemies.length === 0 &&
      this.queue.length === 0
    ) {
      if (this.wave) this.makeChoices();
      this.startWave();
    }
    for (let i = this.queue.length - 1; i >= 0; i--)
      if (this.queue[i].at <= this.time && this.enemies.length < 110) {
        const q = this.queue.splice(i, 1)[0];
        this.spawn(q.kind, q.breach, q.boss);
      }
    let remainingPower = this.power.capacity;
    for (const s of this.structures) {
      const demand =
        [...TOWERS, ...SUPPORT].find((t) => t.id === s.type)?.power || 0;
      s.powered = demand <= remainingPower;
      if (s.powered) remainingPower -= demand;
      s.build = Math.max(0, s.build - dt);
      s.heat = Math.max(0, s.heat - dt);
      s.vibration = Math.max(0, s.vibration - dt);
      if (s.build > 0 || s.hp <= 0 || !s.powered) continue;
      if (s.type === "mine") {
        this.alloy += dt * 4 * this.mods.mining;
        s.vibration = 20;
      }
      if (s.type === "vibration") s.vibration = 40;
      if (s.type === "heat") s.heat = 40;
      const d = TOWERS.find((t) => t.id === s.type);
      if (!d) continue;
      s.cooldown -= dt;
      if (s.cooldown > 0) continue;
      const candidates = this.enemies.filter(
        (e) =>
          e.hp > 0 &&
          (!e.flying ||
            !["mortar", "seismic", "incinerator"].includes(s.type)) &&
          distance(s, e) < d.range * this.mods.range * (1 + s.tier * 0.08),
      );
      candidates.sort(
        (a, b) =>
          (s.type === "flak" ? Number(b.flying) - Number(a.flying) : 0) ||
          distance(s, a) - distance(s, b),
      );
      const e = candidates[0];
      if (!e) continue;
      s.aim = e;
      let damage =
        d.damage *
        this.mods.damage *
        (1 + s.tier * 0.45) *
        (s.branch === 0 && !d.splash && !d.chain ? 1.65 : 1);
      const hit = (t) => {
        t.hp -=
          damage *
          (s.type === "railgun" || s.type === "seismic"
            ? 1
            : 1 - (t.armor || 0));
        if (d.slow) t.slow = d.slow + (s.tier === 3 ? 2 : 0);
      };
      hit(e);
      if (d.splash || (s.type === "cryo" && s.branch === 0))
        for (const other of this.enemies)
          if (
            other !== e &&
            distance(e, other) < (d.splash || 2) * (s.branch === 0 ? 1.5 : 1)
          )
            hit(other);
      if (d.chain)
        for (const other of this.enemies
          .filter((t) => t !== e && distance(e, t) < 5)
          .slice(0, d.chain + (s.branch === 0 ? 3 : 0)))
          hit(other);
      if (s.type === "railgun") {
        const vx = e.x - s.x,
          vz = e.z - s.z,
          l = Math.hypot(vx, vz);
        for (const o of candidates)
          if (o !== e && Math.abs((o.x - s.x) * vz - (o.z - s.z) * vx) / l < 1)
            hit(o);
      }
      s.cooldown =
        d.rate /
        (this.mods.rate *
          (s.branch === 1 ? 1.5 : 1) *
          (this.overdrive ? this.overdriveStrength || 1.8 : 1));
      s.heat = Math.min(35, s.heat + 4);
      if (s.type === "seismic") s.vibration = 30;
      this.events.push({
        type: "shot",
        s,
        e,
        color: d.color,
        splash: d.splash,
      });
    }
    for (const e of [...this.enemies]) {
      if (e.hp <= 0) continue;
      e.slow = Math.max(0, e.slow - dt);
      e.cooldown -= dt;
      e.retarget -= dt;
      if (e.retarget <= 0 || !e.target || e.target.hp <= 0) {
        const old = e.target;
        e.target = this.target(e);
        e.retarget = 1;
        if (old !== e.target || !e.path?.length) {
          e.path =
            e.target && !e.flying && !e.burrow && !e.climb
              ? route(e, e.target, this.map.rocks)
              : [];
        }
      }
      let target = e.target;
      if (!target) continue;
      const range = e.ranged || 2.2;
      let d = distance(e, target);
      if (d > range) {
        while (e.path?.length && distance(e, e.path[0]) < 1) e.path.shift();
        const waypoint = e.path?.[0] || target;
        const wd = distance(e, waypoint) || 1;
        let dx = (waypoint.x - e.x) / wd,
          dz = (waypoint.z - e.z) / wd;
        if (!e.flying && !e.burrow && !e.climb) {
          for (const s of this.structures) {
            if (s === target || s.hp <= 0) continue;
            const near = distance(e, s);
            if (near < 2.8) {
              target = s;
              d = near;
              break;
            }
          }
        }
        if (d > range) {
          const l = Math.hypot(dx, dz);
          const speed = e.speed * (e.slow ? 0.4 : 1);
          e.x += (dx / l) * speed * dt;
          e.z += (dz / l) * speed * dt;
        }
      }
      if (
        d <= Math.max(range, target !== e.target ? 3 : 0) &&
        e.cooldown <= 0
      ) {
        target.hp -= e.damage * (1 + this.wave * 0.04);
        e.cooldown = 1;
        this.events.push({ type: "attack", e, s: target });
      }
      if (e.boss === 0 && e.cooldown === 1) {
        for (const s of this.structures)
          if (s !== target && distance(e, s) < 7) s.hp -= e.damage * 0.4;
      }
      if (e.healer)
        for (const o of this.enemies)
          if (distance(e, o) < 5) o.hp = Math.min(o.maxHp, o.hp + dt * 10);
      if (e.boss === 2 && Math.floor(this.time / 12) !== e.broodTime) {
        e.broodTime = Math.floor(this.time / 12);
        if (this.enemies.length < 105)
          for (let i = 0; i < 3; i++) this.spawn(0, e);
      }
    }
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (e.hp > 0) continue;
      this.enemies.splice(i, 1);
      this.kills++;
      this.alloy += e.boss != null ? 300 : 12 + e.kind * 2;
      this.events.push({ type: "death", e });
      if (e.brood && e.boss == null && this.enemies.length < 105)
        for (let j = 0; j < 3; j++) this.spawn(0, e);
    }
    for (let i = this.structures.length - 1; i >= 0; i--) {
      const s = this.structures[i];
      if (s.hp > 0) continue;
      this.structures.splice(i, 1);
      this.events.push({ type: "destroy", s });
      if (s.type === "reactor") {
        this.dead = true;
        this.events.push({ type: "defeat" });
      }
    }
  }
}
