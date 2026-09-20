/* mine.js — GDMxMine embed SDK (third-party sites).
 * Usage:
 *   <script src="https://gdmx.pages.dev/sdk/mine.js"></script>
 *   <script>
 *     GDMxMine.start({ to: "0xDev...", throttle: 0.25, onShare, onTick });
 *     // ad-free while mining:
 *     if (GDMxMine.isMining()) hideAds(); else showAds();
 *     // time pass via donate:
 *     GDMxMine.grantPassMinutes(60); // after GDMxGateway checkout success
 *   </script>
 * Honest model: proof-of-support credits (demo), NOT real coin profit mining.
 */
(function () {
  const PASS_KEY = "gdmx_adfree_until";
  let worker = null, mining = false, leaderBC = null, isLeader = true;
  const listeners = { share: [], tick: [], stop: [] };
  const emit = (k, d) => (listeners[k] || []).forEach((f) => { try { f(d); } catch {} });

  function electLeader() {
    try {
      leaderBC = new BroadcastChannel("gdmx-mine-leader");
      const id = Math.random().toString(36).slice(2);
      let otherAlive = false;
      leaderBC.onmessage = (e) => {
        if (e.data === "who-mines" && mining) leaderBC.postMessage("i-mine:" + id);
        if (String(e.data).startsWith("i-mine:") && mining) { stop("other-tab"); }
      };
      leaderBC.postMessage("who-mines");
      setTimeout(() => {}, 0);
      return true;
    } catch { return true; }
  }

  function workerUrl() {
    // Same-origin on gdmx.pages.dev + localhost dev; CORS absolute for third-party
    // embeds (/js/* serves Access-Control-Allow-Origin: * — see public/_headers).
    try {
      const h = (typeof location !== "undefined" && location.hostname) || "";
      if (/gdmx\.pages\.dev$/.test(h) || h === "localhost" || h === "127.0.0.1") return "/js/gdbx-mine-worker.js";
    } catch {}
    return "https://gdmx.pages.dev/js/gdbx-mine-worker.js";
  }

  function start(opts) {
    opts = opts || {};
    if (mining) return false;
    if (!opts.to) throw new Error("GDMxMine: `to` developer address required");
    electLeader();
    lastOpts = { to: opts.to, throttle: opts.throttle || 0.25, difficulty: opts.difficulty || 2 };
    try { if (worker) worker.terminate(); } catch {}
    worker = null;
    worker = new Worker(workerUrl());
    const state = { shares: 0, hashes: 0, t0: Date.now() };
    worker.onmessage = (e) => {
      const d = e.data || {};
      if (d.type === "tick") { state.hashes += d.hashes; emit("tick", { ...d, shares: state.shares }); }
      if (d.type === "share") { state.shares++; emit("share", { ...d, to: opts.to, shares: state.shares }); }
      if (d.type === "stopped") { mining = false; emit("stop", {}); }
    };
    worker.postMessage({
      cmd: "start", seed: "gdmx:" + String(opts.to).toLowerCase(),
      throttle: opts.throttle || 0.25, difficulty: opts.difficulty || 2,
    });
    mining = true;
    // auto-pause when tab hidden (Gemini review: full pause, no background throttle bugs)
    const onVis = () => { if (document.hidden && mining) pause(); };
    document.addEventListener("visibilitychange", onVis);
    worker._visOff = () => document.removeEventListener("visibilitychange", onVis);
    if (opts.onShare) on("share", opts.onShare);
    if (opts.onTick) on("tick", opts.onTick);
    return true;
  }
  let lastOpts = null;
  function pause() { if (worker && mining) { worker.postMessage({ cmd: "stop" }); } }
  function resume() {
    if (mining) return;
    if (worker) { worker.postMessage({ cmd: "start", throttle: 0.25 }); mining = true; }
    else if (lastOpts) start(lastOpts);
  }
  function stop() {
    // Terminate: no ghost workers across stop/start cycles (single worker always)
    const w = worker; worker = null; mining = false;
    if (w) {
      try { w._visOff && w._visOff(); w.postMessage({ cmd: "stop" }); } catch {}
      try { setTimeout(() => { try { w.terminate(); } catch {} }, 300); } catch { try { w.terminate(); } catch {} }
    }
    try { leaderBC && leaderBC.close(); } catch {}
    leaderBC = null;
  }
  function setThrottle(v) { if (worker) worker.postMessage({ cmd: "throttle", value: v }); }
  function on(k, f) { (listeners[k] = listeners[k] || []).push(f); }
  function isMining() { return mining; }
  // Ad-free pass: demo = localStorage timestamp. Production MUST use
  // server-signed short-lived tokens (Gemini review) — see NETWORK.md.
  function grantPassMinutes(m) {
    const until = Date.now() + Math.max(1, Number(m) || 30) * 60000;
    try { localStorage.setItem(PASS_KEY, String(until)); } catch {}
    return until;
  }
  function hasPass() {
    try { return Date.now() < Number(localStorage.getItem(PASS_KEY) || 0); } catch { return false; }
  }
  function adFree() { return isMining() || hasPass(); }

  const api = { start, stop, pause, resume, setThrottle, on, isMining, grantPassMinutes, hasPass, adFree };
  if (typeof window !== "undefined") window.GDMxMine = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
