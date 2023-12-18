const rateLimit = require("express-rate-limit");

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

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Limit exceeded, Please try again after 1 min",
  standardHeaders: true,
  legacyHeaders: false,
});

const requestInputsValidator = (schema) => {
  return (req, res, next) => {
    const inputs = {
      ...req.params,
      ...req.body,
    };
    const { error } = schema.validate(inputs);
    if (error) res.status(404).send(error.message);
    next();
  };
};

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

module.exports = {
  verifySession,
  rateLimiter,
  requestInputsValidator,
  CustomError,
};
