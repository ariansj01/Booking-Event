const crypto = require('crypto')
const cookieParser = require('cookie-parser')

function csrfProtection(options = {}) {
  const cookieName = options.cookieName || 'XSRF-TOKEN'
  const headerName = options.headerName || 'X-XSRF-TOKEN'
  return (req, res, next) => {
    cookieParser()(req, res, err => {
      if (err) return next(err)
      const token = req.cookies[cookieName]
      if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        if (!token) {
          const newToken = crypto.randomBytes(24).toString('hex')
          res.cookie(cookieName, newToken, { httpOnly: false })
        }
        return next()
      }
      const sent = req.get(headerName) || (req.body && req.body._csrf)
      if (token && sent === token) return next()
      res.status(403).send('Invalid CSRF Token')
    })
  }
}

module.exports = csrfProtection