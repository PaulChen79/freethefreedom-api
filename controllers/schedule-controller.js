const { Schedule, Course, ReservedSchedule, User } = require('../models')
const { StatusCodes } = require('http-status-codes')

const scheduleController = {
  getSchedules: async (req, res, next) => {
    console.log(req.user)
    if (req.user) {
      try {
        let schedules = await Schedule.findAll({
          nest: true,
          include: [
            { model: Course, attributes: ['id', 'name'] },
            { model: User, as: 'UserReservedSchedules' }
          ]
        })
        schedules = await schedules.map(schedule => ({
          ...schedule.toJSON(),
          UserReservedSchedules: schedule.UserReservedSchedules.map(user => {
            return {
              id: user.id,
              username: user.username
            }
          })
        }))
        return res.status(StatusCodes.OK).json({
          status: 'success',
          message: '成功取得所有開課資訊',
          data: schedules
        })
      } catch (error) {
        next(error)
      }
    } else {
      try {
        const schedules = await Schedule.findAll({
          raw: true,
          nest: true,
          include: [
            { model: Course, attributes: ['id', 'name'] }
          ]
        })
        return res.status(StatusCodes.OK).json({
          status: 'success',
          message: '成功取得所有開課資訊',
          data: schedules
        })
      } catch (error) {
        next(error)
      }
    }
  },
  getSchedule: async (req, res, next) => {
    if (req.user) {
      try {
        const scheduleId = req.params.id
        let schedule = await Schedule.findByPk(scheduleId, {
          nest: true,
          include: [
            { model: Course, attributes: ['id', 'name'] },
            { model: User, as: 'UserReservedSchedules' }
          ]
        })
        if (!schedule) {
          return res.status(StatusCodes.NOT_FOUND).json({
            status: 'error',
            message: '開課資訊不存在'
          })
        }
        schedule = await schedule.toJSON()
        schedule.UserReservedSchedules = await schedule.UserReservedSchedules.map(user => {
          return {
            id: user.id,
            username: user.username
          }
        })
        return res.status(StatusCodes.OK).json({
          status: 'success',
          message: '成功取得開課資訊',
          data: schedule
        })
      } catch (error) {
        next(error)
      }
    } else {
      try {
        const scheduleId = req.params.id
        const schedule = await Schedule.findByPk(scheduleId, {
          raw: true,
          nest: true,
          include: [
            { model: Course, attributes: ['id', 'name'] }
          ]
        })
        if (!schedule) {
          return res.status(StatusCodes.NOT_FOUND).json({
            status: 'error',
            message: '開課資訊不存在'
          })
        }
        return res.status(StatusCodes.OK).json({
          status: 'success',
          message: '成功取得開課資訊',
          data: schedule
        })
      } catch (error) {
        next(error)
      }
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
