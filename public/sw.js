const CACHE = 'sattvalife-v7'; // bump version → triggers auto-reload on all stale clients
const STATIC = ['/'];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // activate immediately, don't wait for old tabs to close
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(STATIC))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    // 1. Delete ALL old cache versions
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => clients.claim()) // take control of all open tabs immediately
      .then(() =>
        // 2. Tell every open tab: "new version activated — please reload"
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((all) => {
          all.forEach((client) => client.postMessage({ type: 'SW_UPDATED' }));
        })
      )
  );
});

self.addEventListener('fetch', (e) => {
  // Navigation requests always go network-first (prevents stale index.html)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/'))
    );
    return;
  }

  // Static assets: network-first with cache fallback
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
