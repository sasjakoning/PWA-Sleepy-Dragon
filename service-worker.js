const CORE_CACHE = 9
const CORE_CACHE_NAME = `core-v${CORE_CACHE}`
const CORE_ASSETS = [
  "/offline",
  "/css/style.css",
  "/images/bg-book.svg"
]

// install service worker
self.addEventListener('install', event => {
  console.log('Installing service worker')

  event.waitUntil(
    caches.open(CORE_CACHE_NAME)
      .then(function (cache) {
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

self.addEventListener("fetch", (event) => {
  const req = event.request
  console.log("Fetching:" + req.url)

  // show cached request from cache
  event.respondWith(
    caches.match(req)
      .then(cachedRes => {
        if (cachedRes) {
          return cachedRes
        }
        return fetch(req)
          .then((fetchRes) => fetchRes)
          .catch((err) => {
            return caches.open(CORE_CACHE_NAME)
              .then(cache => cache.match('/offline'))
          })
      })
  )
})