// Service worker: guarda a casca do app para abrir rápido e funcionar como app instalado.
const V = 'cmp-v3', SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // mapa e rotas sempre online
  e.respondWith(caches.match(e.request).then(h => h || fetch(e.request).then(r => { const c = r.clone(); if (r.ok) caches.open(V).then(x => x.put(e.request, c)); return r; })));
});
