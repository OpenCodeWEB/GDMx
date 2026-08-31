# GDMx — Global Decentralized Money Transaction Gateway
> **Universal, Free, Open-Source Protocol** — `gdmx.pages.dev` — Non-custodial, 0% fee, Edge CDN.

**Repo:** `github.com/OpenCodeWEB/GDMx` · **Live:** `https://gdmx.pages.dev` · **License:** MIT · **Cost:** Zero hosting (serverless)

## 6 Core Features — Always Free, Always Open

### ?? 1. Universal Auth
- **WalletConnect (Reown AppKit):** 500+ wallets (MetaMask, Phantom, Trust, Coinbase, Rainbow...) 1-click via QR + extension
- **Social & Email Wallet:** Google, Email, GitHub ? Web3Auth instant wallet, no install, gasless-ready
- **Cross-Chain:** EVM (Eth, Polygon, Arbitrum, BSC, Optimism, Base), Solana, TON — auto-switch

### ?? 2. Fiat Aggregator
- **Providers:** MoonPay, Transak, Ramp, Banxa, Wert (+ Stripe, Coinbase) — parallel race, fastest wins
- **Direct Settlement:** Card/bank (SEPA/UPI/Apple Pay) ? on-ramp ? **direct** to merchant's own wallet

### ? 3. Non-Custodial 0% Fee
- **Direct Pay:** Buyer ? merchant on-chain wallet, no GDMx custody
- **0% Gateway Fee:** Only blockchain gas (or gasless via paymaster)

### ??? 4. Dev Kit
- **HTML:** `<script src="https://gdmx.pages.dev/gdmx-pay.js"></script>` — 1 line
- **React:** `import { GDMxButton } from "https://gdmx.pages.dev/sdk/react.js"` — `<GDMxButton to="0x..." amount={5} />`
- **Dynamic Slug:** `gdmx.pages.dev/ABsUP` — auto bio, social links, payment widget

### ??? 5. Security & Performance
- **WebCrypto & DID:** GDBx `ECDSA P-256` + `did:gdbx:<addr>` validation
- **Gasless:** EIP-2771 Paymaster / `POST /gdmx/gasless`
- **Edge CDN:** Cloudflare Pages — 100% uptime, ms global load

### ?? 6. 100% Free & Open
- **MIT:** `github.com/OpenCodeWEB/GDMx` — fork, self-host
- **Zero Hosting Cost:** Serverless (Pages + Workers + DO) — no monthly fee
