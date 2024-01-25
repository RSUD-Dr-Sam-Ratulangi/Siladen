var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./public/docs/openapi.json");
const { serverFcmKey } = require("./config");

var laporan = require("./app/Laporan/router");
var user = require("./app/User/router");
var authUser = require("./app/AuthUser/router");
var jenisPasien = require("./app/JenisPasien/router");

var app = express();

// Atur CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware untuk menampilkan Spesifikasi API dengan Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routing WELCOME PAGE
app.get("/", (req, res) => {
  res.json("Welcome to Siladen API");
});

// Routing get Server FCM Key
app.get("/fcm/key", (req, res) => {
  res.json({
    key: serverFcmKey,
  });
});

// Routing untuk transaksi ke database
app.use("/api", laporan);
app.use("/api", user);
app.use("/api", jenisPasien);
app.use("/auth", authUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
