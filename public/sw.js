// Service Worker for PWA and Push Notifications
const CACHE_NAME = 'webrain-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  // pass-through for now; can be enhanced to cache-first for static assets
})

// Push notification event
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: data.icon || '/logo-dark.png',
      badge: data.badge || '/logo-dark.png',
      data: data.data,
      actions: [
        {
          action: 'view',
          title: 'Görüntüle',
          icon: '/icons/view.png'
        },
        {
          action: 'close',
          title: 'Kapat',
          icon: '/icons/close.png'
        }
      ],
      requireInteraction: true,
      vibrate: [200, 100, 200]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    const urlToOpen = event.notification.data?.url || '/dashboard';
    
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          // Açık bir window var mı kontrol et
          for (const client of clientList) {
            if (client.url.includes(urlToOpen.split('?')[0]) && 'focus' in client) {
              return client.focus();
            }
          }
          
          // Yeni window aç
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// Background sync for offline notifications
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Offline sırasında biriken bildirimleri gönder
  return fetch('/api/notifications/sync', {
    method: 'POST',
  }).catch(err => console.log('Background sync failed:', err));
}
