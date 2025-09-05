const xssPattern = /<script\b[^>]*>[\s\S]*?<\/script>|\bon\w+\s*=\s*(?:"[^"]*"|'[^']*')|javascript:/i;

function hasXssValue(v) {
  if (typeof v === 'string') {
    return xssPattern.test(v);
  }

  if (Array.isArray(v)) {
    return v.some(hasXssValue);
  }

  if (v && typeof v === 'object') {
    return Object.values(v).some(hasXssValue);
  }

  return false;
}

module.exports = function xssChecker(req, res, next) {
  if (
    hasXssValue(req.body) ||
    hasXssValue(req.query) ||
    hasXssValue(req.params)
  ) {
    return res
      .status(400)
      .json({ error: 'Potential XSS attack detected' });
  }
  next();
};
