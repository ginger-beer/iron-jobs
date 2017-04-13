module.exports = function errHandler(err, req, res, next) {
  console.error("Error", err.message);
  res.status(err.status || 500);
  res.json({message: err.message, status: res.status});
};
