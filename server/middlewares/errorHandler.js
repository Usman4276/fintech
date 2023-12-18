const errorHandler = (error, req, res, next) => {
  res.send(error.message).status(error.statusCode);
};
module.exports = errorHandler;
