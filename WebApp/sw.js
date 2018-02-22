var urlsToCache = [
    //'/',
    '/css/materialize.css',
    '/css/materialize.min.css',
    'application.js',
    'book.png',
    'index.html'
];

self.addEventListener('install', function (event) {
    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
        //'/',
        '/css/materialize.css',
        '/css/materialize.min.css',
        'application.js',
        'book.png',
        'index.html'
    ];
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    console.log("fetch triggered")
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });
