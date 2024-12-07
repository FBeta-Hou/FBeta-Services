const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/sendNotification.controllers");

route.get("/", controller.index);

route.post("/send", controller.sendNotification);

module.exports = route;