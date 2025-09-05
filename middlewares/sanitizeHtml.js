const stripTags = str =>
  str
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?[^>]+>/g, '');

const sanitizeValue = v => {
  if (typeof v === 'string') {
    return stripTags(v);
  }

  if (Array.isArray(v)) {
    return v.map(sanitizeValue);
  }

  if (v && typeof v === 'object') {
    return Object.keys(v).reduce((out, key) => {
      out[key] = sanitizeValue(v[key]);
      return out;
    }, {});
  }

  return v;
};

module.exports = function sanitizeHtml(req, res, next) {
  if (req.body)  req.body  = sanitizeValue(req.body);
  if (req.query) req.query = sanitizeValue(req.query);
  next();
};