// Guarda o app no aparelho para abrir mesmo sem internet.
const CACHE = "ef-moveis-v2";
const BASE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Página do app: tenta a versão nova primeiro; sem internet, usa a guardada.
  if (req.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put("./index.html", c)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // Bibliotecas e fontes: usa a guardada e atualiza por trás.
  e.respondWith(caches.match(req).then(hit => {
    const rede = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; }).catch(() => hit);
    return hit || rede;
  }));
});
