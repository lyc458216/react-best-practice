/**
 * Cache Storage 也是浏览器提供的一种缓存机制，专门用于缓存一个请求的 request 和 response 的配对关系。
 * 此外，它还提供了 API，用来判断某个 request 是不是有对应的 response 已经缓存。
 * 所以 Cache Storage 也可以认为是专门为 Service Worker 提供的 缓存机制。
*/
const cacheName = 'my_app_cache';
// 在 sw.js 中监听安装完成事件
self.addEventListener('install', function(e) {
    console.log('Service worker installed.');
    // 初始化 Cache Storage
    const cacheOpenPromise = caches.open(cacheName);
    // 安装过程中，等待 Cache Storage 配置完成
    e.waitUntil(cacheOpenPromise);
})

self.addEventListener('fetch', function(e) {
    // 如果请求的路径不是 js 结尾，就通过 return false 来告诉 service worker 这个请求应该发送到服务器端
    if (!request.url.endsWith('.js')) return false;
    // 否则检查 cache 中是否有对应的 response
    const promise = caches.open(cacheName).then(cache => {
        // 使用 cache.match
        return cache.match(e.request).then(res => {
            if (res) {
                // 如果缓存存在则直接返回结果 
                return Promise.resolve(res);
            } else {
                // 否则发出请求，并存到 cache
                const req = new Request(e.request.url); 
                return fetch(corsRequest).then(res => {
                    // 更新 cache
                    cache.put(request, res.clone());
                    return res;
                })
            }
        });
    });
    // 使用 e.respondWith 方法给请求返回内容
    e.respondWith(promise);
})