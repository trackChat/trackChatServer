

function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = `Server Error: ${err}`;
  res.json({ error: err });
}

module.exports = errorHandler;