const { Schedule, Course, ReservedSchedule } = require('../models')
const { StatusCodes } = require('http-status-codes')

const scheduleController = {
  getSchedules: async (req, res, next) => {
    try {
      const schedules = await Schedule.findAll({ raw: true, nest: true, include: [Course] })
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功取得所有開課資訊',
        data: schedules
      })
    } catch (error) {
      next(error)
    }
  },
  getSchedule: async (req, res, next) => {
    try {
      const scheduleId = req.params.id
      const schedule = await Schedule.findByPk(scheduleId, { raw: true, nest: true, include: [Course] })
      if (!schedule) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: 'error',
          message: '開課資訊不存在'
        })
      }
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功取得開課資訊',
        data: { schedule }
      })
    } catch (error) {
      next(error)
    }
  },
  reserveSchedule: async (req, res, next) => {
    try {
      const scheduleId = req.params.id
      const userId = req.user.id
      const schedule = await Schedule.findByPk(scheduleId)
      if (schedule.maxPeople <= 0) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: 'error',
          message: '開課人數已滿'
        })
      }
      const reserveSchedule = await ReservedSchedule.findOne({ where: { userId, scheduleId } })
      if (reserveSchedule) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: 'error',
          message: '你已報名過此課程'
        })
      }
      await ReservedSchedule.create({ userId, scheduleId })
      await schedule.decrement('maxPeople')
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '你已成功報名此課程'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = scheduleController
