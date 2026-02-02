self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', (event) => {
  // Basic fetch handler that doesn't break on network errors or CORS
  event.respondWith(
    fetch(event.request).catch(() => {
      // Fallback or just let it fail naturally without crashing SW
      return new Response('Network error occurred', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    })
  );
});
