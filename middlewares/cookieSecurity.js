function cookieSecurity(defaultOpts = {}) {
  const baseOpts = { httpOnly: true, secure: true, sameSite: 'Strict', ...defaultOpts };
  return (req, res, next) => {
    const originalCookie = res.cookie.bind(res);
    res.cookie = (name, value, opts = {}) => {
      const merged = { ...baseOpts, ...opts };
      return originalCookie(name, value, merged);
    };
    next();
  };
}

module.exports = cookieSecurity;