const CORE_CACHE = 1
const CORE_CACHE_NAME = `core-v${CORE_CACHE}`
const CORE_ASSETS = [
  "/offline", 
  "css/style.css",
  "js/script.js",
  "js/router.js",
  "js/routes.js",
  "js/touchHandler.js",
  "js/utilities.js",
  "js/rive.js",
  "images/back.svg",
  "images/bg-book.svg",
  "images/heart-regular.svg",
  "images/heart-solid.svg",
  "images/trash.svg",
  "images/sleepy_dragon.riv",
] 

self.addEventListener('install', (event) => {
    console.log("Installed")
    event.waitUntil(
        caches.open(CORE_CACHE_NAME)
        .then(cache => cache.addAll(CORE_ASSETS))
        .then(() => self.skipWaiting())
    )
})

self.addEventListener("activate", (event) => {
    console.log("Activated")
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
                        .then(cache => cache.match('/offline'))})
        })
    )

    /* Save all requests to cache */
    event.respondWith(
        caches.open(CORE_CACHE_NAME).then(cache => {
            return cache.match(event.request)
                .then(response => {
                    if(response) {
                        return response
                    }
                    return fetch(event.request)
                    .then(response => {
                        cache.put(event.request, response.clone())
                        return response
                    })
                }).catch((err) => {
                    return caches.open(CORE_CACHE_NAME).then(cache => cache.match('/offline'))
                })
        })
    )
            
})