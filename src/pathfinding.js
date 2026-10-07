// Internal navigation cells do not constrain continuous structure placement.
export function route(start, target, rocks) {
  const step = 2,
    size = 51;
  const cell = (p) => [
    Math.max(0, Math.min(50, Math.round((p.x + 50) / step))),
    Math.max(0, Math.min(50, Math.round((p.z + 50) / step))),
  ];
  const [sx, sz] = cell(start),
    [tx, tz] = cell(target),
    key = (x, z) => z * size + x;
  const source = key(sx, sz),
    goal = key(tx, tz);
  const open = [source],
    scores = new Map([[source, 0]]),
    parent = new Map(),
    closed = new Set();
  const blocked = (x, z) =>
    rocks.some(
      (r) => Math.hypot(x * step - 50 - r.x, z * step - 50 - r.z) < r.r + 0.65,
    );
  let reached = source;
  let best = Infinity;
  for (let n = 0; n < 3000 && open.length; n++) {
    let idx = 0,
      bestScore = Infinity;
    for (let i = 0; i < open.length; i++) {
      const k = open[i],
        x = k % size,
        z = Math.floor(k / size),
        score = scores.get(k) + Math.hypot(tx - x, tz - z);
      if (score < bestScore) {
        bestScore = score;
        idx = i;
      }
    }
    const current = open.splice(idx, 1)[0],
      x = current % size,
      z = Math.floor(current / size);
    const remaining = Math.hypot(tx - x, tz - z);
    if (remaining < best) {
      best = remaining;
      reached = current;
    }
    if (current === goal) break;
    closed.add(current);
    for (const [dx, dz] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ]) {
      const nx = x + dx,
        nz = z + dz,
        k = key(nx, nz);
      if (
        nx < 0 ||
        nz < 0 ||
        nx >= size ||
        nz >= size ||
        closed.has(k) ||
        (k !== goal && blocked(nx, nz))
      )
        continue;
      if (dx && dz && (blocked(x + dx, z) || blocked(x, z + dz))) continue;
      const cost = scores.get(current) + Math.hypot(dx, dz);
      if (cost < (scores.get(k) ?? Infinity)) {
        scores.set(k, cost);
        parent.set(k, current);
        if (!open.includes(k)) open.push(k);
      }
    }
  }
  const path = [];
  while (reached !== source && parent.has(reached)) {
    path.push({
      x: (reached % size) * step - 50,
      z: Math.floor(reached / size) * step - 50,
    });
    reached = parent.get(reached);
  }
  path.reverse();
  path.push({ x: target.x, z: target.z });
  return path;
}
