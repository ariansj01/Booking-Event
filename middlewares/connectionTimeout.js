function connectionTimeout(ms = 120000) {
  return (req, res, next) => {
    res.setTimeout(ms, () => {
      if (!res.headersSent) {
        res.status(503).json({ message: 'Service Unavailable' });
      }
    });
    next();
  };
}

module.exports = connectionTimeout;