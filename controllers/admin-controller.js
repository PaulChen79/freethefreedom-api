const { System, Course, User, UserInfo, Schedule } = require('../models')
const { StatusCodes } = require('http-status-codes')

const adminController = {
  createSystem: async (req, res, next) => {
    try {
      const { name } = req.body
      const system = await System.findOne({ where: { name } })
      if (!name) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: 'error',
          message: '需要輸入系統名稱'
        })
      }
      if (system) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: 'error',
          message: '課程系統已存在'
        })
      }
      const newSystem = await System.create({ name })
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '課程系統已創建',
        data: { system: newSystem }
      })
    } catch (error) {
      next(error)
    }
  },
  updateSystem: async (req, res, next) => {
    try {
      const systemId = req.params.id
      const { name } = req.body
      const system = await System.findByPk(systemId)
      if (!name) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: 'error',
          message: '需要輸入系統名稱'
        })
      }
      if (!system) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: 'error',
          message: '課程系統不存在'
        })
      }
      const updatedSystem = await system.update({ name })
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '課程系統已更新',
        data: { system: updatedSystem }
      })
    } catch (error) {
      next(error)
    }
  },
  deleteSystem: async (req, res, next) => {
    try {
      const systemId = req.params.id
      const system = await System.findByPk(systemId)
      if (!system) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: 'error',
          message: '課程系統不存在'
        })
      }
      await system.destroy()
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '課程系統已刪除'
      })
    } catch (error) {
      next(error)
    }
  },
  createCourse: async (req, res, next) => {
    try {
      const { name } = req.body
      const course = await Course.findOne({ where: { name } })
      if (course) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: 'error',
          message: '課程已存在'
        })
      }
      const newCourse = await Course.create(req.body)
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '課程已創建',
        data: { course: newCourse }
      })
    } catch (error) {
      next(error)
    }
  },
  updateCourse: async (req, res, next) => {
    try {
      const courseId = req.params.id
      const course = await Course.findByPk(courseId)
      if (!course) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: 'error',
          message: '課程不存在'
        })
      }
      const updateCourse = await course.update(req.body)
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功編輯課程',
        data: { course: updateCourse }
      })
    } catch (error) {
      next(error)
    }
  },
  deleteCourse: async (req, res, next) => {
    try {
      const courseId = req.params.id
      const course = await Course.findByPk(courseId)
      if (!course) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: 'error',
          message: '課程不存在'
        })
      }
      await course.destroy()
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '課程已刪除'
      })
    } catch (error) {
      next(error)
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({ raw: true, nest: true, include: [UserInfo] })
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功取得所有使用者',
        data: users
      })
    } catch (error) {
      next(error)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId, { raw: true, nest: true, include: [UserInfo] })
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: 'error',
          message: '使用者不存在'
        })
      }
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功取得使用者',
        data: user
      })
    } catch (error) {
      next(error)
    }
  },
  setAuthToUser: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: 'error',
          message: '使用者不存在'
        })
      }
      if (user.email === 'root@example.com') {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: 'error',
          message: '不能變更最高管理員權限'
        })
      }
      const updatedUser = await user.update({ isAdmin: !user.isAdmin })
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功變更使用者權限',
        data: updatedUser
      })
    } catch (error) {
      next(error)
    }
  },
  createSchedule: async (req, res, next) => {
    try {
      const { name } = req.body
      const schedule = await Schedule.findOne({ where: { name } })
      if (schedule) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: 'error',
          message: '開課資訊已存在'
        })
      }
      const newSchedule = await Schedule.create(req.body)
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '開課資訊已創建',
        data: { course: newSchedule }
      })
    } catch (error) {
      next(error)
    }
  },
  updateSchedule: async (req, res, next) => {
    try {
      const scheduleId = req.params.id
      const schedule = await Schedule.findByPk(scheduleId)
      if (!schedule) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: 'error',
          message: '開課資訊不存在'
        })
      }
      const updateSchedule = await schedule.update(req.body)
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功編輯開課資訊',
        data: { schedule: updateSchedule }
      })
    } catch (error) {
      next(error)
    }
  },
  deleteSchedule: async (req, res, next) => {
    try {
      const scheduleId = req.params.id
      const schedule = await Schedule.findByPk(scheduleId)
      if (!schedule) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: 'error',
          message: '開課資訊不存在'
        })
      }
      await schedule.destroy()
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '開課資訊已刪除'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminController
