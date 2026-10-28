// Service worker mínimo, solo para que el sitio se pueda "instalar" (Agregar a pantalla de
// inicio) en Android. A propósito NO cachea nada: cada pedido va siempre a la red, así nunca se
// muestra una disponibilidad, un precio o una reserva vieja. Si en algún momento se agrega caché
// de verdad, hay que excluir /reservar, /admin y las acciones del servidor.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // Sin event.respondWith(): el navegador hace el pedido normal, como si no hubiera service worker.
});
