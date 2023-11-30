require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const dbMain = require("./src/configs/dbCMS.config");

const sportsRoutes = require("./src/routes/sports/sports.routes");

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

global.dbMain = dbMain;

app.use(cors(corsOptions));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "100mb", extended: true }));

app.use("/api/v1/sports", sportsRoutes);

app.get("/", (req, res) => {
  res.send("Swifty Backoffice is running :) ");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(
    `Swifty Backend is running on port ${process.env.STAGE}:${port}!`
  );
});
