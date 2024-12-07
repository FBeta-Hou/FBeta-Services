const comfirmNotificationRoutes = require('./comfirmNotification.route');
const mapRoutes = require("./map.route");

module.exports = (app) => {
    app.use("/comfirm-notification", comfirmNotificationRoutes);
    app.use("/map", mapRoutes);
}
