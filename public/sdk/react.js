// GDMx React helper (ES module) — uses global from /sdk/v1/gdmx.js (classic, no `export` inside)
function getGateway() {
  if (typeof window !== "undefined" && window.GDMxGateway) return window.GDMxGateway;
  throw new Error("GDMx: load /sdk/v1/gdmx.js first (<script src=\"/sdk/v1/gdmx.js\"></script>)");
}
export function GDMxButton({ to, amount, chainId, label, className, style }) {
  const btn = document.createElement("button");
  btn.textContent = label || ("Support " + amount + " USD");
  btn.className = className || "px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold";
  if (style) Object.assign(btn.style, style);
  btn.onclick = () => new (getGateway())({ merchantAddress: to }).checkout({ amountUSD: amount, chainId });
  return btn;
}
export function getGDMxGateway() { return getGateway(); }
