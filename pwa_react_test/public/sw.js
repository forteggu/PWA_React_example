const CACHE_NAME = "version 1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;
//Instal SW

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache
        .addAll(urlsToCache)
        .then(function () {
          console.log("All resources have been fetched and cached.");
        })
        .catch((e) => {
          console.error("Failed to cache all files");
        });
    })
  );
});

//Listen for requests

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then(function (response) {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch((e) => caches.match("offline.html"));
    })
  );
});

//Activate the SW

self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheNames) => {
          if (!cacheWhiteList.includes(cacheNames)) {
            return caches.delete(cacheNames);
          }
        })
      );
    })
  );
});
