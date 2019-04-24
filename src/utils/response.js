const httpStatus = require('http-status')

export default (res, data = {}, code = httpStatus.OK) => {
  let result = {
    success: true
  }

  if (code > 399) {
    result.success = false
  }

  if (typeof data === 'object') {
    result = Object.assign(result, {
      data
    })
  }

  return res.status(code).json(result)
}
