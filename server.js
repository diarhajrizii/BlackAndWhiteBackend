require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const dbMain = require("./src/configs/dbCMS.config");

const authenticationRoutes = require("./src/routes/authentications/authentications.routes");
const productsRoutes = require("./src/routes/products/products.routes");
const cmsPanelsRoutes = require("./src/routes/cms-panels/cmsPanels.routes");
const transactionsRoutes = require("./src/routes/transactions/transactions.routes");
const administrationRoutes = require("./src/routes/administrations/administration.routes");
const { auth } = require("./src/controllers/middleware/auth.middelware");
// const myLogger = require("./src/controllers/middleware/myLogger");

const port = process.env.PORT || 3005;

const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};

global.secretKey = process.env.SECRET_KEY;
global.dbMain = dbMain;

app.use(cors(corsOptions));

app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

app.use(bodyParser.json({ limit: "100mb", extended: true }));

// app.use(myLogger);

const constantApi = "/api/v1";
app.use(`${constantApi}/products`, productsRoutes);
app.use(`${constantApi}/panels`, cmsPanelsRoutes);
app.use(`${constantApi}/transactions`, transactionsRoutes);
app.use(`${constantApi}/administration`, administrationRoutes);
app.use(`${constantApi}/authentication`, authenticationRoutes);

app.get(`${constantApi}/verify/token`, auth, (req, res) => {
  res.json({ isValid: req.isValid, user: req.user });
});

app.get("/", (req, res) => {
  res.send("Black&White Backend is running :) ");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(
    `BlackAndWhite Backend is running on port ${process.env.STAGE}:${port}!`
  );
});
