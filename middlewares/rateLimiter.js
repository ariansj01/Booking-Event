const ipStore = new Map();
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 60000;
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX, 10) || 100;

function rateLimiter(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  const record = ipStore.get(key) || { count: 0, startTime: now };

  if (now - record.startTime < WINDOW_MS) {
    record.count++;
  } else {
    record.count = 1;
    record.startTime = now;
  }

  ipStore.set(key, record);

  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  next();
}

rateLimiter.reset = () => ipStore.clear();

module.exports = rateLimiter;