/* gdbx-mine-worker.js — Mining.GDBx proof-of-support worker (single thread).
 * SHA-256 share loop with CPU throttle (burst + sleep). No network, no wallet.
 * Commands: {cmd:'start',seed,throttle,difficulty,nonce} / {cmd:'stop'} / {cmd:'throttle',value}
 * Posts: {type:'tick',hashes,uptimeMs} / {type:'share',nonce,hash} / {type:'stopped'}
 */
let running = false;
let throttle = 0.25; // 0.1 - 0.5 (10%-50% CPU)
let difficulty = 2;  // leading-zero hex chars (demo: 2 => ~1/256 per hash)
let seed = "gdmx";
let nonce = 0;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sha256hex(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  const a = new Uint8Array(b);
  let h = "";
  for (let i = 0; i < a.length; i++) h += a[i].toString(16).padStart(2, "0");
  return h;
}

async function loop() {
  const target = "0".repeat(difficulty);
  const t0 = Date.now();
  let hashes = 0;
  while (running) {
    // work burst ~100ms, then sleep to hold CPU at `throttle`
    const burstEnd = Date.now() + 100;
    while (running && Date.now() < burstEnd) {
      const h = await sha256hex(seed + ":" + (nonce++));
      hashes++;
      if (h.startsWith(target)) {
        postMessage({ type: "share", nonce: nonce - 1, hash: h });
      }
    }
    postMessage({ type: "tick", hashes, uptimeMs: Date.now() - t0 });
    hashes = 0;
    const sleepMs = Math.round(100 * (1 - throttle) / Math.max(throttle, 0.05));
    await sleep(sleepMs);
  }
  postMessage({ type: "stopped" });
}

onmessage = (e) => {
  const d = e.data || {};
  if (d.cmd === "start") {
    if (running) return;
    running = true;
    throttle = Math.min(0.5, Math.max(0.05, Number(d.throttle) || 0.25));
    difficulty = Math.min(4, Math.max(1, Number(d.difficulty) || 2));
    seed = String(d.seed || "gdmx");
    nonce = Number(d.nonce) || 0;
    loop();
  } else if (d.cmd === "stop") {
    running = false;
  } else if (d.cmd === "throttle") {
    throttle = Math.min(0.5, Math.max(0.05, Number(d.value) || throttle));
  }
};
