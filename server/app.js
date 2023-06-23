const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const morgan = require("morgan");
const { PORT } = require("./config/keys");
require("dotenv").config();
const cors = require("cors");
const connectionToMongoDB = require("./database/mongodb");
const userRouter = require("./routes/");

//Connection to MongoDB
connectionToMongoDB();

// Using middlewares
app.use(morgan("dev")); // logger for logging http requests
app.use(cors()); // used for allowing (cross-origin-resource-sharing)
app.use(express.json()); // used for parsing incoming requests to json payload

//Api routes
app.use("/", userRouter);
app.use("/api/user", userRouter);

// Listening server
server.listen(PORT || "8000", () => {
  console.log(`Listening on ${PORT || 8000}`);
});
