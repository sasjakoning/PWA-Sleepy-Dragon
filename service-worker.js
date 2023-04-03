const CORE_CACHE = 4
const CORE_CACHE_NAME = `core-v${CORE_CACHE}`
const CORE_ASSETS = [
    "/offline", 
    "/css/style.css",
    "/css/story.css",
    "/css/saved.css",
    "/images/back.svg",
    "/images/bg-book.svg",
    "/images/heart-regular.svg",
    "/images/heart-solid.svg",
] 

const HTML_WHITELIST = [
    "/story/:id",
    "/savestory/:id",
    "/removestory/:id"
];

// install service worker
self.addEventListener('install', event => {
    console.log('Installing service worker')
  
    event.waitUntil(
      caches.open(CORE_CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(CORE_ASSETS)
        .then(() => self.skipWaiting());
      })
    )
  }) 

// activate service worker
self.addEventListener("activate", (event) => {
    console.log("Activating service worker")
    event.waitUntil(clients.claim())
})
  
self.addEventListener('fetch', event => {
    console.log('Fetch event: ', event.request.url);

    // If the request is a core asset, return it from the cache
    if (isCoreGetRequest(event.request)) {
        console.log('Core get request: ', event.request.url);
        
        event.respondWith(
            caches.open(CORE_CACHE_NAME)
            .then(cache => cache.match(event.request.url))
        )
    } else if (isHtmlGetRequest(event.request)) {
        console.log('html get request', event.request.url)

        event.respondWith(
            caches.open('html-cache')
                .then(cache => cache.match(event.request.url))
                .then(response => response ? response : fetchAndCache(event.request, 'html-cache'))
                .catch(e => {
                    console.log("Error fetching and caching: ", e)
                    return caches.open(CORE_CACHE_NAME)
                    .then(cache => cache.match('/offline'))
                    .catch(e => console.log("Error fetching offline page: ", e))
                })
        )
    }
})

function fetchAndCache(request, cacheName) {
    return fetch(request)
      .then(response => {
        if (!response.ok) {
          throw new TypeError('Bad response status');
        }
  
        const clone = response.clone()
        caches.open(cacheName).then((cache) => cache.put(request, clone))
        return response
    })
}
  
function isHtmlGetRequest(request) {
    const requestUrl = new URL(request.url);
    return (
      request.method === "GET" &&
      HTML_WHITELIST.includes(requestUrl.pathname)
    );
  }

function isCoreGetRequest(request) {
    return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
}

function getPathName(requestUrl) {
    const url = new URL(requestUrl);
    return url.pathname;
}