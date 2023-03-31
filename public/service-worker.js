const CORE_CACHE = 1
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

// install service worker
self.addEventListener('install', (event) => {
    console.log("Installed")

    // cache all items in CORE_ASSETS
    event.waitUntil(
        caches.open(CORE_CACHE_NAME)
        .then(cache => cache.addAll(CORE_ASSETS))
        .then(() => self.skipWaiting())
    )
})

// activate service worker
self.addEventListener("activate", (event) => {
    console.log("Activated")
    event.waitUntil(clients.claim())
});

self.addEventListener("fetch", (event) => {
    const req = event.request;
    console.log("Fetching:" + req.url);

    // show cached request from cache
    event.respondWith(
        caches.match(req)
            .then(cachedRes => {
                if (cachedRes) {
                    console.log("Found in cache")
                    console.log(cachedRes)
                    return cachedRes
                }

                return fetch(req)
                    .then((fetchRes) => fetchRes)
                    .catch((err) => {
                        console.log("Not found in cache")
                        return caches.open(CORE_CACHE_NAME)
                        .then(cache => cache.match('/offline'))})
        })
    )
});

// self.addEventListener("fetch", (event) => {
//     const req = event.request
//     console.log("Fetching:" + req.url)
    
//     // show cached request from cache
//     event.respondWith(
//         caches.match(req)
//             .then(cachedRes => {
//                 if (cachedRes) {
//                     return cachedRes
//                 }
//                 return fetch(req)
//                     .then((fetchRes) => fetchRes)
//                     .catch((err) => {
//                         return caches.open(CORE_CACHE_NAME)
//                         .then(cache => cache.match('/offline'))})
//         })
//     )

//     /* Save all requests to cache */
//     // event.respondWith(
//     //     caches.open(CORE_CACHE_NAME).then(cache => {
//     //         return cache.match(event.request)
//     //             .then(response => {
//     //                 if(response) {
//     //                     return response
//     //                 }
//     //                 return fetch(event.request)
//     //                 .then(response => {
//     //                     cache.put(event.request, response.clone())
//     //                     return response
//     //                 })
//     //             }).catch((err) => {
//     //                 return caches.open(CORE_CACHE_NAME).then(cache => cache.match('/offline'))
//     //             })
//     //     })
//     // )
            
// })