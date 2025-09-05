function checkRole(...allowedRoles) {
  return (req, res, next) => {
    const role = req.user && req.user.role
    if (role && allowedRoles.includes(role)) {
      return next()
    }
    res.status(403).json({ message: 'Forbidden' })
  }
}

module.exports = checkRole