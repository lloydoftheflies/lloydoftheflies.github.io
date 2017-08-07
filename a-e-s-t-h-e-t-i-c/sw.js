var SUCKS = true;

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        'BUST.png',
        'el_paint.png',
        'el_windows.png',
        'evan_bench.png',
        'grid.png',
        'Macintosh Plus - Floral Shoppe - 02 リサフランク420 - 現代のコンピュー.mp3',
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
