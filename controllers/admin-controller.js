const { System } = require('../models')
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
  }
}

module.exports = adminController
