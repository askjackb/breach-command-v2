import * as THREE from "three";
const noise = new Uint8Array(128 * 128 * 4);
let seed = 731;
for (let i = 0; i < 128 * 128; i++) {
  seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
  const v = 150 + ((seed >>> 24) % 65);
  noise[i * 4] =
    noise[i * 4 + 1] =
    noise[i * 4 + 2] =
      (i % 128) % 31 === 0 ? v * 0.65 : v;
  noise[i * 4 + 3] = 255;
}
const surface = new THREE.DataTexture(noise, 128, 128);
surface.wrapS = surface.wrapT = THREE.RepeatWrapping;
surface.needsUpdate = true;
const mat = (color, metalness = 0.65, roughness = 0.5) =>
  new THREE.MeshStandardMaterial({
    color,
    metalness,
    roughness,
    map: surface,
    bumpMap: surface,
    bumpScale: 0.035,
  });
// ART_DIRECTION palette — human technology
const steel = mat(0x303b42), // charcoal steel
  slate = mat(0x59656b, 0.55, 0.55), // slate armor
  olive = mat(0x6c7265, 0.5, 0.6), // muted olive
  trim = mat(0xa5a9a0, 0.8, 0.35), // warm titanium
  dark = mat(0x171e23, 0.3, 0.8), // dark rubber / shadow metal
  ochre = mat(0xb7955d, 0.35, 0.55); // faded ochre accent
// ART_DIRECTION palette — biological faction
const shell = mat(0x353e3d, 0.15, 0.55), // dark carapace
  carapace = mat(0x655f51, 0.1, 0.6), // pale shell mass
  horn = mat(0x958770, 0.1, 0.62), // horn / bone
  flesh = mat(0x4c3e37, 0.05, 0.78); // umber flesh
const glow = new THREE.MeshStandardMaterial({
  color: 0x8bb5c2, // sensor cyan
  emissive: 0x4d9da7,
  emissiveIntensity: 1.8,
  metalness: 0.4,
  roughness: 0.3,
});
const wingMat = new THREE.MeshStandardMaterial({
  color: 0x958770,
  transparent: true,
  opacity: 0.55,
  metalness: 0.2,
  roughness: 0.4,
});
export function part(
  group,
  geo,
  material,
  x = 0,
  y = 0,
  z = 0,
  sx = 1,
  sy = 1,
  sz = 1,
) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  m.castShadow = true;
  m.receiveShadow = true;
  group.add(m);
  return m;
}
const box = new THREE.BoxGeometry(1, 1, 1),
  sphere = new THREE.SphereGeometry(1, 20, 12),
  sphereLo = new THREE.SphereGeometry(1, 12, 8),
  cyl = new THREE.CylinderGeometry(1, 1, 1, 20),
  cone = new THREE.ConeGeometry(1, 1, 12),
  flare = new THREE.CylinderGeometry(1, 0.72, 1, 16), // widens toward +Y
  oct = new THREE.CylinderGeometry(1, 1, 1, 8);
function beam(g, a, b, r, m) {
  const v = new THREE.Vector3(...b).sub(new THREE.Vector3(...a));
  const mesh = part(
    g,
    cyl,
    m,
    ...new THREE.Vector3(...a).addScaledVector(v, 0.5).toArray(),
    r,
    v.length(),
    r,
  );
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize());
  return mesh;
}
function bolts(g, y, r, n = 8) {
  for (let i = 0; i < n; i++) {
    const a = (i * Math.PI * 2) / n;
    part(g, cyl, trim, Math.cos(a) * r, y, Math.sin(a) * r, 0.06, 0.05, 0.06);
  }
}
// Torus ring; flat=true lays it around the Y axis, flat=false around Z.
function ring(g, radius, tube, material, x, y, z, flat = true) {
  const m = part(g, new THREE.TorusGeometry(radius, tube, 8, 28), material, x, y, z);
  if (flat) m.rotation.x = Math.PI / 2;
  return m;
}
// Flared collar on a vertical (Y) post.
function collarY(g, r, h, material, x, y, z) {
  const c = part(g, flare, material, x, y, z, r, h, r);
  return c;
}
// Barrel along +Z centred at zc: dark tube, steel jacket, flared muzzle.
function barrelZ(t, x, y, zc, len, r, jacket = steel) {
  const b = part(t, cyl, dark, x, y, zc, r, len, r);
  b.rotation.x = Math.PI / 2;
  const j = part(t, cyl, jacket, x, y, zc - len * 0.18, r * 1.35, len * 0.5, r * 1.35);
  j.rotation.x = Math.PI / 2;
  const mz = part(t, flare, trim, x, y, zc + len / 2, r * 1.5, 0.16, r * 1.5);
  mz.rotation.x = Math.PI / 2;
  const bore = part(t, cyl, dark, x, y, zc + len / 2 + 0.05, r * 0.55, 0.06, r * 0.55);
  bore.rotation.x = Math.PI / 2;
}
// Chain of beams through points (feed routes, hoses, cables).
function run(g, pts, r, m) {
  for (let i = 0; i < pts.length - 1; i++) beam(g, pts[i], pts[i + 1], r, m);
}
// Shared Ø2.5 m tower foundation: skirt, apron, plinth, chamfered feet, bearing.
function towerBase(g) {
  part(g, cyl, dark, 0, 0.11, 0, 1.25, 0.22, 1.25);
  part(g, cyl, slate, 0, 0.3, 0, 1.12, 0.16, 1.12);
  part(g, cyl, steel, 0, 0.48, 0, 0.95, 0.3, 0.95);
  bolts(g, 0.64, 0.78);
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const ca = Math.cos(a),
      sa = Math.sin(a);
    const foot = part(g, box, olive, ca * 0.88, 0.3, sa * 0.88, 0.66, 0.34, 0.42);
    foot.rotation.y = -a;
    const toe = part(g, box, slate, ca * 1.08, 0.16, sa * 1.08, 0.4, 0.1, 0.44);
    toe.rotation.order = "YXZ";
    toe.rotation.y = -a;
    toe.rotation.x = 0.45;
    part(g, box, dark, ca * 0.62, 0.52, sa * 0.62, 0.3, 0.22, 0.3).rotation.y = -a;
  }
  part(g, cyl, dark, 0, 0.74, 0, 0.62, 0.26, 0.62);
  part(g, cyl, trim, 0, 0.9, 0, 0.52, 0.16, 0.52);
  ring(g, 0.56, 0.045, slate, 0, 0.99, 0);
}
// Shared combat-turret chassis; family builders add their weapon systems.
function turretChassis(t) {
  part(t, box, steel, 0, 0.28, 0, 1.3, 0.56, 1.15);
  part(t, box, slate, 0, 0.62, 0, 1.1, 0.14, 0.95);
  part(t, box, dark, 0, 0.3, -0.66, 0.9, 0.5, 0.35); // rear counterweight
  for (const s of [-1, 1]) {
    const cheek = part(t, box, slate, s * 0.68, 0.32, 0.05, 0.14, 0.52, 0.95);
    cheek.rotation.z = -s * 0.1;
    part(t, box, ochre, s * 0.72, 0.44, 0.05, 0.05, 0.1, 0.6);
    part(t, box, dark, s * 0.5, 0.18, 0.52, 0.3, 0.22, 0.1);
  }
  for (const sx of [-0.6, 0.6])
    for (const sz of [-0.5, 0.5])
      part(t, box, trim, sx, 0.3, sz, 0.07, 0.56, 0.07);
  const blister = part(t, sphereLo, glow, 0, 0.74, -0.3, 0.11, 0.08, 0.11);
  blister.name = "sensor";
}
function buildAutocannon(t, tier, branch, quad) {
  for (const s of [-1, 1]) part(t, box, trim, s * 0.3, 0.16, 0.8, 0.09, 0.1, 1.3);
  for (const x of [-0.3, 0.3]) barrelZ(t, x, 0.36, 1.05, 1.8, 0.105);
  if (quad) for (const x of [-0.3, 0.3]) barrelZ(t, x, 0.68, 0.95, 1.6, 0.095);
  const drumR = branch === 1 ? 0.34 : tier >= 1 ? 0.3 : 0.26;
  for (const s of [-1, 1]) {
    const d = part(t, cyl, dark, s * 0.52, 0.42, -0.38, drumR, 0.3, drumR);
    d.rotation.x = Math.PI / 2;
    ring(t, drumR * 0.65, 0.03, trim, s * 0.52, 0.42, -0.2, false);
    run(
      t,
      [
        [s * 0.52, 0.62, -0.35],
        [s * 0.42, 0.56, 0.05],
        [s * 0.3, 0.42, 0.45],
      ],
      0.05,
      dark,
    );
  }
  if (tier >= 1)
    for (const s of [-1, 1]) part(t, box, slate, s * 0.62, 0.14, -0.15, 0.5, 0.2, 1.0);
  if (tier >= 2) {
    part(t, box, steel, 0, 0.42, -0.72, 0.95, 0.55, 0.4);
    for (const x of [-0.3, 0.3])
      for (let i = 0; i < 3; i++)
        part(t, box, dark, x, 0.53, 0.55 + i * 0.22, 0.2, 0.05, 0.12);
  }
  if (branch === 0) {
    // Sabot: elongated precision sleeves + ammunition selector
    for (const x of [-0.3, 0.3]) {
      const s = part(t, cyl, slate, x, 0.36, 2.2, 0.085, 0.6, 0.085);
      s.rotation.x = Math.PI / 2;
    }
    part(t, box, steel, 0, 0.52, 0.05, 0.34, 0.28, 0.45);
    part(t, box, ochre, 0, 0.52, -0.42, 0.5, 0.35, 0.3);
  }
  if (branch === 1)
    for (const x of [-0.58, 0.58]) barrelZ(t, x, 0.36, 0.95, 1.5, 0.09);
}
function buildRailgun(t, tier, branch) {
  part(t, box, dark, 0, 0.42, 1.05, 0.46, 0.42, 3.0);
  for (const s of [-1, 1]) part(t, box, trim, s * 0.27, 0.46, 1.15, 0.09, 0.3, 2.9);
  const strips = tier >= 2 ? 7 : 5;
  for (let i = 0; i < strips; i++)
    part(t, box, glow, 0, 0.66, 0.2 + i * 0.4, 0.26, 0.05, 0.14);
  const coils = tier >= 1 ? 5 : 3;
  for (let i = 0; i < coils; i++) ring(t, 0.37, 0.06, trim, 0, 0.44, 0.05 + i * 0.55, false);
  for (let i = 0; i < 3; i++) {
    const cap = part(t, cyl, slate, 0, 0.14, 0.3 + i * 0.65, 0.17, 0.36, 0.17);
    cap.rotation.z = Math.PI / 2;
  }
  if (tier >= 2)
    for (const s of [-1, 1]) {
      part(t, box, slate, s * 0.52, 0.35, 0.55, 0.28, 0.5, 1.3);
      part(t, box, glow, s * 0.52, 0.62, 0.55, 0.2, 0.05, 1.0);
    }
  if (branch === 0) {
    for (const s of [-1, 1]) part(t, box, trim, s * 0.27, 0.46, 2.85, 0.09, 0.3, 0.7);
    ring(t, 0.3, 0.05, ochre, 0, 0.46, 3.2, false);
  }
  if (branch === 1) {
    part(t, box, dark, 0, 0.82, 0.9, 0.34, 0.25, 2.2);
    for (const s of [-1, 1]) part(t, box, trim, s * 0.2, 0.84, 0.95, 0.07, 0.18, 2.1);
  }
}
function buildMissile(t, tier, branch) {
  for (const s of [-1, 1]) {
    part(t, box, steel, s * 0.72, 0.52, 0.15, 0.6, 0.95, 1.5);
    part(t, box, dark, s * 0.72, 0.52, 0.93, 0.54, 0.85, 0.06);
    part(t, box, slate, s * 0.72, 1.05, 0.15, 0.64, 0.12, 1.55);
    const cols = branch === 0 ? 3 : 2;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < cols; j++) {
        const m = part(
          t,
          cyl,
          dark,
          s * 0.72 - (cols - 1) * 0.13 + j * 0.26,
          0.28 + i * 0.26,
          0.97,
          0.095,
          0.08,
          0.095,
        );
        m.rotation.x = Math.PI / 2;
        ring(t, 0.1, 0.02, trim, s * 0.72 - (cols - 1) * 0.13 + j * 0.26, 0.28 + i * 0.26, 0.98, false);
      }
    const ex = part(t, flare, dark, s * 0.72, 0.35, -0.72, 0.2, 0.25, 0.2);
    ex.rotation.x = -Math.PI / 2;
    if (tier >= 1) part(t, box, slate, s * 1.06, 0.52, 0.15, 0.1, 0.8, 1.3);
  }
  if (tier >= 2) {
    part(t, box, dark, 0, 0.25, -0.85, 1.5, 0.12, 0.5);
    for (let i = 0; i < 4; i++) {
      const m = part(t, cyl, trim, -0.55 + i * 0.36, 0.45, -0.85, 0.09, 0.95, 0.09);
      m.rotation.x = Math.PI / 2;
      part(t, cone, ochre, -0.55 + i * 0.36, 0.45, -0.32, 0.09, 0.22, 0.09).rotation.x =
        Math.PI / 2;
    }
  }
  if (branch === 1) {
    part(t, box, steel, 0, 0.95, 0.1, 0.5, 0.45, 1.1);
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) {
        const m = part(t, cyl, dark, -0.13 + j * 0.26, 0.85 + i * 0.22, 0.68, 0.09, 0.08, 0.09);
        m.rotation.x = Math.PI / 2;
      }
  }
}
function buildThermal(t, tier, branch, cryo) {
  const tankMat = cryo ? trim : olive;
  if (branch === 0) {
    for (const x of [-0.2, 0.2]) barrelZ(t, x, 0.42, 0.9, 1.4, 0.15);
  } else {
    barrelZ(t, 0, 0.42, 0.95, 1.5, 0.24, cryo ? slate : steel);
  }
  if (branch === 1) {
    const f = part(t, flare, dark, 0, 0.42, 1.78, 0.42, 0.3, 0.42);
    f.rotation.x = Math.PI / 2;
    ring(t, 0.3, 0.04, glow, 0, 0.42, 1.62, false);
  }
  for (const s of [-1, 1]) {
    part(t, cyl, tankMat, s * 0.66, 0.42, -0.25, 0.24, 0.95, 0.24);
    ring(t, 0.24, 0.035, cryo ? glow : ochre, s * 0.66, 0.68, -0.25);
    ring(t, 0.24, 0.035, dark, s * 0.66, 0.18, -0.25);
    run(
      t,
      [
        [s * 0.66, 0.86, -0.25],
        [s * 0.4, 0.72, 0.3],
        [0, 0.52, 0.6],
      ],
      0.055,
      dark,
    );
  }
  part(t, sphereLo, glow, 0, 0.42, 0.32, 0.09, 0.09, 0.09);
  if (tier >= 1) {
    const shield = part(t, box, slate, 0, 0.5, 0.72, 1.05, 0.75, 0.08);
    shield.rotation.x = -0.12;
  }
  if (tier >= 2) {
    part(t, cyl, tankMat, 0, 0.55, -0.62, 0.28, 1.1, 0.28);
    ring(t, 0.28, 0.04, cryo ? glow : ochre, 0, 0.8, -0.62);
    run(t, [[0, 1.05, -0.62], [0, 0.7, -0.1]], 0.05, dark);
  }
}
function buildArc(t, tier, branch) {
  const h = tier >= 2 ? 1.55 : 1.25;
  const xs = branch === 0 ? [-0.42, 0, 0.42] : [-0.42, 0.42];
  for (const x of xs) {
    part(t, cyl, dark, x, 0.12, 0, 0.19, 0.24, 0.19);
    collarY(t, 0.16, 0.2, slate, x, 0.3, 0);
    part(t, cyl, trim, x, 0.3 + h / 2, 0, 0.1, h, 0.1);
    const n = tier >= 1 ? 5 : 4;
    for (let i = 0; i < n; i++)
      part(
        t,
        cyl,
        glow,
        x,
        0.55 + (i * (h - 0.35)) / (n - 1),
        0,
        branch === 1 ? 0.3 : 0.22,
        0.09,
        branch === 1 ? 0.3 : 0.22,
      );
    part(t, sphereLo, trim, x, 0.38 + h, 0, 0.09, 0.09, 0.09);
  }
  beam(t, [-0.42, 0.42 + h, 0], [0.42, 0.42 + h, 0], 0.05, trim);
  if (tier >= 2) for (let i = 0; i < 3; i++) ring(t, 0.3, 0.05, trim, 0, 0.4 + i * 0.24, 0);
}
function buildMortar(t, tier, branch) {
  part(t, box, slate, 0, 0.06, 0.3, 1.05, 0.12, 1.05);
  for (let i = 0; i < 3; i++) part(t, box, dark, 0, 0.15, 0.05 + i * 0.25, 0.9, 0.06, 0.08);
  const tubes = branch === 1 ? [-0.34, 0.34] : [0];
  for (const x of tubes) {
    const r = branch === 1 ? 0.26 : tier >= 2 ? 0.38 : 0.34;
    const len = branch === 0 ? 2.2 : 1.8;
    const tube = part(t, cyl, dark, x, 0.85, 0.45, r, len, r);
    tube.rotation.x = 0.6;
    const mz = ring(t, r + 0.02, 0.06, trim, x, 0.85 + Math.cos(0.6) * (len / 2), 0.45 + Math.sin(0.6) * (len / 2), false);
    mz.rotation.x = 0.6 - Math.PI / 2;
    const jr = ring(t, r * 1.12, 0.045, steel, x, 0.85, 0.45, false);
    jr.rotation.x = 0.6 - Math.PI / 2;
    beam(t, [x, 1.0, 0.72], [x - 0.55, 0.05, 1.05], 0.05, trim);
    beam(t, [x, 1.0, 0.72], [x + 0.55, 0.05, 1.05], 0.05, trim);
  }
  part(t, box, olive, 0.8, 0.24, -0.35, 0.6, 0.36, 0.45);
  for (let i = 0; i < 3; i++) {
    const s = part(t, cone, trim, 0.62 + i * 0.18, 0.56, -0.35, 0.085, 0.3, 0.085);
  }
  if (tier >= 1) part(t, box, olive, 0.8, 0.58, -0.35, 0.55, 0.3, 0.4);
}
function buildDrone(t, tier, branch) {
  part(t, box, steel, 0, 0.38, 0, 2.0, 0.5, 1.8);
  part(t, box, slate, 0, 0.67, 0, 1.9, 0.08, 1.7);
  for (const s of [-1, 1]) {
    part(t, box, ochre, s * 0.7, 0.72, 0, 0.5, 0.02, 1.2);
    part(t, box, glow, s * 0.7, 0.68, 0, 0.05, 0.04, 1.3);
  }
  part(t, cyl, trim, -0.8, 1.0, -0.7, 0.04, 0.7, 0.04);
  part(t, sphereLo, glow, -0.8, 1.4, -0.7, 0.06, 0.06, 0.06);
  const spots = tier >= 2 ? [-0.7, 0, 0.7] : [-0.7, 0.7];
  spots.forEach((x, i) => {
    const d = new THREE.Group();
    d.name = "drone";
    t.add(d);
    d.position.set(x, 1.05, i === 1 && tier >= 2 ? -0.45 : 0.3);
    part(d, box, olive, 0, 0, 0, 0.42, 0.16, 0.62);
    part(d, box, slate, 0, 0.11, 0, 0.3, 0.06, 0.4);
    for (const rx of [-0.27, 0.27]) part(d, cyl, dark, rx, 0.07, 0, 0.19, 0.05, 0.19);
    part(d, sphereLo, glow, 0, 0, 0.36, 0.07, 0.07, 0.07);
    if (branch === 0) part(d, cyl, trim, 0, -0.15, 0, 0.13, 0.14, 0.13);
    if (branch === 1) part(d, box, dark, 0, -0.17, 0, 0.32, 0.15, 0.32);
  });
}
function buildSeismic(t, tier, branch) {
  part(t, cyl, dark, 0, 0.62, 0, 0.62, 1.15, 0.62);
  const n = 4 + tier;
  for (let i = 0; i < n; i++) part(t, cyl, trim, 0, 0.3 + i * 0.23, 0, 0.7, 0.07, 0.7);
  collarY(t, 0.5, 0.22, slate, 0, 1.22, 0);
  part(t, cyl, olive, 0, 1.48, 0, 0.42, 0.5, 0.42);
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2 + Math.PI / 4;
    part(t, cyl, trim, Math.cos(a) * 0.52, 0.9, Math.sin(a) * 0.52, 0.06, 0.95, 0.06);
  }
  for (const s of [-1, 1]) part(t, box, ochre, s * 0.65, 0.55, 0, 0.04, 0.32, 0.5);
  if (branch === 0) {
    part(t, cyl, dark, 0, 1.9, 0, 0.3, 0.45, 0.3);
    part(t, cyl, glow, 0, 2.18, 0, 0.31, 0.1, 0.31);
  }
  if (branch === 1)
    for (let i = 0; i < 3; i++) part(t, cyl, slate, 0, 0.32 + i * 0.3, 0, 0.84, 0.08, 0.84);
}
function buildSupport(g, turret, type, tier) {
  part(g, box, steel, 0, 0.98, 0, 1.5, 1.05, 1.5);
  part(g, box, slate, 0, 1.56, 0, 1.3, 0.12, 1.3);
  for (let i = 0; i < 5; i++)
    part(g, box, dark, 0.77, 0.7 + i * 0.14, 0, 0.06, 0.06, 1.0);
  for (const s of [-1, 1]) part(g, box, ochre, s * 0.4, 1.35, 0.78, 0.3, 0.08, 0.04);
  if (type === "mine") {
    beam(g, [-0.6, 1.4, 0], [0.45, 3.2, 0], 0.13, trim);
    beam(g, [0.6, 1.4, 0], [-0.45, 3.2, 0], 0.13, trim);
    beam(g, [-0.45, 3.2, 0], [0.45, 3.2, 0], 0.08, trim);
    const winch = part(g, cyl, dark, 0, 3.2, 0, 0.16, 0.5, 0.16);
    winch.rotation.z = Math.PI / 2;
    beam(g, [0, 3.15, 0], [0.5, 2.25, 0], 0.03, dark);
    part(turret, cone, trim, 0.5, 1.75, 0, 0.42, 2.1, 0.42);
    ring(turret, 0.3, 0.04, ochre, 0.5, 2.35, 0);
    part(g, box, olive, -0.55, 1.35, 0.35, 0.55, 0.6, 0.8);
    part(g, new THREE.DodecahedronGeometry(1, 0), carapace, -0.55, 1.78, 0.35, 0.18, 0.14, 0.18);
  } else if (type === "generator") {
    for (const x of [-0.42, 0.42]) {
      part(g, cyl, dark, x, 1.95, 0, 0.3, 1.35, 0.3);
      collarY(g, 0.34, 0.22, slate, x, 1.42, 0);
      ring(g, 0.3, 0.04, trim, x, 2.32, 0);
      part(g, cyl, glow, x, 2.7, 0, 0.26, 0.16, 0.26);
    }
    for (let i = 0; i < 6; i++) part(g, box, trim, 0, 0.75 + i * 0.11, 0.82, 1.3, 0.05, 0.05);
    run(g, [[-0.42, 1.5, 0.2], [-0.95, 0.7, 0.7]], 0.05, dark);
    run(g, [[0.42, 1.5, 0.2], [0.95, 0.7, 0.7]], 0.05, dark);
  } else {
    part(g, cyl, trim, 0, 2.0, 0, 0.15, 1.6, 0.15);
    collarY(g, 0.24, 0.25, slate, 0, 1.32, 0);
    const m = type === "heat" ? ochre : glow;
    for (let i = 0; i < 3; i++) ring(g, 0.52 - i * 0.1, 0.06, m, 0, 1.78 + i * 0.32, 0);
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      part(g, box, slate, Math.cos(a) * 0.95, 0.78, Math.sin(a) * 0.95, 0.08, 0.95, 0.42).rotation.y =
        -a;
    }
    if (tier > 0) ring(g, 0.64, 0.05, m, 0, 1.45, 0);
  }
}
function buildReactor(g) {
  part(g, oct, dark, 0, 0.2, 0, 3, 0.4, 3);
  ring(g, 2.6, 0.09, slate, 0, 0.42, 0);
  part(g, cyl, steel, 0, 1.5, 0, 1.8, 2.6, 1.8);
  part(g, cyl, dark, 0, 0.95, 0, 1.88, 0.55, 1.88);
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    part(g, box, slate, Math.cos(a) * 1.87, 0.95, Math.sin(a) * 1.87, 0.3, 0.4, 0.08).rotation.y =
      Math.PI / 2 - a;
  }
  part(g, cyl, glow, 0, 2.95, 0, 1.15, 0.25, 1.15);
  part(g, flare, dark, 0, 3.3, 0, 1.5, 0.4, 1.5);
  part(g, cyl, trim, 0, 3.62, 0, 0.5, 0.25, 0.5);
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3,
      ca = Math.cos(a),
      sa = Math.sin(a);
    part(g, box, olive, ca * 2.05, 1.5, sa * 2.05, 0.65, 2.7, 0.9).rotation.y = -a;
    beam(g, [ca * 2.05, 0.35, sa * 2.05], [ca * 1.35, 3.25, sa * 1.35], 0.11, trim);
    part(g, box, dark, ca * 2.38, 0.85, sa * 2.38, 0.1, 1.3, 0.5).rotation.y = -a;
  }
  run(g, [[2.9, 0.45, 0.6], [2.2, 0.9, 0.45], [1.87, 1.5, 0.3]], 0.09, trim);
  run(g, [[-2.9, 0.45, -0.6], [-2.2, 0.9, -0.45], [-1.87, 1.5, -0.3]], 0.09, trim);
  part(g, box, slate, 0, 1.62, 1.83, 0.7, 0.95, 0.08);
  part(g, sphereLo, ochre, 0.24, 1.62, 1.9, 0.06, 0.06, 0.06);
  part(g, cyl, trim, 0, 4.05, 0, 0.11, 1.25, 0.11);
  part(g, sphereLo, glow, 0, 4.74, 0, 0.12, 0.12, 0.12);
}
export function towerModel(type, tier = 0, branch = null) {
  const g = new THREE.Group();
  g.name = type;
  const turret = new THREE.Group();
  turret.name = "turret";
  g.add(turret);
  g.userData.turret = turret;
  if (type === "reactor") {
    buildReactor(g);
    return g;
  }
  towerBase(g);
  if (["mine", "generator", "heat", "vibration"].includes(type)) {
    buildSupport(g, turret, type, tier);
    return g;
  }
  turret.position.y = 1.05;
  turretChassis(turret);
  switch (type) {
    case "autocannon":
      buildAutocannon(turret, tier, branch, false);
      break;
    case "flak":
      buildAutocannon(turret, tier, branch, true);
      break;
    case "railgun":
      buildRailgun(turret, tier, branch);
      break;
    case "missile":
      buildMissile(turret, tier, branch);
      break;
    case "incinerator":
      buildThermal(turret, tier, branch, false);
      break;
    case "cryo":
      buildThermal(turret, tier, branch, true);
      break;
    case "arc":
      buildArc(turret, tier, branch);
      break;
    case "mortar":
      buildMortar(turret, tier, branch);
      break;
    case "drone":
      buildDrone(turret, tier, branch);
      break;
    case "seismic":
      buildSeismic(turret, tier, branch);
      break;
  }
  return g;
}
// Per-class anatomy: abdomen scale, leg reach multiplier, leg thickness.
const ENEMY_STYLE = [
  { body: [0.42, 0.38, 0.74], leg: 1.0, legR: 0.055 }, // 0 Skitter
  { body: [0.85, 0.52, 1.05], leg: 1.1, legR: 0.09 }, // 1 Bastion
  { body: [0.4, 0.42, 0.88], leg: 1.05, legR: 0.05 }, // 2 Razor
  { body: [0.56, 0.5, 0.9], leg: 0.8, legR: 0.07 }, // 3 Burrower
  { body: [0.38, 0.4, 0.8], leg: 1.35, legR: 0.045 }, // 4 Climber
  { body: [0.4, 0.4, 0.75], leg: 0.9, legR: 0.04 }, // 5 Wasp
  { body: [0.62, 0.52, 1.0], leg: 1.1, legR: 0.08 }, // 6 Artillery
  { body: [0.5, 0.48, 0.8], leg: 1.0, legR: 0.06 }, // 7 Mender
  { body: [0.42, 0.4, 0.85], leg: 1.15, legR: 0.05 }, // 8 Tracker
  { body: [0.8, 0.52, 1.1], leg: 1.1, legR: 0.085 }, // 9 Brood carrier
];
export function enemyModel(kind, boss = null) {
  const g = new THREE.Group();
  g.name = boss != null ? "boss-" + boss : "enemy-" + kind;
  const legs = [];
  g.userData.legs = legs;
  const heavy = [1, 9].includes(kind) || boss != null;
  const st = ENEMY_STYLE[kind] || ENEMY_STYLE[0];
  const [bx, by, bz] = st.body;
  const body = part(g, sphere, flesh, 0, 0.65, 0, bx, by, bz);
  body.name = "abdomen";
  part(g, sphere, shell, 0, 0.88, -0.12, bx * 1.08, by * 0.62, bz * 0.95);
  const plates = kind === 0 ? 5 : heavy ? 4 : 3;
  for (let i = 0; i < plates; i++)
    part(g, sphereLo, carapace, 0, 0.94 - Math.abs(i - 1) * 0.04, 0.28 - i * 0.22, bx * 0.95, 0.1, 0.24);
  if (kind === 0 || kind === 3) {
    const w = part(g, cone, horn, 0, 0.62, bz + 0.3, kind === 3 ? 0.3 : 0.24, 0.55, kind === 3 ? 0.3 : 0.24);
    w.rotation.x = Math.PI / 2;
  } else {
    part(g, sphere, horn, 0, 0.62, bz * 0.85, 0.34, 0.29, 0.34);
  }
  for (const x of [-0.2, 0.2]) {
    part(g, sphereLo, glow, x, 0.74, bz * 0.85 + 0.24, 0.07, 0.06, 0.05);
    beam(g, [x, 0.55, bz * 0.85 + 0.1], [x * 1.9, 0.4, bz + 0.55], 0.05, horn);
  }
  // Legs are the ONLY direct-child Groups of the root (runtime contract:
  // main.js collects every direct-child Group as a leg and rotates it).
  for (let i = 0; i < 3; i++) {
    for (const side of [-1, 1]) {
      const leg = new THREE.Group();
      leg.position.set(side * bx * 0.8, 0.55, -bz * 0.6 + i * bz * 0.55);
      g.add(leg);
      const out = 0.55 * st.leg,
        drop = 0.52 * Math.min(st.leg, 1.2);
      beam(leg, [0, 0, 0], [side * out, 0.08, 0.12], st.legR, horn);
      part(leg, sphereLo, shell, side * out, 0.08, 0.12, 0.11, 0.1, 0.11);
      beam(leg, [side * out, 0.08, 0.12], [side * (out + 0.22), -drop, 0.38], st.legR * 0.8, shell);
      const foot = part(leg, cone, horn, side * (out + 0.22), -drop - 0.06, 0.38, 0.06, 0.16, 0.06);
      foot.rotation.x = Math.PI;
      legs.push(leg);
    }
  }
  for (let i = 0; i < (heavy ? 7 : 3); i++) {
    const s = part(g, cone, horn, 0, 1.02, -0.65 + i * 0.2, 0.11, 0.42, 0.11);
    s.rotation.x = -0.4;
  }
  if (kind === 1) {
    part(g, sphere, shell, 0, 0.72, bz * 0.72, 0.78, 0.64, 0.32);
    part(g, sphere, carapace, 0, 0.78, bz * 0.66, 0.6, 0.5, 0.3);
    for (const s of [-1, 1]) part(g, box, shell, s * (bx + 0.12), 0.7, 0, 0.14, 0.55, 0.8);
  }
  if (kind === 2) {
    for (let i = 0; i < 3; i++) {
      const b = part(g, cone, horn, 0, 1.06, 0.15 - i * 0.3, 0.16, 0.55, 0.05);
      b.rotation.x = -0.5;
    }
    for (const s of [-1, 1]) {
      const b = part(g, cone, horn, s * 0.48, 0.82, 0.42, 0.12, 0.5, 0.04);
      b.rotation.z = s * 0.5;
    }
  }
  if (kind === 3)
    for (let i = 0; i < 4; i++) ring(g, 0.42, 0.07, horn, 0, 0.55, -0.65 + i * 0.26, false);
  if (kind === 4)
    for (const s of [-1, 1]) {
      const h = part(g, cone, horn, s * 0.3, 1.08, 0.32, 0.1, 0.42, 0.1);
      h.rotation.x = -0.9;
    }
  if (kind === 5) {
    for (const side of [-1, 1]) {
      const wing = part(g, sphere, wingMat, side * 0.9, 0.95, -0.15, 0.88, 0.025, 0.52);
      wing.name = "wing";
      part(g, sphereLo, shell, side * 0.35, 0.85, -0.1, 0.18, 0.12, 0.3);
    }
    const sting = part(g, cone, horn, 0, 0.6, -bz - 0.28, 0.12, 0.5, 0.12);
    sting.rotation.x = -Math.PI / 2;
    g.position.y = 2;
  }
  if (kind === 6 || boss === 1)
    for (const side of [-1, 1]) {
      beam(g, [side * 0.3, 1.0, -0.1], [side * 0.52, 1.55, 0.85], 0.17, shell);
      ring(g, 0.2, 0.045, horn, side * 0.52, 1.55, 0.85, false);
    }
  if (kind === 7) {
    part(g, sphere, glow, 0, 0.82, -0.62, 0.3, 0.24, 0.32);
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      part(g, sphereLo, glow, Math.cos(a) * 0.42, 0.86, -0.6 + Math.sin(a) * 0.3, 0.08, 0.08, 0.08);
    }
  }
  if (kind === 8) {
    const c = part(g, cone, horn, 0, 1.18, 0.45, 0.2, 0.95, 0.2);
    c.rotation.x = 0.35;
    for (let i = 0; i < 3; i++)
      beam(g, [(i - 1) * 0.12, 0.9, 0.5], [(i - 1) * 0.3, 1.5, 0.8], 0.03, horn);
    part(g, sphereLo, glow, 0, 1.04, 0.64, 0.09, 0.09, 0.09);
  }
  if (kind === 9 || boss === 2) {
    part(g, sphere, flesh, 0, 0.35, -0.35, 0.55, 0.4, 0.7);
    for (const side of [-1, 1])
      for (let i = 0; i < 3; i++)
        part(g, sphereLo, carapace, side * 0.62, 0.8, -0.6 + i * 0.38, 0.24, 0.24, 0.24);
  }
  if (boss != null) {
    g.scale.setScalar(3.3);
    for (const side of [-1, 1])
      beam(g, [side * 0.5, 0.85, 0.2], [side * 1.55, 1.65, 1.4], 0.15, horn);
    if (boss === 0) {
      part(g, cone, shell, 0, 1.35, -0.5, 0.72, 1.25, 0.72);
      ring(g, 0.82, 0.1, carapace, 0, 0.92, -0.3);
      for (const s of [-1, 1])
        part(g, box, horn, s * 0.44, 0.35, 0.78, 0.18, 0.32, 0.7).rotation.x = 0.2;
    }
    if (boss === 1)
      for (const s of [-1, 1]) part(g, sphere, shell, s * 0.72, 0.75, 0, 0.36, 0.52, 0.82);
    if (boss === 2) {
      for (let i = 0; i < 5; i++)
        beam(g, [0, 1.05, -0.5], [Math.sin(i * 1.26) * 1.1, 1.95, Math.cos(i * 1.26) * 0.7 - 0.2], 0.09, horn);
      part(g, sphere, glow, 0, 0.48, -0.85, 0.42, 0.36, 0.46);
    }
  }
  return g;
}
export function featureModel(type) {
  if (type === 0) return towerModel("vibration");
  if (type === 3) return towerModel("generator");
  if (type === 5) {
    const g = towerModel("mine");
    g.scale.setScalar(0.8);
    return g;
  }
  const g = new THREE.Group();
  g.name = "feature-" + type;
  if (type === 1) {
    part(g, cyl, dark, 0, 0.1, 0, 1.4, 0.2, 1.4);
    part(g, oct, slate, 0, 0.32, 0, 0.75, 0.3, 0.75);
    ring(g, 0.85, 0.06, trim, 0, 0.5, 0);
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      part(g, cyl, glow, Math.cos(a) * 0.92, 0.42, Math.sin(a) * 0.92, 0.13, 0.26, 0.13);
      part(g, box, dark, Math.cos(a) * 0.55, 0.56, Math.sin(a) * 0.55, 0.12, 0.26, 0.12).rotation.y =
        -a;
    }
    part(g, sphere, glow, 0, 0.64, 0, 0.16, 0.12, 0.16);
  } else {
    for (let i = 0; i < 5; i++) {
      const m = part(
        g,
        new THREE.DodecahedronGeometry(1, 1),
        type === 2 ? ochre : i % 2 ? carapace : shell,
        Math.sin(i * 2) * 1.0,
        0.5,
        Math.cos(i * 2) * 1.0,
        0.7,
        0.7 + i * 0.28,
        0.7,
      );
      m.rotation.set(i, 0.7 * i, 0.2);
    }
    part(g, new THREE.DodecahedronGeometry(1, 0), shell, 0.3, 0.22, -0.4, 0.5, 0.42, 0.5).rotation.set(
      0.4,
      1.1,
      0,
    );
  }
  return g;
}
