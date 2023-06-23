async function userLogin(req, res) {
  try {
    res.status(200).send({
      message: "user login",
    });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
    });
  }
}

module.exports = userLogin;
