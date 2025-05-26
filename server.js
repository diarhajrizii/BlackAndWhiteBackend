require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dbMain = require("./src/configs/dbCMS.config");

const authenticationRoutes = require("./src/routes/authentications/authentications.routes");
const productsRoutes = require("./src/routes/products/products.routes");
const cmsPanelsRoutes = require("./src/routes/cms-panels/cmsPanels.routes");
const transactionsRoutes = require("./src/routes/transactions/transactions.routes");
const administrationRoutes = require("./src/routes/administrations/administration.routes");
const { auth } = require("./src/controllers/middleware/auth.middleware");

const app = express();
const port = process.env.PORT || 3005;
const constantApi = "/api/v1";

// Global variables
global.secretKey = process.env.SECRET_KEY;
global.dbMain = dbMain;
global.Token = process.env.token;

// Middleware configurations
app.use(
  cors({
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
  })
);

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb", extended: true }));

// Routes
app.use(`${constantApi}/products`, auth, productsRoutes);
app.use(`${constantApi}/panels`, auth, cmsPanelsRoutes);
app.use(`${constantApi}/transactions`, auth, transactionsRoutes);
app.use(`${constantApi}/administration`, auth, administrationRoutes);
app.use(`${constantApi}/authentication`, auth, authenticationRoutes);

app.get(`${constantApi}/verify/token`, auth, (req, res) => {
  res.json({ isValid: req.isValid, user: req.user });
});

app.get("/", (req, res) => {
  res.send("Black&White Backend is running :) ");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message, err.stack);
  res.status(err.statusCode || 400).json({ message: err.message });
});

app.listen(port, () => {
  console.log(
    `BlackAndWhite Backend is running on port ${process.env.STAGE}:${port}!`
  );
});
