const { randomBytes } = require('crypto');

function requestId(req, res, next) {
  const id = randomBytes(16).toString('hex');
  req.requestId = id;
  res.setHeader('X-Request-Id', id);
  next();
}

module.exports = requestId;