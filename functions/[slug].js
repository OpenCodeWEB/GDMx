export async function onRequest(context) {
  const raw = context.params.slug || "";
  const slug = String(raw).toLowerCase();
  // Static / SDK / embed / dashboard paths -> let Pages serve files (case-insensitive dashboard)
  const lower = String(raw).toLowerCase();
  if (slug.includes('.') || slug === 'gdmx-pay' || slug === 'sdk' || slug === 'embed' || lower === 'dashboard' || lower === '404') {
    try { return await context.next(); } catch { return new Response("Not found", { status: 404 }); }
  }
  const r = await fetch('https://gdbx.xup.workers.dev/dsgx/route/'+slug);
  const j = await r.json().catch(()=>({}));
  const profile = j.ok ? j.route : null;
  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+slug+' � GDMx</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-center>'+ (profile ? '<img src="https://github.com/'+profile.login+'.png" class="w-20 h-20 rounded-full mx-auto"><h1 class="text-2xl font-bold mt-3">@'+profile.login+'</h1>' : '<h1 class="text-2xl font-bold">@'+slug+'</h1><p>Not found</p>') +'</div><script src="https://gdmx.pages.dev/sdk/v1/gdmx.js"></script></body></html>';
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
