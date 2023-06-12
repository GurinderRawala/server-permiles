const { validateClient } = require('../validate-client')
const { validateEmail } = require('../validate-email')
const { validatePhoneNumber } = require('../validate-phone-number')
const driverIdValidation = (check, Repo) => {
  const validation = check('driver_id', 'Driver ID is Required')
    .trim()
    .notEmpty()
    .custom((value) =>
      Repo.findOne({ where: { driver_id: value } }).then((user) => {
        if (user) {
          return Promise.reject(`Driver Id already exits`)
        }
      })
    )
  return validation
}
exports.driverRoutesValidation = ({ check }, driverRepo, clientRepo, route) => {
  switch (route) {
    case 'driver:invite':
      return [
        check('id', 'Invalid UUID').trim().isUUID(),
        check('firstname', 'First Name is Required').trim().notEmpty(),
        check('lastname', 'Last Name is Required').trim().notEmpty(),
        validatePhoneNumber(),
        validateEmail(driverRepo),
        driverIdValidation(check, driverRepo),
        check('drivers_licence', 'Driver Licence number is Required')
          .trim()
          .notEmpty(),
        check('licence_state', 'Licence state/province is Required')
          .trim()
          .notEmpty(),
        check('street', 'Street Name is required').trim().notEmpty(),
        check('city', 'City Name is required').trim().notEmpty(),
        check('state', 'State Name is Required').trim().notEmpty(),
        check('postal', 'Postal code is required').trim().notEmpty(),
        check('country', 'Country Name is Required').trim().notEmpty(),
        check('awaitingSignup', 'Await signup is Required').isBoolean(),
        validateClient(clientRepo),
      ]
    case 'driver:update':
      return [
        check('id', 'Invalid UUID')
          .trim()
          .isUUID()
          .custom((value) =>
            driverRepo.findByPk(value).then((driver) => {
              if (!driver) {
                return Promise.reject(`Driver not found`)
              }
            })
          ),
      ]
    case 'driver:get-driver':
      return [
        check('email', 'Provide a valid driver email')
          .trim()
          .isEmail()
          .normalizeEmail()
          .custom((value) =>
            driverRepo.findOne({ where: { email: value } }).then((driver) => {
              if (!driver) {
                return Promise.reject('No driver found, provide a valid email')
              }
            })
          ),
      ]
    case 'driver:activate':
      return [
        check('id', 'Invalid driver Id')
          .trim()
          .isUUID()
          .custom((value) =>
            driverRepo.findByPk(value).then((driver) => {
              if (!driver) {
                return Promise.reject('Driver is not found')
              }
            })
          ),
        check('password', 'Password must have more then 5 characters')
          .trim()
          .notEmpty()
          .isLength({ min: 6 }),
        check('confirmPassword', 'Repeat password does not match password')
          .exists()
          .custom((value, { req }) => value === req.body.password),
      ]
    case 'driver:reset-password':
      return [
        check('email', 'Provide a valid driver email')
          .trim()
          .isEmail()
          .custom((value) =>
            driverRepo.findOne({ where: { email: value } }).then((user) => {
              if (!user) {
                return Promise.reject(`${value} email does not exits`)
              }
            })
          ),
      ]
    default:
      return []
  }
}
