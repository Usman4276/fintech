const User = require("../models/user");
const hashPassword = require("../utils/");

// User login
async function userLogin(req, res) {
  const { email, password } = req.body;
  try {
    /* 
      Validating inputs 
    */
    if (!email || !password)
      return res.send({
        status: 404,
        success: false,
        data: null,
        message: "Empty input fields",
      });

    if (typeof email !== "string" || typeof password !== "string")
      return res.send({
        status: 404,
        success: false,
        data: null,
        message: "Invalid input data type, it should be string",
      });

    const userData = await User.find({ email }, { password: 0 });

    if (!userData.length)
      return res.send({
        status: 404,
        success: false,
        data: null,
        message: "User not found",
      });

    /* 
      Session creation
    */
    req.session.userEmail = email;

    res.send({
      status: 200,
      success: true,
      data: userData,
      message: "login successfully",
    });
  } catch (error) {
    res.send({
      status: 500,
      success: false,
      data: null,
      message: "Server error",
    });
  }
}

// User sign-up
async function userSignup(req, res) {
  const { firstname, lastname, email, password } = req.body;
  try {
    //Validating inputs
    if (!firstname || !lastname || !email || !password)
      return res.send({
        status: 404,
        success: false,
        data: null,
        message: "Empty input fields",
      });

    if (
      typeof firstname !== "string" ||
      typeof lastname !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    )
      return res.send({
        status: 404,
        success: false,
        data: null,
        message: "Invalid input data type, it should be string",
      });

    //Checking for user already registered
    const userData = await User.findOne({ email });
    if (userData)
      return res.send({
        status: 404,
        success: false,
        data: null,
        message: "User already registered",
      });

    //Creating new user
    const result = await User.create({
      firstname,
      lastname,
      email,
      password: await hashPassword(password),
    });
    if (!result)
      return res.send({
        status: 404,
        success: false,
        data: null,
        message: "User not created successfully",
      });

    res.send({
      status: 200,
      success: true,
      data: null,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      status: 500,
      success: false,
      data: null,
      message: "Server error",
    });
  }
}

// User logout
async function userLogout(req, res) {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid").end();
  } catch (error) {
    res.send({
      status: 500,
      success: false,
      data: null,
      message: "Server error",
    });
  }
}

// Get users profile
async function getUserData(req, res) {
  try {
    if (!req.session.userEmail)
      return res.send({
        status: 200,
        success: false,
        data: null,
        message: "User un-authenticated",
      });

    res.send({
      status: 200,
      success: true,
      data: req.session.userEmail,
      message: null,
    });
  } catch (error) {
    res.send({
      status: 500,
      success: false,
      data: null,
      message: "Server error",
    });
  }
}

module.exports = { userLogin, userSignup, userLogout, getUserData };
