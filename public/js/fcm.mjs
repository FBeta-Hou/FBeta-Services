import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js";
import { doc, setDoc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"; 


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBSDrODupgI0MzvLIcqQPgm2U4OgrW5VQM",
    authDomain: "disaster-a495d.firebaseapp.com",
    projectId: "disaster-a495d",
    storageBucket: "disaster-a495d.firebasestorage.app",
    messagingSenderId: "999451644442",
    appId: "1:999451644442:web:d1a863948b04a0927777a3",
    measurementId: "G-0F58QYY2N7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

const db = getFirestore(app);

function setCookie(name, value) {
  const date = new Date("2038-01-19T03:14:07Z");
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        
        // Tạo và hiển thị thông báo
        new Notification('Bạn Có Thể Nhận Thông Báo!', {
          body: 'Cảm ơn bạn đã chấp nhận thông báo!.',
          icon: 'https://via.placeholder.com/100'
        });

        setCookie("notification", "true");

        window.history.back();
      } else {
          alert('Bạn đã từ chối quyền nhận thông báo, bạn hãy bật lên để sử dụng trang web!');
      }
    });
  }
  
  // Gọi hàm requestPermission để yêu cầu quyền thông báo
  requestPermission();

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
getToken(messaging, { vapidKey: 'BD8qmoU_jP1DmohUNKcvJmfsvywLFhnO8eYpOR6AUijA27MHDI3qGiUAeIbWWhYYm0szrLhDvTIKE_1E_WpJ6-I' }).then(async (currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log(currentToken);

    const tokenDocRef = doc(db, "tokenDevice", currentToken);
    const tokenDocSnap = await getDoc(tokenDocRef);
    
    if (tokenDocSnap.exists()) {
      // Nếu token đã tồn tại, không làm gì cả
      console.log('Token already exists. Not saving it again.');
    } else {
      // Nếu token chưa tồn tại, lưu nó vào Firestore
      await setDoc(tokenDocRef, {
        token: currentToken,
        createdAt: new Date() // Bạn có thể lưu thêm thời gian tạo token nếu cần
      });
      console.log('Token saved successfully.');
    }

  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});