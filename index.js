require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./src/Configs/db");

const PORT = process.env.PORT || 5173;

const userRouter = require("./src/routes/user.route");
const prodRouter = require("./src/routes/products.routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://bewakoof-frontend.onrender.com", // No trailing slash
  credentials: true, // Included credentials as true
};

app.use(cors(corsOptions));

// Optionally set headers for all routes
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

app.listen(PORT, async () => {
  await connection;
  console.log(`Server started at ${PORT}`);
});
