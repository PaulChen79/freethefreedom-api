const passport = require('../config/passport')
const { StatusCodes } = require('http-status-codes')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error) return next(error)
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'error',
        message: 'Authentication error: no user'
      })
    }
    req.user = { ...user.dataValues }
    next()
  })(req, res, next)
}

const authenticatedAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      message: '帳號不存在'
    })
  }

  if (!req.user.isAdmin) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      message: '權限不足'
    })
  }
  next()
}

module.exports = {
  authenticated,
  authenticatedAdmin
}
