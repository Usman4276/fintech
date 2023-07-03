const mongoose = require("mongoose");

//Defining the user schema
const userSchema = mongoose.Schema({
  firstname: { type: String, unique: true, required: true },
  lastname: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

//Defining the user model
const User = mongoose.model("user", userSchema);

module.exports = User;
