module.exports = (options = {}) => {
  const {
    allowedOrigins = ['*'],
    allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders = ['Content-Type', 'Authorization'],
    allowCredentials = false
  } = options;

  return (req, res, next) => {
    const origin = req.headers.origin;
    const originToSet = allowedOrigins.includes('*')
      ? '*'
      : allowedOrigins.includes(origin)
      ? origin
      : '';

    if (originToSet) {
      res.setHeader('Access-Control-Allow-Origin', originToSet);
    }
    if (allowCredentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(','));
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(','));
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  };
};