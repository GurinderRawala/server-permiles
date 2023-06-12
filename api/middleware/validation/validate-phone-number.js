const { check } = require('express-validator')

exports.validatePhoneNumber = () => {
  const validationPhoneNumber = check('phone', 'Enter a valid Phone Number')
    .trim()
    .notEmpty()
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
  return validationPhoneNumber
}
