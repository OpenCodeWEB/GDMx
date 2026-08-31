import { GDMxGateway } from "./v1/gdmx.js";
export function GDMxButton({ to, amount, chainId, label, className, style }) {
  const btn = document.createElement("button");
  btn.textContent = label || Support +amount+ USD;
  btn.className = className || "px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold";
  if (style) Object.assign(btn.style, style);
  btn.onclick = () => new GDMxGateway({ merchantAddress: to }).checkout({ amountUSD: amount, chainId });
  return btn;
}
export { GDMxGateway };
