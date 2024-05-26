self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('puja-darshan-cache').then(function(cache) {
      return cache.addAll([
        'Index.html',
        'msp.png',
        'H.H-MS.png',
        'styles.css',
        'scripts.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
