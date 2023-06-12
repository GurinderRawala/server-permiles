const { validateClient } = require('../validate-client')

exports.trailerRoutesValidation = (
  { check, body },
  trailerRepo,
  clientRepo,
  route
) => {
  switch (route) {
    case 'trailer:add-trailer':
      return [
        check('id', 'uuid is required').trim().isUUID(),
        validateClient(clientRepo),
        check('model', 'Model name is required').trim().notEmpty(),
        check('make', 'Make name is required').trim().notEmpty(),
        check('year', 'Year of equipment is required').trim().notEmpty(),
        check('trailerNo', 'Trailer Number is required').trim().notEmpty(),
        check('licencePlate', 'Licence plate is required').trim().notEmpty(),
        check('licenceState', 'Licence plate state is required')
          .trim()
          .notEmpty(),
        check('safetyExpire', 'Safety expire date is required')
          .trim()
          .notEmpty(),
        check('trailerAttributes', 'Trailer attributes are required')
          .trim()
          .notEmpty(),
        check('vinNumber')
          .trim()
          .if(body('vinNumber').notEmpty())
          .isLength({ min: 17 })
          .custom((vinNumber) =>
            trailerRepo.findOne({ where: { vinNumber } }).then((trailer) => {
              if (trailer) {
                return Promise.reject('Invalid vin number')
              }
            })
          ),
      ]
    case 'trailer:update-trailer':
      return [
        check('id', 'uuid is required')
          .trim()
          .isUUID()
          .custom((id) =>
            trailerRepo.findByPk(id).then((trailer) => {
              if (!trailer) {
                return Promise.reject('No trailer found')
              }
            })
          ),
      ]
    case 'trailer:by-trailer-number':
      return [
        check('trailerNo', 'Trailer Number is required')
          .trim()
          .notEmpty()
          .if(body('trailerNo').notEmpty())
          .custom((trailerNo) =>
            trailerRepo.findOne({ where: { trailerNo } }).then((trailer) => {
              if (!trailer) {
                return Promise.reject(
                  `No trailer found by trailer#:${trailerNo}`
                )
              }
            })
          ),
      ]
    default:
      return []
  }
}
