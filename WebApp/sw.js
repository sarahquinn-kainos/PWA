var urlsToCache = [
    '/',
    '/css/materialize.css',
    '/css/materialize.min.css',
    'application.js',
    'book.png',
    'index.html'
    ];
    
self.addEventListener('install', function(event) {
    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
    '/',
    '/css/materialize.css',
    '/css/materialize.min.css',
    'application.js',
    'book.png',
    'index.html'
    ];

    self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
    });
  });