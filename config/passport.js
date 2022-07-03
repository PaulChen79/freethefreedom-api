const passport = require('passport')
const { User } = require('../models')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } })
    if (!user) return done(null, false)
    return done(null, user)
  } catch (error) {
    done(error, false)
  }
}))

module.exports = passport
