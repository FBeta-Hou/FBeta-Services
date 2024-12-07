const sendNotificationRoutes = require('./sendNotification.route');

module.exports = (app) => {
    app.use("/send-notification", sendNotificationRoutes);
  }