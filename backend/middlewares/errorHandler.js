function logError(err, req, res, next) {
  console.error(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error'
  });
}

module.exports = {
  logError,
  returnError
};
