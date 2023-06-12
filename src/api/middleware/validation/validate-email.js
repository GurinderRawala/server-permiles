const { check } = require('express-validator')
exports.validateEmail = (Repo) => {
  const validationEmail = check('email', 'Enter a valid Email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .custom((value) => {
      return Repo.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(`Provided Email already exits`)
        }
      })
    })
  return validationEmail
}
