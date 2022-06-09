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
    default: 
        return []
    }
}