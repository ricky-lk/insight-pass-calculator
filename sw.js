const APP_VERSION = 'v1.0.7';
const CACHE_PREFIX = 'insight-pass-';
const CACHE_NAME = `${CACHE_PREFIX}v${APP_VERSION}`;

const STATIC_ASSETS = ['./', './index.html', './styles.css', './app.js', './manifest.json', './icon.png'];

async function reportProgress(info) {
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  clients.forEach((client) => client.postMessage({ type: 'APP_UPDATE_PROGRESS', ...info }));
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (let index = 0; index < STATIC_ASSETS.length; index++) {
      const asset = STATIC_ASSETS[index];
      const response = await fetch(new Request(new URL(asset, self.registration.scope), { cache: 'reload' }));
      if (!response.ok) throw new Error(`更新檔案下載失敗：${asset}`);
      await cache.put(new URL(asset, self.registration.scope), response.clone());
      await reportProgress({ phase: 'downloading', current: index + 1, total: STATIC_ASSETS.length, percent: Math.round(((index + 1) / STATIC_ASSETS.length) * 100), file: asset });
    }
    await reportProgress({ phase: 'downloaded', current: STATIC_ASSETS.length, total: STATIC_ASSETS.length, percent: 100 });
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await reportProgress({ phase: 'activating', current: STATIC_ASSETS.length, total: STATIC_ASSETS.length, percent: 100 });
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('version.json')) {
    event.respondWith(fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
