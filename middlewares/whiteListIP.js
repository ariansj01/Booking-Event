const whitelist = process.env.IP_WHITELIST
  ? process.env.IP_WHITELIST.split(',').map(addr => addr.trim())
  : [];

const getClientIp = req => {
  const forwarded = req.headers['x-forwarded-for'];
  let ip = forwarded
    ? forwarded.split(',')[0].trim()
    : (req.connection && req.connection.remoteAddress) ||
      (req.socket && req.socket.remoteAddress) ||
      req.ip;
  if (ip.startsWith('::ffff:')) {
    ip = ip.slice(7);
  }
  return ip;
};

function ipWhitelist(req, res, next) {
  const clientIp = getClientIp(req);
  if (whitelist.includes(clientIp)) {
    return next();
  }
  res.status(403).json({ error: 'Forbidden' });
}

module.exports = ipWhitelist;