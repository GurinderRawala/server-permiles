const { validateClient } = require("../validate-client")

exports.tripRoutesValidation = ({ check }, tripRepo, clientRepo, driverRepo, route) =>{
    switch(route){
    case 'trip:add-trip':
        return[
            check('id', 'uuid is required').trim().isUUID(),
            validateClient(clientRepo),
            check('assignedTo', 'Assigned driver id is required').trim().isUUID()
                .custom(value => driverRepo
                    .findByPk(value)
                    .then(driver => {
                        if(!driver){
                            return Promise.reject(`Driver not found`)
                        }
                    })),
            check('tripInfo', 'Trip information is required').notEmpty()   
        ]
    case 'trip:update-trip':
        return[
            check('id', 'Invalid id for trip').trim().isUUID()
                .custom(value => tripRepo.findByPk(value).then(trip => {
                    if(!trip){
                        return Promise.reject(`Trip does not exits`)
                    }
                }))
        ]
    case 'trip:by-tripId':
        return[
            check('tripId', 'Trip number is required').trim().notEmpty()
                .custom(tripId => tripRepo.findOne({ where:{ tripId } }).then(trip => { 
                    if(!trip){
                        return Promise.reject(`No record found for Trip#: ${tripId}`)
                    }
                }))
        ]
    default: 
        return []
    }
}