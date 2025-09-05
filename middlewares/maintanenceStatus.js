function maintenance(req, res, next) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return res.status(503).json({ error: 'Service under maintenance' });
  }
  next();
}
module.exports = maintenance;