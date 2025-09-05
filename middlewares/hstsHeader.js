module.exports = (options = {}) => {
  const maxAge = options.maxAge || 31536000;
  const includeSubDomains = options.includeSubDomains !== false;
  const preload = options.preload === true;
  let headerValue = `max-age=${Math.floor(maxAge)}`;
  if (includeSubDomains) headerValue += '; includeSubDomains';
  if (preload) headerValue += '; preload';
  return (req, res, next) => {
    res.setHeader('Strict-Transport-Security', headerValue);
    next();
  };
};