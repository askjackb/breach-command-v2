import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Game, distance } from "./sim.js";
import { TOWERS, SUPPORT, ENEMIES } from "./data.js";
import { towerModel, enemyModel, featureModel, part } from "./assets.js";
const $ = (id) => document.getElementById(id);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x26343c);
scene.fog = new THREE.FogExp2(0x26343c, 0.008);
const renderer = new THREE.WebGLRenderer({
  canvas: $("world"),
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
const camera = new THREE.PerspectiveCamera(48, 1, 0.2, 250);
camera.position.set(23, 26, 30);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 10;
controls.maxDistance = 95;
controls.maxPolarAngle = Math.PI / 2.15;
controls.minPolarAngle = 0.22;
controls.touches.ONE = THREE.TOUCH.ROTATE;
controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
scene.add(new THREE.HemisphereLight(0xc4d4e4, 0x3e382c, 2));
const sun = new THREE.DirectionalLight(0xffdcb0, 3);
sun.position.set(-25, 40, 20);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -55;
sun.shadow.camera.right = 55;
sun.shadow.camera.top = 55;
sun.shadow.camera.bottom = -55;
sun.shadow.camera.far = 130;
sun.shadow.normalBias = 0.08;
scene.add(sun);
const rim = new THREE.DirectionalLight(0x92b6d2, 1.7);
rim.position.set(25, 15, -30);
scene.add(rim);
const world = new THREE.Group();
scene.add(world);
const texture = new THREE.TextureLoader().load(
  import.meta.env.BASE_URL + "assets/basalt.png",
);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(12, 12);
texture.colorSpace = THREE.SRGBColorSpace;
texture.anisotropy = 4;
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(110, 110, 80, 80),
  new THREE.MeshStandardMaterial({
    map: texture,
    color: 0x969187,
    roughness: 0.95,
    metalness: 0.08,
  }),
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);
let game,
  playing = false,
  selected = null,
  buildType = null,
  preview = null,
  aimAbility = null,
  signalView = false,
  muted = false,
  audioCtx,
  lastSound = 0;
const enemyTemplates = new Map(),
  instancePools = new Map();
function enemyInstance(kind, boss) {
  const key = kind + ":" + boss;
  if (!enemyTemplates.has(key)) enemyTemplates.set(key, enemyModel(kind, boss));
  const m = enemyTemplates.get(key).clone(true);
  m.userData.legs = [];
  m.children.forEach((c) => {
    if (c.type === "Group") m.userData.legs.push(c);
  });
  return m;
}
function renderEnemies() {
  for (const pool of instancePools.values()) pool.count = 0;
  for (const e of game.enemies) {
    const model = meshes.get(e.id);
    if (!model) continue;
    model.updateMatrixWorld(true);
    model.traverse((o) => {
      if (!o.isMesh) return;
      const key = o.geometry.uuid + ":" + o.material.uuid;
      let pool = instancePools.get(key);
      if (!pool) {
        pool = new THREE.InstancedMesh(o.geometry, o.material, 2048);
        pool.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        pool.frustumCulled = false;
        pool.castShadow = true;
        pool.receiveShadow = true;
        scene.add(pool);
        instancePools.set(key, pool);
      }
      if (pool.count < 2048) pool.setMatrixAt(pool.count++, o.matrixWorld);
    });
  }
  for (const pool of instancePools.values())
    pool.instanceMatrix.needsUpdate = true;
}
let meshes = new Map(),
  featureMeshes = new Map(),
  rockGroup = new THREE.Group(),
  fx = [];
world.add(rockGroup);
const ray = new THREE.Raycaster(),
  mouse = new THREE.Vector2();
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let pointerStart = null,
  position = null;
let record;
try {
  record = JSON.parse(
    localStorage.getItem("breach-record") || '{"best":0,"bosses":0}',
  );
} catch {
  record = { best: 0, bosses: 0 };
}
function toast(text) {
  $("toast").textContent = text;
  $("toast").style.opacity = 1;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => ($("toast").style.opacity = 0), 2400);
}
function sound(freq = 100, duration = 0.08) {
  if (
    muted ||
    !audioCtx ||
    audioCtx.state !== "running" ||
    performance.now() - lastSound < 65
  )
    return;
  lastSound = performance.now();
  const osc = audioCtx.createOscillator(),
    gain = audioCtx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(
    35,
    audioCtx.currentTime + duration,
  );
  gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + duration,
  );
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}
function disposeObject(obj) {
  obj.traverse((o) => {
    if (o.geometry && o.userData.temporary) o.geometry.dispose();
  });
}
function drawRocks() {
  rockGroup.clear();
  const geo = new THREE.IcosahedronGeometry(1, 2);
  const attr = geo.attributes.position;
  for (let i = 0; i < attr.count; i++) {
    const x = attr.getX(i),
      y = attr.getY(i),
      z = attr.getZ(i);
    const n =
      1 +
      0.13 * Math.sin(x * 13 + y * 19 + z * 11) +
      0.07 * Math.cos(x * 29 - z * 17);
    attr.setXYZ(i, x * n, y * n, z * n);
  }
  geo.computeVertexNormals();
  const rockTexture = texture.clone();
  rockTexture.repeat.set(1, 1);
  rockTexture.needsUpdate = true;
  const m = new THREE.MeshStandardMaterial({
    color: 0x8b8b82,
    map: rockTexture,
    bumpMap: rockTexture,
    bumpScale: 0.28,
    roughness: 0.96,
    flatShading: true,
  });
  const instances = new THREE.InstancedMesh(geo, m, game.map.rocks.length);
  const dummy = new THREE.Object3D();
  game.map.rocks.forEach((r, i) => {
    dummy.position.set(r.x, r.h * 0.3, r.z);
    dummy.scale.set(r.r, r.h, r.r * 0.8);
    dummy.rotation.set(i * 0.7, i * 1.4, i * 0.17);
    dummy.updateMatrix();
    instances.setMatrixAt(i, dummy.matrix);
  });
  instances.castShadow = true;
  instances.receiveShadow = true;
  rockGroup.add(instances);
}
function addMesh(s) {
  const model = towerModel(s.type, s.tier, s.branch);
  model.position.set(s.x, 0, s.z);
  model.userData.entity = s;
  world.add(model);
  meshes.set(s.id, model);
}
let territory,
  rangeRing,
  signalGroup = new THREE.Group();
world.add(signalGroup);
function ring(radius, color) {
  const mesh = new THREE.Mesh(
    new THREE.RingGeometry(radius - 0.06, radius + 0.06, 96),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.06;
  return mesh;
}
function initialize(seed = Date.now()) {
  for (const obj of [...world.children])
    if (obj !== rockGroup && obj !== signalGroup) world.remove(obj);
  meshes.clear();
  featureMeshes.clear();
  fx = [];
  signalGroup.clear();
  game = new Game(seed, $("doctrine").value, record.bosses);
  drawRocks();
  for (const s of game.structures) addMesh(s);
  for (const f of game.map.features) {
    const model = featureModel(f.type);
    model.position.set(f.x, 0, f.z);
    model.userData.feature = f;
    world.add(model);
    featureMeshes.set(f.id, model);
  }
  for (const b of game.map.breaches) {
    const m = ring(2.5, 0xd48665);
    m.position.set(b.x, 0.1, b.z);
    world.add(m);
    const pit = new THREE.Mesh(
      new THREE.CircleGeometry(2.3, 24),
      new THREE.MeshBasicMaterial({ color: 0x121718 }),
    );
    pit.rotation.x = -Math.PI / 2;
    pit.position.set(b.x, 0.02, b.z);
    world.add(pit);
  }
  territory = ring(game.radius, 0xa8c0b3);
  world.add(territory);
  game.events = [];
  selected = null;
  cancel();
  refreshBuilds();
  updateUI();
}
function flash(x, z, r, color = 0xdcb37c) {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(1, 12, 8),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    }),
  );
  m.position.set(x, 0.5, z);
  m.scale.set(r, 0.3, r);
  world.add(m);
  fx.push({ mesh: m, life: 0.45, max: 0.45 });
}
function shot(s, e, color) {
  const points = [
    new THREE.Vector3(s.x, 1.7, s.z),
    new THREE.Vector3(e.x, e.flying ? 3 : 0.8, e.z),
  ];
  const l = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 }),
  );
  world.add(l);
  fx.push({ mesh: l, life: 0.09, max: 0.09 });
  sound(s.type === "railgun" ? 70 : 180);
}
function processEvents() {
  for (const ev of game.events) {
    if (ev.type === "build") addMesh(ev.s);
    if (ev.type === "spawn") {
      const m = enemyInstance(ev.e.kind, ev.e.boss);
      m.userData.entity = ev.e;
      meshes.set(ev.e.id, m);
    }
    if (ev.type === "upgrade") {
      world.remove(meshes.get(ev.s.id));
      addMesh(ev.s);
    }
    if (ev.type === "death" || ev.type === "destroy") {
      const s = ev.e || ev.s;
      world.remove(meshes.get(s.id));
      meshes.delete(s.id);
      flash(s.x, s.z, ev.e?.boss != null ? 4 : 1, ev.e ? 0x9b785d : 0xc49f70);
      if (ev.e?.boss != null) {
        record.bosses++;
        toast("Boss neutralized · next wave cycle incoming");
      }
    }
    if (ev.type === "shot") shot(ev.s, ev.e, ev.color);
    if (ev.type === "blast") {
      flash(ev.x, ev.z, ev.r);
      sound(45, 0.3);
    }
    if (ev.type === "terrain") drawRocks();
    if (ev.type === "wave") {
      toast(
        "Wave " +
          ev.wave +
          " · " +
          (ev.wave % 10 === 0 ? "BOSS SIGNATURE DETECTED" : "breach active"),
      );
      refreshBuilds();
      world.remove(territory);
      territory = ring(game.radius, 0xa8c0b3);
      world.add(territory);
    }
    if (ev.type === "defeat") endRun();
  }
  game.events = [];
}
function refreshTree() {
  const panel = $("tree");
  panel.innerHTML =
    "<h3>COMMANDER RESEARCH</h3><p>Research rewards grant a point to the named ability. Choose one specialization per tier.</p>";
  for (let id = 0; id < 3; id++) {
    const title = document.createElement("h4");
    title.textContent =
      ["Orbital strike", "Overdrive", "Field repair"][id] +
      " · " +
      game.abilityLevels[id] +
      "/3";
    panel.append(title);
    for (let tier = 0; tier < 3; tier++) {
      const row = document.createElement("div");
      row.className = "tree-row";
      for (let branch = 0; branch < 2; branch++) {
        const b = document.createElement("button");
        const names = [
          ["Payload", "Coverage"],
          ["Output", "Duration"],
          ["Restoration", "Reach"],
        ][id];
        b.textContent = names[branch] + " " + (tier + 1);
        b.disabled =
          tier !== game.abilityLevels[id] || game.abilityPoints[id] <= 0;
        if (game.abilityBranches[id][tier] === branch)
          b.classList.add("active");
        b.onclick = () => {
          game.specializeAbility(id, branch);
          refreshTree();
        };
        row.append(b);
      }
      panel.append(row);
    }
    const note = document.createElement("small");
    note.textContent = "Available points: " + game.abilityPoints[id];
    panel.append(note);
  }
}
$("commander").onclick = () => {
  $("tree").hidden = !$("tree").hidden;
  refreshTree();
};
function saveRecord() {
  try {
    localStorage.setItem("breach-record", JSON.stringify(record));
  } catch {}
}
function endRun() {
  playing = false;
  record.best = Math.max(record.best, game.wave);
  saveRecord();
  $("doctrine").options[1].disabled = record.bosses < 1;
  $("doctrine").options[2].disabled = record.best < 5;
  $("menu").hidden = false;
  $("start").textContent = "ESTABLISH A NEW COLONY →";
  $("record").textContent =
    `Reactor lost · survived ${game.wave} waves · ${game.kills} kills · best ${record.best}`;
  cancel();
}
function refreshBuilds() {
  $("builds").innerHTML = "";
  for (const def of [
    ...TOWERS.filter((t) => game.available.includes(t.id)),
    ...SUPPORT,
  ]) {
    const b = document.createElement("button");
    b.innerHTML = `<strong>${def.name}</strong><small>${def.cost} AL / ${def.power} PWR</small>`;
    b.title = def.role;
    b.onclick = () => {
      cancel();
      selected = null;
      buildType = def.id;
      preview = towerModel(def.id);
      preview.traverse((o) => {
        if (o.material) {
          o.material = o.material.clone();
          o.material.transparent = true;
          o.material.opacity = 0.5;
          o.castShadow = false;
        }
      });
      world.add(preview);
      $("placement").hidden = false;
      toast(def.role);
    };
    $("builds").append(b);
  }
}
function cancel() {
  if (preview) {
    world.remove(preview);
    preview.traverse((o) => o.material?.dispose());
    preview = null;
  }
  buildType = null;
  aimAbility = null;
  $("placement").hidden = true;
}
function updateUI() {
  const p = game.power;
  $("stats").innerHTML =
    `<div><small>ALLOY</small>${Math.floor(game.alloy)}</div><div><small>POWER</small>${p.used}/${p.capacity}</div><div><small>REACTOR</small>${Math.ceil(((game.reactor?.hp || 0) / 2200) * 100)}%</div>`;
  $("wavebar").textContent =
    `WAVE ${String(game.wave).padStart(2, "0")} / ${game.wave > 0 && game.wave % 10 === 0 ? "BOSS ASSAULT" : "ENDLESS DEFENSE"} · ${game.enemies.length} HOSTILES · ${game.kills} KILLS`;
  const options = game.choices[0];
  const signature = JSON.stringify(options);
  if ($("choices").dataset.signature !== signature) {
    $("choices").dataset.signature = signature;
    $("choices").innerHTML = "";
    if (options) {
      const h = document.createElement("h3");
      h.textContent = "FIELD RESEARCH / PICK ONE";
      $("choices").append(h);
      options.forEach((o, i) => {
        const b = document.createElement("button");
        const t = TOWERS.find((t) => t.id === o.id);
        b.innerHTML = `${o.kind === "tower" ? "Unlock " + t.name : o.name}<small>${o.kind === "tower" ? t.role : o.text}</small>`;
        b.onclick = () => {
          game.choose(i);
          refreshBuilds();
          refreshTree();
          updateUI();
        };
        $("choices").append(b);
      });
    }
  }
  for (let i = 0; i < 3; i++) {
    const b = $("ability" + i);
    if (b) {
      b.disabled = game.cooldowns[i] > 0;
      b.textContent =
        ["Orbital strike", "Overdrive", "Field repair"][i] +
        (game.cooldowns[i] > 0 ? " " + Math.ceil(game.cooldowns[i]) + "s" : "");
    }
  }
  if (selected) {
    const s = selected;
    $("inspect").style.display = "block";
    if (
      s.name &&
      s.type != null &&
      s.id < 18 &&
      game.map.features.includes(s)
    ) {
      $("inspect").innerHTML =
        `<h3>${s.name}</h3><p>${["Creates a seismic lure", "Slows nearby enemies", "Detonates nearby organisms", "Restores a power facility", "Clears nearby rock formations", "Recover 220 alloy"][s.type]}</p><button id="activate" ${s.used ? "disabled" : ""}>${s.used ? "Used" : "Activate"}</button>`;
      $("activate").onclick = () => {
        if (game.activate(s)) {
          featureMeshes.get(s.id).visible = false;
          toast("Map feature activated");
        } else toast("Expand territory to reach this feature");
      };
    } else if (s.maxHp && game.structures.includes(s)) {
      const d = TOWERS.find((t) => t.id === s.type);
      $("inspect").innerHTML =
        `<h3>${d?.name || SUPPORT.find((t) => t.id === s.type)?.name || "Command reactor"}</h3><p>${Math.ceil(s.hp)} / ${s.maxHp} integrity<br>${d ? d.role + "<br>Upgrade tier " + s.tier + " / 3" + (s.powered === false ? " · NO POWER" : "") : ""}</p>${d && s.tier < 2 ? `<button id="upgrade">Upgrade · ${60 + s.tier * 55} AL</button>` : ""}${d && s.tier === 2 ? d.branches.map((b, i) => `<button id="branch${i}">${b} · 170 AL</button>`).join("") : ""}<button id="repair">Repair · 40 AL</button>${s.type !== "reactor" ? '<button id="sell">Sell · 55% refund</button>' : ""}`;
      if ($("upgrade"))
        $("upgrade").onclick = () => {
          if (!game.upgrade(s)) toast("Insufficient alloy");
        };
      for (let i = 0; i < 2; i++)
        if ($("branch" + i))
          $("branch" + i).onclick = () => {
            if (!game.upgrade(s, i)) toast("Insufficient alloy");
          };
      $("repair").onclick = () => {
        if (!game.repair(s)) toast("Cannot repair");
      };
      if ($("sell"))
        $("sell").onclick = () => {
          game.sell(s);
          selected = null;
        };
    } else if (game.enemies.includes(s)) {
      $("inspect").innerHTML =
        `<h3>${s.name}</h3><p>${Math.ceil(s.hp)} integrity<br>Tracks ${s.tracker ? "reactor & infrastructure" : s.signal}<br>Target: ${s.target?.type || "acquiring"}</p>`;
    } else selected = null;
  }
  if (!selected) $("inspect").style.display = "none";
}
function groundPosition(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.set(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    (-(event.clientY - rect.top) / rect.height) * 2 + 1,
  );
  ray.setFromCamera(mouse, camera);
  return ray.ray.intersectPlane(plane, new THREE.Vector3());
}
const fingers = new Map();
let twistAngle = null;
renderer.domElement.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "touch" || !fingers.has(e.pointerId)) return;
  fingers.set(e.pointerId, [e.clientX, e.clientY]);
  if (fingers.size === 2) {
    const [a, b] = [...fingers.values()],
      angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
    if (twistAngle != null) {
      let delta = angle - twistAngle;
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;
      camera.position
        .sub(controls.target)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), -delta)
        .add(controls.target);
    }
    twistAngle = angle;
  }
});
for (const event of ["pointerup", "pointercancel"])
  renderer.domElement.addEventListener(event, (e) => {
    fingers.delete(e.pointerId);
    twistAngle = null;
  });
renderer.domElement.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "touch") {
    fingers.set(e.pointerId, [e.clientX, e.clientY]);
    twistAngle = null;
  }
  pointerStart = { x: e.clientX, y: e.clientY, time: performance.now() };
});
renderer.domElement.addEventListener("pointermove", (e) => {
  if (preview) {
    const p = groundPosition(e);
    if (p) {
      position = p;
      preview.position.copy(p);
      preview.position.y = 0.1;
    }
  }
});
renderer.domElement.addEventListener("pointerup", (e) => {
  if (
    !playing ||
    !pointerStart ||
    Math.hypot(e.clientX - pointerStart.x, e.clientY - pointerStart.y) > 8 ||
    performance.now() - pointerStart.time > 700
  )
    return;
  const p = groundPosition(e);
  if (!p) return;
  position = p;
  if (preview) {
    preview.position.copy(p);
    return;
  }
  if (aimAbility != null) {
    game.ability(aimAbility, p.x, p.z);
    cancel();
    return;
  }
  const hits = ray.intersectObjects(
    [...meshes.values(), ...featureMeshes.values()],
    true,
  );
  selected = null;
  for (const hit of hits) {
    let o = hit.object;
    while (o && !o.userData.entity && !o.userData.feature) o = o.parent;
    if (o) {
      selected = o.userData.entity || o.userData.feature;
      break;
    }
  }
  if (rangeRing) {
    world.remove(rangeRing);
    rangeRing.geometry.dispose();
    rangeRing.material.dispose();
    rangeRing = null;
  }
  if (selected) {
    const d = TOWERS.find((t) => t.id === selected.type);
    if (d) {
      rangeRing = ring(d.range * game.mods.range, 0xc5d4c2);
      rangeRing.position.set(selected.x, 0.1, selected.z);
      world.add(rangeRing);
    }
  }
  updateUI();
});
$("confirm").onclick = () => {
  if (!position || !buildType) return;
  const error = game.build(buildType, position.x, position.z);
  if (error) toast(error);
  else {
    toast("Construction started");
    cancel();
  }
};
$("cancel").onclick = cancel;
$("home").onclick = () => {
  controls.target.set(0, 0, 0);
  camera.position.set(23, 26, 30);
};
$("signals").onclick = () => {
  signalView = !signalView;
  $("signals").classList.toggle("active", signalView);
};
$("audio").onclick = () => {
  muted = !muted;
  $("audio").textContent = "Audio " + (muted ? "off" : "on");
};
for (let i = 0; i < 3; i++) {
  const b = document.createElement("button");
  b.id = "ability" + i;
  b.onclick = () => {
    if (i === 1) {
      game.ability(i);
      toast("Weapons overdriven");
    } else {
      cancel();
      aimAbility = i;
      toast(
        "Tap terrain to target " +
          (i === 0 ? "orbital strike" : "field repair"),
      );
    }
  };
  $("actions").append(b);
}
$("start").onclick = () => {
  audioCtx ||= new AudioContext();
  audioCtx.resume();
  initialize();
  playing = true;
  $("menu").hidden = true;
  toast("Colony established · first breach in 12 seconds");
};
$("doctrine").options[1].disabled = record.bosses < 1;
$("doctrine").options[1].textContent += " · unlock: defeat 1 boss";
$("doctrine").options[2].disabled = record.best < 5;
$("doctrine").options[2].textContent += " · unlock: reach wave 5";
$("record").textContent =
  `Best survival: ${record.best} waves · bosses defeated: ${record.bosses}`;
function resize() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener("resize", resize);
resize();
initialize(98741);
let last = performance.now(),
  uiTime = 0,
  signalTime = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  if (playing) {
    game.tick(dt);
    processEvents();
  }
  for (const s of [...game.structures, ...game.enemies]) {
    const m = meshes.get(s.id);
    if (!m) continue;
    m.position.x = s.x;
    m.position.z = s.z;
    if (s.kind != null) {
      m.position.y = s.flying
        ? 2.5 + Math.sin(now * 0.008 + s.phase) * 0.15
        : s.burrow
          ? 0.05
          : 0;
      if (s.target)
        m.rotation.y = Math.atan2(s.target.x - s.x, s.target.z - s.z);
      m.userData.legs?.forEach((l, i) => {
        l.rotation.z = Math.sin(now * 0.009 + s.phase + i * Math.PI) * 0.22;
      });
      m.traverse((o) => {
        if (o.name === "wing") o.rotation.z = Math.sin(now * 0.06) * 0.25;
      });
    } else {
      m.scale.y = s.build > 0 ? 0.3 + (2 - s.build) * 0.35 : 1;
      const turret = m.userData.turret;
      if (turret && s.aim)
        turret.rotation.y = Math.atan2(s.aim.x - s.x, s.aim.z - s.z);
      if (s.type === "mine" && turret) turret.rotation.y += dt * 3;
      if (s.type === "drone")
        m.traverse((o) => {
          if (o.name === "drone")
            o.position.y = 1 + Math.sin(now * 0.003 + o.position.x) * 0.12;
        });
    }
  }
  for (let i = fx.length - 1; i >= 0; i--) {
    const f = fx[i];
    f.life -= dt;
    f.mesh.material.opacity = Math.max(0, f.life / f.max) * 0.6;
    if (f.life <= 0) {
      world.remove(f.mesh);
      f.mesh.geometry.dispose();
      f.mesh.material.dispose();
      fx.splice(i, 1);
    }
  }
  uiTime += dt;
  if (uiTime > 0.25) {
    updateUI();
    uiTime = 0;
  }
  signalTime += dt;
  if (signalTime > 0.5) {
    for (const child of [...signalGroup.children]) {
      child.geometry.dispose();
      child.material.dispose();
    }
    signalGroup.clear();
    if (signalView) {
      for (const s of game.structures) {
        const strength = Math.max(s.heat, s.vibration);
        if (strength > 2) {
          const r = ring(
            2 + strength * 0.18,
            s.heat > s.vibration ? 0xda9862 : 0x88b4bd,
          );
          r.position.set(s.x, 0.07, s.z);
          signalGroup.add(r);
        }
      }
      for (const e of game.enemies) {
        if (!e.target) continue;
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(e.x, 0.2, e.z),
            new THREE.Vector3(e.target.x, 0.2, e.target.z),
          ]),
          new THREE.LineBasicMaterial({
            color: e.signal === "heat" ? 0xda9862 : 0x88b4bd,
            transparent: true,
            opacity: 0.18,
          }),
        );
        signalGroup.add(line);
      }
    }
    signalTime = 0;
  }
  renderEnemies();
  controls.update();
  renderer.render(scene, camera);
}
requestAnimationFrame(frame);
// Read-only QA telemetry; no gameplay state persisted.
window.breach = {
  get state() {
    return {
      wave: game.wave,
      enemies: game.enemies.length,
      structures: game.structures.length,
      dead: game.dead,
      alloy: game.alloy,
      power: game.power,
      available: [...game.available],
      seed: game.seed,
    };
  },
  project(x, z) {
    const v = new THREE.Vector3(x, 0, z).project(camera);
    return {
      x: ((v.x + 1) / 2) * innerWidth,
      y: ((1 - v.y) / 2) * innerHeight,
    };
  },
  get rendererInfo() {
    return renderer.info.render;
  },
};
