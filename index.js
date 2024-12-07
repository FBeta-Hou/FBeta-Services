const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const database = require("./config/database");
database.connect();

const bodyParser = require("body-parser")

const routesAdmin = require("./routes/admin/index.route");

const routesClient = require("./routes/client/index.route");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

const PORT = process.env.PORT || 3000;

routesAdmin(app);

routesClient(app);

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});