// sw.js - Insight Pass Service Worker
const APP_VERSION = '1.0.2';
const CACHE_PREFIX = 'insight-pass-';
const CACHE_NAME = `${CACHE_PREFIX}v${APP_VERSION}`;

// 核心快取資源清單
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './version.json'
  // 如有外部 CSS / JS / 圖示資源可在此加入
];

// 安裝階段：快取靜態資源並強制跳過等待
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 啟用階段：僅清除以 insight-pass- 開頭且不是當前版本的舊 Cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
          .map((name) => {
            console.log(`[SW] 清理舊快取: ${name}`);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// 攔截請求：採用 Network-first（優先獲取最新資料，失敗時回退快取）
self.addEventListener('fetch', (event) => {
  // 對於 version.json 一律不走快取，直接向伺服器取得
  if (event.request.url.includes('version.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});

// 接收來自頁面的指令
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});