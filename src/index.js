const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user.route");
const prodRouter = require("./routes/products.routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://bewakoof-frontend.onrender.com", // No trailing slash
  credentials: true, // Included credentials as true
};

app.use(cors(corsOptions));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://bewakoof-frontend.onrender.com"); // No trailing slash
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  res.send("App working");
});

app.use("/users", userRouter);
app.use("/", prodRouter);

module.exports = app;
