/**
 * 和浏览器自动的资源缓存机制相比，Service Worker 加上 Cache Storage 这个缓存机制，具有更高的准确性和可靠性。因为它可以确保两点:
 * 1. 缓存永远不过期。你只要下载过一次，就永远不需要再重新下载，除非主动删除;
 * 2. 永远不会访问过期的资源。换句话说，如果发布了一个新版本，那么你可以通过版本化的一些机制，来确保用户访问到的一定是最新的资源。
 * 不同于 PWA，这里的 Service Worker 仅仅用 作前端静态资源的缓存。这是一个非常高效的缓存机制，可以保证静态资源仅被加载一 次，从而极大地提高第二次以及后续打开 App 的速度.
*/

// 注册 Service Worker
if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(()=> {
            // 注册成功
            console.log('Service worker registered.');
    }, (err) => {
        // 注册失败
        console.log('ServiceWorker registration failed: ', err);
    });
}
