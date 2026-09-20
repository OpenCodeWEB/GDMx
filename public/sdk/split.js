/* split.js — GDMx fee-split math (exact, sums to 100%).
 * Developer / Wallet Owner: 99.9901%
 * Owner Fee (ABsUP):          0.009%
 * Node security reserve:      0.0009%
 * Integer-micros accounting avoids float dust. Micro-fees accrue off-chain
 * (rollup) and settle on-chain in batches — see NETWORK.md.
 */
(function () {
  const BPS = 1000000; // micro-units per 1.0
  const SPLIT = {
    dev: 999901,   // 99.9901%
    owner: 90,     // 0.009%
    node: 9,       // 0.0009%
    ownerAddress: "0x9016a472c308A4e87bed705D066636Adf625D1B0", // ABsUP treasury
  };
  function split(amountUSD) {
    const micros = Math.round(Number(amountUSD) * BPS);
    if (!(micros > 0)) throw new Error("GDMxSplit: amountUSD required");
    const dev = Math.floor(micros * SPLIT.dev / BPS);
    const owner = Math.floor(micros * SPLIT.owner / BPS);
    const node = micros - dev - owner; // remainder -> node reserve (exact total)
    return {
      total: micros / BPS,
      dev: dev / BPS, owner: owner / BPS, node: node / BPS,
      pct: { dev: 99.9901, owner: 0.009, node: 0.0009 },
      ownerAddress: SPLIT.ownerAddress,
    };
  }
  const api = { SPLIT, split };
  if (typeof window !== "undefined") window.GDMxSplit = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
