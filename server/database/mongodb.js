const mongoose = require("mongoose");
const { MONGODB_URL } = require("../config/keys");

function connectionToMongoDB() {
  mongoose
    .connect(MONGODB_URL)
    .then(() => console.log("Connection established successfully"))
    .catch(() => console.log("Connection to DB failed"));
}

module.exports = connectionToMongoDB;
