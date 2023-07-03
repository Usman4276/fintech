const verifySession = (req, res, next) => {
  try {
    if (!req.session.userEmail)
      return res.status(200).send({
        success: false,
        data: null,
        message: "User un-authenticated",
      });

    res.status(200).send({
      success: true,
      data: null,
      message: "User authenticated",
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: index.js:16 ~ verifySession ~ error:",
      error.message
    );
  }
  // next();
};

module.exports = verifySession;
