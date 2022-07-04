const { System, Course } = require('../models')
const { StatusCodes } = require('http-status-codes')

const courseController = {
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
        return res.status(StatusCodes.NOT_FOUND).json({
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
  }
}

module.exports = courseController
