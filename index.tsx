import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// التحديث التلقائي الفوري لنسخة تطبيق الهاتف (PWA) عند توفر إصدار جديد
if ('serviceWorker' in navigator) {
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  const checkForSWUpdate = () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => {
        reg.update().catch(() => {});
      });
    }).catch(() => {});
  };

  window.addEventListener('load', checkForSWUpdate);
  window.addEventListener('online', checkForSWUpdate);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkForSWUpdate();
    }
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);