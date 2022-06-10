const { validateClient } = require("../validate-client")

exports.truckRoutesValidation = ({ check, body }, truckRepo, clientRepo, route) =>{
    switch(route){
    case 'truck:add-truck':
        return[
            check('id', 'uuid is required').trim().isUUID(),
            validateClient(clientRepo),
            check('model', 'Model name is required').trim().notEmpty(),
            check('make', 'Make name is required').trim().notEmpty(),
            check('year', 'Year of equipment is required').trim().notEmpty(),
            check('truckNo', 'Truck Number is required').trim().notEmpty(),
            check('licencePlate', 'Licence plate is required').trim().notEmpty(),
            check('licenceState', 'Licence plate state is required').trim().notEmpty(),
            check('safetyExpire', 'Safety expire date is required').trim().notEmpty(),
            check('vinNumber').trim().if(body('vinNumber').notEmpty()).isLength({min: 17})
                .custom(vinNumber => truckRepo.findOne({ where:{ vinNumber } }).then(truck =>{
                    if(truck){
                        return Promise.reject('Invalid vin number')
                    }
                }))
        ]
    case 'truck:update-truck':
        return[
            check('id', 'uuid is required').trim().isUUID()
                .custom(id => truckRepo.findByPk(id).then(truck => {
                    if(!truck){
                        return Promise.reject('No truck found')
                    }
                }))
        ]
    case 'truck:by-truck-number':
        return[
            check('truckNo', 'Truck Number is required').trim().notEmpty().if(body('truckNo').notEmpty())
                .custom(truckNo => truckRepo.findOne({where:{ truckNo }}).then(truck =>{
                    if(!truck){
                        return Promise.reject(`No truck found by truck#:${truckNo}`)
                    }
                }) )
        ]
    default:
        return []
    }
}