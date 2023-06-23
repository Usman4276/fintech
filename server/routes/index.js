const express = require("express");
const router = express.Router();

//Controllers
const userLogin = require("../controllers/user");

//-----Home Route------
router.get("/", (req, res) => {
  res.send("welcome to server home page");
});

//-----User Routes------
router.post("/", userLogin);

module.exports = router;
