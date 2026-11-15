// 수찬 단어장: 인터넷이 끊겨도 마지막으로 받은 화면을 띄운다 (항상 새 버전 먼저)
const C = 'suchan-v1';
const OK_HOSTS = [location.host, 'www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || !OK_HOSTS.includes(u.host) || u.pathname.includes('/google.firestore.')) return;
  e.respondWith(fetch(r).then(res => { if (res.ok || res.type === 'opaque') { const c = res.clone(); caches.open(C).then(ca => ca.put(r, c)); } return res; })
    .catch(() => caches.match(r, { ignoreSearch: false }).then(m => m || caches.match('./'))));
});
