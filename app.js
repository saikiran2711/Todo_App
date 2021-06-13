const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/todo"));

const port = 8080;
app.listen(port, () => {
  console.log("server started");
});
