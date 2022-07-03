const { System, Course } = require('../models')
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
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
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
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
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
  getCourses: async (req, res, next) => {
    try {
      const courses = await Course.findAll({ raw: true, nest: true, include: [{ model: System, attributes: ['name'] }] })
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功取得所有課程',
        data: courses
      })
    } catch (error) {
      next(error)
    }
  },
  getCourse: async (req, res, next) => {
    try {
      const courseId = req.params.id
      const course = await Course.findByPk(courseId, { raw: true, nest: true, include: [{ model: System, attributes: ['name'] }] })
      if (!course) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: 'error',
          message: '課程不存在'
        })
      }
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: '成功取得課程',
        data: { course }
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
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
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
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
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
  }
}

module.exports = adminController
