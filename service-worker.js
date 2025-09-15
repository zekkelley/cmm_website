var CACHE_NAME = "first";
var CACHED_URLS = [
  '/assets/logo5.png',
  '/assets/logo5.webp',
  '/assets/favicon.ico',
  '/index-offline.html',
  '/assets/css/bootstrap.min.css',
  '/index.css'
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
