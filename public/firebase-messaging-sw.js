importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBSDrODupgI0MzvLIcqQPgm2U4OgrW5VQM",
  authDomain: "disaster-a495d.firebaseapp.com",
  projectId: "disaster-a495d",
  storageBucket: "disaster-a495d.firebasestorage.app",
  messagingSenderId: "999451644442",
  appId: "1:999451644442:web:d1a863948b04a0927777a3",
  measurementId: "G-0F58QYY2N7"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    console.log(payload.data);

    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: 'https://img.icons8.com/emoji/100/warning-emoji.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
});