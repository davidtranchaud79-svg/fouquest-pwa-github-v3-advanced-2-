// Fouques’t Suite — sw.js (v3: cache reset)
const CACHE = 'fouquest-v9-3';
const ASSETS = [
  'index.html',
  'app.js?v=3',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null))));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method === 'GET' && new URL(e.request.url).origin === location.origin) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
