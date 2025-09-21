var CACHE_NAME = "first";
var CACHED_URLS = [
  '/assets/logo5.png',
  '/assets/logo5.webp',
  '/assets/favicon.ico',
  '/index-offline.html',
  '/assets/css/bootstrap.min.css',
  '/assets/mug/mug1-760.avif',
  '/assets/mug/mug1-760.webp',
  '/assets/mug/mug1-760.jpg',
  'assets/contact/Richard-Kelley-face-2-760.avif',
  'assets/contact/Richard-Kelley-face-2-760.webp',
  'assets/contact/Richard-Kelley-face-2-760.jpg'
];
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});


self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request, {ignoreSearch: true}).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/index-offline.html");
        }
      });
    })
  );
});
