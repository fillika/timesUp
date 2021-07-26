
module.exports.mockErr = (res, status, result) => {
  res.status(status).json({
    status: 'fail',
    message: `Mock error ${status}`,
    data: {
      result
    },
  })
}