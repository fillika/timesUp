
const { AppError } = require('../Error')

module.exports.mockErr = (status, next) => {
  next(new AppError('Mock error', status))
}