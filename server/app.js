const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const connectionToMongoDB = require("./database/mongodb");
const userRouter = require("./routes/");
const sessions = require("express-session");

//Environment variables
const PORT = process.env.PORT;
const SECERET_KEY = process.env.SECERET_KEY;

//Connection to MongoDB
connectionToMongoDB();

// Using middlewares
app.use(morgan("dev")); // logger for logging http requests
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // used for allowing (cross-origin-resource-sharing)
app.use(express.json()); // used for parsing incoming requests to json payload
app.use(
  sessions({
    secret: SECERET_KEY,
    cookie: {
      secure: false,
      maxAge: 1000 * 60, // 1 min expiration of session
      httpOnly: false,
    },
    resave: true,
    saveUninitialized: false,
  })
);

//Api routes
app.use("/", userRouter);
app.use("/api/user", userRouter);

// Listening server
server.listen(PORT || "8000", () => {
  console.log(`Listening on ${PORT || 8000}`);
});
