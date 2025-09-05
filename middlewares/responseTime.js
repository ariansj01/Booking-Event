const responseTime = (req, res, next) => {
  const start = process.hrtime()
  const originalWriteHead = res.writeHead
  res.writeHead = function (...args) {
    const diff = process.hrtime(start)
    const ms = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(3)
    res.setHeader('X-Response-Time', `${ms}ms`)
    return originalWriteHead.apply(this, args)
  }
  next()
}
module.exports = responseTime