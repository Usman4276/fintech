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
const {
  verifySession,
  rateLimiter,
  requestInputsValidator,
} = require("../middlewares/");

//Request validation schemas
const { userSignupSchema, userLoginSchema } = require("../schemas/user");

//-----Home Route------
router.get("/", (req, res) => {
  res.send("welcome to server home page");
});

//-----User Routes------
router.post(
  "/login",
  rateLimiter,
  requestInputsValidator(userLoginSchema),
  userLogin
);
router.post("/sign-up", requestInputsValidator(userSignupSchema), userSignup);
router.get("/logout", userLogout);
router.get("/verify-user", verifySession);
router.get("/profile", getUserData);

module.exports = router;
