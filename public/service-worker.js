const CACHE_NAME = "static-cache-version_01";
const DATA_CACHE_NAME = "data-cache-version_01";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/idb.js",
  "/js/index.js",
  "/manifest.json",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png"
];

// Respond with Cached resources
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// delete outdated caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
            // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create keeplist
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            return caches.delete(key);
          }
        }));
    }));

  self.clients.claim();
});