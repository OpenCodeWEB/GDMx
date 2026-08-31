# GDMx — Global Decentralized Money Transaction Gateway
> **Universal, Free, Open-Source Protocol** — `gdmx.pages.dev` — Non-custodial, 0% fee, Edge CDN.

**Repo:** `github.com/OpenCodeWEB/GDMx` · **Live:** `https://gdmx.pages.dev` · **License:** MIT · **Cost:** Zero hosting (serverless)

## 6 Core Features — Always Free, Always Open

### 🟢 1. Universal Auth
- **WalletConnect (Reown AppKit):** 500+ wallets (MetaMask, Phantom, Trust, Coinbase, Rainbow...) 1-click via QR + extension
- **Social & Email Wallet:** Google, Email, GitHub → Web3Auth instant wallet, no install, gasless-ready
- **Cross-Chain:** EVM (Eth, Polygon, Arbitrum, BSC, Optimism, Base), Solana, TON — auto-switch (`wallet_switchEthereumChain`)

### 💳 2. Fiat Aggregator
- **Providers:** MoonPay, Transak, Ramp, Banxa, Wert (+ Stripe fallback) — `Promise.any` parallel race, fastest wins, 2.5s timeout each
- **Direct Settlement:** Card/bank (SEPA/UPI/Apple Pay) → on-ramp → **direct** to merchant's own wallet (no intermediary hold)

### ⚡ 3. Non-Custodial 0% Fee
- **Direct Pay:** Buyer → merchant on-chain wallet, no GDMx custody
- **0% Gateway Fee:** Only blockchain gas (or gasless via paymaster)

### 🛠️ 4. Dev Kit
- **HTML:** `<script src="https://gdmx.pages.dev/gdmx-pay.js"></script>` — 1 line
- **React:** `import { GDMxButton } from "https://gdmx.pages.dev/sdk/react.js"` — `<GDMxButton to="0x..." amount={5} />`
- **Dynamic Slug:** `gdmx.pages.dev/ABsUP` — auto bio, social links, payment widget (via `functions/[slug].js` + `dsgx:route` KV)

### 🛡️ 5. Security & Performance
- **WebCrypto & DID:** GDBx `ECDSA P-256` + `did:gdbx:<addr>` validation for every checkout
- **Gasless:** EIP-2771 Paymaster / `POST /gdmx/gasless` — dev can sponsor gas
- **Edge CDN:** Cloudflare Pages — 100% uptime, ms global load

### 🌐 6. 100% Free & Open
- **MIT:** `github.com/OpenCodeWEB/GDMx` — fork, self-host, no vendor lock
- **Zero Hosting Cost:** Serverless (Pages + Workers + DO) — no monthly fee

## Usage — Any Site

```html
<!-- 1-line HTML -->
<script src="https://gdmx.pages.dev/gdmx-pay.js"></script>
<script>
  GDMx.pay({ to: "0xMerchant", amountUSD: 5, chainId: 137 });
</script>

<!-- React -->
import { GDMxButton } from "https://gdmx.pages.dev/sdk/react.js";
<GDMxButton to="0xMerchant" amount={5} chainId={137} label="Support" />

<!-- Slug -->
<a href="https://gdmx.pages.dev/ABsUP">gdmx.pages.dev/ABsUP</a>
```

## API

- `GET https://gdbx.xup.workers.dev/gdmx/providers` — list configured on-ramps
- `GET https://gdbx.xup.workers.dev/gdmx/create-checkout?to=0x...&amount=5&provider=moonpay&chainId=137` — fastest on-ramp URL
- `POST https://gdbx.xup.workers.dev/gdmx/gasless` — `{to, amountUSD, chainId}` → `{txHash}`
- `GET https://gdmx.pages.dev/ABsUP` — dynamic slug profile

## Dev

```bash
npm i
npm run dev      # wrangler pages dev public
npm run deploy   # wrangler pages deploy public --project-name gdmx
```
