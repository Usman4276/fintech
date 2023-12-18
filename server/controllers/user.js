const User = require("../models/user");
const hashPassword = require("../utils/");
const { v4: uuidv4 } = require("uuid");
const { CustomError } = require("../middlewares/index");

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

    const userData = await User.findOne({ email }, { password: 0 });

    if (!userData)
      return res.send({
        status: 404,
        success: false,
        data: null,
        message: "User not found",
      });

    /* 
      Session creation
    */
    const sessionId = uuidv4();
    const isSessionSet = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          sessionId,
        },
      },
      { new: true }
    );

    if (!isSessionSet) throw new Error("Session creation failed");
    res.cookie("session_id", uuidv4());

    res.send({
      status: 200,
      success: true,
      data: userData,
      message: "Login successfully",
    });
  } catch (error) {
    res.send({
      status: 404,
      success: false,
      data: null,
      message: error.message,
    });
  }
}

// User sign-up
async function userSignup(req, res) {
  const { firstname, lastname, email, password } = req.body;
  try {
    //Checking for user already registered
    const userData = await User.findOne({ email });
    if (userData) throw new CustomError("User already registered", 500);

    //Creating new user
    await User.create({
      firstname,
      lastname,
      email,
      password: await hashPassword(password),
    });

    res.send({
      status: 200,
      success: true,
      data: null,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
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
    console.log("req===>", req.cookies.session_id);
    if (!req.cookies.session_id)
      return res.send({
        status: 200,
        success: false,
        data: null,
        message: "User not authenticated",
      });

    const userData = await User.findOne(
      { email: req.session.userEmail },
      { password: 0 }
    );

    res.send({
      status: 200,
      success: true,
      data: userData,
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
