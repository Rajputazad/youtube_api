require("dotenv").config();
require("./database/config");
var morgan = require("morgan");
const express = require("express");
const app = express();
const port = 5000;
const router = express.Router();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
// app.use(express.static(__dirname + '/public'));
// app.use('/assets/images', express.static('assets/images'));
const Video = require("./video")(router);

app.use(express.json({limit: '100mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:4200", "*"],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id,authorization");

  next();
});

// const auth = require("./middleware/auth");
app.use(morgan("dev")); 

app.use("/", Video);

app.listen(port, () => {
  console.log(`Port = ${port} URL:-http://localhost:${port}`);
});
