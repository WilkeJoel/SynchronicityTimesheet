const staticCacheName = "dev-synchro-site-v1";
const staticFiles = [];


self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(staticFiles)
        })
    )
});

self.addEventListener('activate', activateEvent => {
    activateEvent.waitUntil(
        caches.keys().then(cacheNames => {
            Promise.all(cacheNames.map(key => {
                if (key !== staticCacheName) {
                    return caches.delete(key);
                }
            }))
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

self.addEventListener("sync", syncEvent => {
    if (syncEvent.tag === "sync-stores") {
        syncEvent.waitUntil(
            readAllData("").then(data =>{
                // needs finishing
            })
        )
    }

})