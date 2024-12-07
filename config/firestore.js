const admin = require("firebase-admin");

// Cấu hình Firebase Admin SDK
const serviceAccount = require('../placeholders/service-account.json');

// Khởi tạo Firebase Admin SDK với khóa dịch vụ của bạn
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Trả về tham chiếu đến Firestore
const db = admin.firestore();
const messaging = admin.messaging();

module.exports.db = db;
module.exports.messaging = messaging;