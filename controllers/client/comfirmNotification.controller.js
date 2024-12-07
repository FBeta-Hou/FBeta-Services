const firestore = require('../../config/firestore');


exports.index = async (req, res) => {
    try {
        const tokenDevice = await firestore.db.collection('tokenDevice').get();

        let registrationTokens = [];

        if (!tokenDevice.empty) {
            tokenDevice.docs.forEach(doc => {
              const data = doc.data();  // Lấy dữ liệu tài liệu
              const token = data.token;  // Giả sử trường chứa chuỗi bạn muốn là 'token'
              registrationTokens.push(token);
            });
        }

        const topic = 'news';

        firestore.messaging.subscribeToTopic(registrationTokens, topic)
        .then(response => {
            console.log('Successfully subscribed to topic:', response);
        })
        .catch(error => {
            console.log('Error subscribing to topic:', error);
        });

        res.render('client/pages/comfirmNotification', { title: 'Comfirm Notification' });
    } catch (error) {
        console.error(error);
    }
};