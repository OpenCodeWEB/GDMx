# GDBx Support Network — Mining.GDBx + GDMx

> One device, one worker. Mine = ad-free. Donate = time pass.
> Live: `https://gdmx.pages.dev/mine` · SDK: `https://gdmx.pages.dev/sdk/mine.js`

## 1. Network

- **Purpose:** supporters contribute browser compute (proof-of-support) instead of
  watching ads; developers earn donations.
- **Treasury / Owner (ABsUP):** `0x9016a472c308A4e87bed705D066636Adf625D1B0`
  (label `ABs…GDMx`). Display label, real settlement in EVM/Solana/TON.
- **Privacy:** no accounts, no cookies for mining; only an optional address string.
  Worker never touches network or wallet keys.
- **Security:** single Web Worker, CPU cap 5–50% (default 25%), full pause on
  hidden tab, `BroadcastChannel` leader = 1 active miner per browser.
- **Cross-network:** one abstract share stream; settlement address can be
  EVM (`0x…`), Solana or TON — chain chosen at checkout (`GDMxGateway`).

## 2. Fee split (exact, sums to 100%)

| Party | Share |
|---|---|
| Developer / Wallet Owner | **99.9901%** |
| Owner Fee (ABsUP) | **0.009%** |
| Node security reserve | **0.0009%** |

Enforced in `public/sdk/split.js` (`GDMxSplit.split`) with integer-micros math.
Micro-fees are **dust on-chain** → accrue in an off-chain rollup ledger and
settle in batches (e.g. ≥ $10 USDC equivalent). Production ad-free passes MUST
be server-signed short-lived tokens (never trust `localStorage` alone);
spot re-validate 5–10% of submitted shares server-side.

## 3. Developer integration (ads ↔ mining ↔ donate)

```html
<script src="https://gdmx.pages.dev/sdk/mine.js"></script>
<script>
  // Option A: visitor mines => ad-free content
  GDMxMine.start({ to: "0xYourAddress", throttle: 0.25 });
  if (GDMxMine.adFree()) hideAds(); else showAdsWithOptionToMine();
  // Option B: visitor pays/donates => time pass (no mining needed)
  // after GDMxGateway checkout success:
  GDMxMine.grantPassMinutes(60);
</script>
```

Rules for a fair system: always opt-in + visible stop; throttle default ≤25%;
pause when hidden; one worker per device; disclose "demo credits, not coin profit".

## 4. Files

- `public/mine.html` → `gdmx.pages.dev/mine`
- `public/js/gdbx-mine-worker.js` (single worker, SHA-256, burst+sleep throttle)
- `public/sdk/mine.js` (`GDMxMine` embed SDK)
- `public/sdk/split.js` (`GDMxSplit` fee math)
