const { validationResult } = require('express-validator')
exports.validationErrorMessage = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422)
    next(errors.array())
    return true
  }
  return false
}
