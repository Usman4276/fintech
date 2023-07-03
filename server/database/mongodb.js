const mongoose = require("mongoose");

function connectionToMongoDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connection established successfully"))
    .catch(() => console.log("Connection to DB failed"));
}

module.exports = connectionToMongoDB;
