const { validateEmail } = require('../validate-email')
const { validatePhoneNumber } = require('../validate-phone-number')
const clientIdValidation = (check, clientRepo, field) => {
  const validation = check(field, 'Invalid client ID')
    .trim()
    .isUUID()
    .custom((value) =>
      clientRepo.findByPk(value).then((client) => {
        if (!client) {
          return Promise.reject(`client not found`)
        }
      })
    )
  return validation
}
exports.clientRoutesValidation = (
  userAccountRepo,
  clientRepo,
  { check },
  route
) => {
  switch (route) {
    case 'client:invite-user':
      return [
        check('id', 'Invalid UUID').trim().isUUID(),
        check('firstname', 'First Name is Required').trim().notEmpty(),
        check('lastname', 'Last Name is Required').trim().notEmpty(),
        check('username', 'Username is Required')
          .trim()
          .notEmpty()
          .isLength({ min: 4 }),
        validateEmail(userAccountRepo),
        check('password', 'Enter a valid Password').trim().notEmpty(),
        check('password', 'Password has to be minimum 6 character').isLength({
          min: 6,
        }),
        check('company', 'Company Name is Required').trim().notEmpty(),
        check('role', 'User Role is Required').trim().notEmpty(),
        check('active', 'Active status is Required').isBoolean(),
        check('awaitingSignup', 'Await signup is Required').isBoolean(),
        clientIdValidation(check, clientRepo, 'clientid'),
      ]
    case 'client:retreive':
      return [clientIdValidation(check, clientRepo, 'id')]
    case 'client:update':
      return [clientIdValidation(check, clientRepo, 'id')]
    case 'client:create':
      return [
        check('id', 'Invalid UUID').trim().isUUID(),
        check('name', 'Name is Required').trim().notEmpty(),
        check('legalname', 'Legal Name is Required').trim().notEmpty(),
        check('startdate', 'Start Date is Required').trim().notEmpty(),
        check('streetaddress', 'Street Address is Required').trim().notEmpty(),
        check('postalcode', 'Postal Code is Required').trim().notEmpty(),
        check('city', 'City Name is Required').trim().notEmpty(),
        check('country', 'Country is Required').trim().notEmpty(),
        check('province', 'Province is Required').trim().notEmpty(),
        check('isActive', 'Activity Status is Missing').trim().notEmpty(),
        validateEmail(clientRepo),
        validatePhoneNumber(),
        check('contactname', 'Contact Person Name is Required')
          .trim()
          .notEmpty(),
      ]
    default:
      return []
  }
}
