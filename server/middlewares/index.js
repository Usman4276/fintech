const verifySession = (req, res, next) => {
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
  next();
};

module.exports = verifySession;
