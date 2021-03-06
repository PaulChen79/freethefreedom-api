const { User, UserInfo, Token } = require('../models')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendMail } = require('../utils/nodemailer')

const userController = {
  register: async (req, res, next) => {
    const emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ //eslint-disable-line
    try {
      const { email, username, password, checkPassword } = req.body
      if (!email || !username || !password || !checkPassword) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: '必填欄位不可空白'
          })
      }

      if (!email.trim() || !username.trim() || !password.trim() || !checkPassword.trim()) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: '必填欄位不可空白'
          })
      }

      if (!emailRegex.test(email)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: '信箱格式不符合'
          })
      }

      if (password !== checkPassword) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: '密碼與確認密碼不相符'
          })
      }

      if (username && username.length > 50) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: '使用者名稱不能超過50字元'
          })
      }

      const existEmail = await User.findOne({ where: { email } })
      const existUsername = await User.findOne({ where: { username } })

      if (existEmail) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: 'Email已被註冊過'
          })
      }

      if (existUsername) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: '使用者名稱已被使用'
          })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({ username, email, password: hashedPassword })

      const token = await Token.create({
        userId: user.id,
        token: crypto.randomBytes(32).toString('hex')
      })

      const verificationURL = `http://localhost:3000/verify/${user.id}/${token.token}`

      await sendMail(user.email, verificationURL)
      return res.status(StatusCodes.OK)
        .json({
          status: 'success',
          message: '註冊成功, 請至信箱收取驗證信',
          data: { user }
        })
    } catch (error) {
      next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: '必填欄位不可空白'
          })
      }

      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({
            status: 'error',
            message: 'Email或密碼錯誤'
          })
      }

      const isPasseordMatched = await bcrypt.compare(password, user.password)

      if (!isPasseordMatched) {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({
            status: 'error',
            message: 'Email或密碼錯誤'
          })
      }

      if (!user.verified) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: 'error',
          message: '請先驗證你的Email'
        })
      }

      const payload = {
        id: user.id,
        isAdmin: user.isAdmin
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '登入成功',
        token,
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin
          }
        }
      })
    } catch (error) {
      next(error)
    }
  },
  getProfile: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId, { raw: true, nest: true, include: [UserInfo] })
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND)
          .json({
            status: 'error',
            message: '使用者不存在'
          })
      }
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功取得使用者資訊',
        data: user
      })
    } catch (error) {
      next(error)
    }
  },
  editProfile: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId, { nest: true, include: [UserInfo] })
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND)
          .json({
            status: 'error',
            message: '使用者不存在'
          })
      }
      const updateUserData = await user.update(req.body)
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功編輯使用者資訊',
        data: updateUserData
      })
    } catch (error) {
      next(error)
    }
  },
  verifyEmail: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: '使用者不存在'
          })
      }
      const token = await Token.findOne({ where: { userId, token: req.params.token } })
      if (!token) {
        return res.status(StatusCodes.NOT_ACCEPTABLE)
          .json({
            status: 'error',
            message: '驗證碼不存在'
          })
      }

      await user.update({ verified: true })
      await token.destroy()

      return res.status(StatusCodes.OK).json({
        status: 'success',
        messgae: '信箱驗證成功'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
