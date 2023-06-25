const express = require("express");
const router = express.Router();

//Controllers
const {
  userLogin,
  userSignup,
  userLogout,
  getUserData,
} = require("../controllers/user");

//Middlewares
const verifySession = require("../middlewares/");

//-----Home Route------
router.get("/", (req, res) => {
  res.send("welcome to server home page");
});

//-----User Routes------
router.post("/login", userLogin);
router.post("/sign-up", userSignup);
router.get("/logout", userLogout);
router.get("/verify-user", verifySession);
router.get("/profile", getUserData);

module.exports = router;
