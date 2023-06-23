const mongoose = require("mongoose");

//Defining the user schema
const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

//Defining the user model
const User = mongoose.model("user", userSchema);

export default User;
