const express = require("express");
const route = express.Router();

const controller = require("../../controllers/client/map.controller");

route.get("/", controller.index);

route.get("/direction", controller.direction);

route.get("/weather", controller.weather);

module.exports = route;