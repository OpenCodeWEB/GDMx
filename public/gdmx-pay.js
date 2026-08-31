/*! gdmx-pay.js — 1-line GDMx — free, open, non-custodial, 0% fee */
(function(){var s=document.createElement("script");s.src="https://gdmx.pages.dev/sdk/v1/gdmx.js";s.onload=function(){window.GDMx&&window.GDMx.pay&&window.GDMx.pay();};document.head.appendChild(s);})();
window.GDMx={pay:function(o){o=o||{};var to=o.to||o.merchantAddress,amt=o.amount||o.amountUSD||5;if(!to)throw new Error("GDMx: to required");var g=new GDMxGateway({merchantAddress:to});return g.checkout({amountUSD:amt,provider:o.provider,chainId:o.chainId});}};
