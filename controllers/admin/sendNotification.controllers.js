const { sendFcmMessage } = require('../../services/fcmService');

exports.index = (req, res) => {
  try {
    res.render('admin/pages/sendNotification/notificationForm', { title: 'Send Notification' });
  } catch (error) {
    console.error(error);
  }
};

exports.sendNotification = async (req, res) => {
  try {
    const token = req.body.token;
    const title = req.body.title;
    const body = req.body.body;

    const fcmMessage = {
      message: {
        notification: {
          title: title,
          body: body,
        },
        topic: 'news'
      },
    };

    const response = await sendFcmMessage(fcmMessage);

    console.log(response)
    
    res.render('admin/pages/sendNotification/notificationForm', {
      title: 'Send Notification',
      message: 'Notification sent successfully!',
      response,
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
