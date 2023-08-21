const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const consumerSecret = "cs_4f7db45f84af91fe47967250aeebefa48d436aff";
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url} ${JSON.stringify(
    req.body
  )} ${JSON.stringify(req.headers)}`;
  writeToLogFile(logMessage);
  next();
});

app.post("/productCreated", (req, res) => {
  res.status(200).json({
    message: "Webhook received and processed successfully",
    // consumerSecret,
  });
});

app.post("/orderCreated", (req, res) => {
  res.status(200).json({
    message: "Webhook received and processed successfully",
    // consumerSecret,
  });
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});

function writeToLogFile(message) {
  const logFilePath = path.join(__dirname, "server.log");
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}
