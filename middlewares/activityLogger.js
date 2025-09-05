function activityLogger(req, res, next) {
  const log = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString(),
    user: req.user ? req.user.id : 'Guest' 
  };

  console.log('Activity Log:', log);

  next();
}

module.exports = activityLogger;