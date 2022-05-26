const { validateClient } = require("../validate-client")
const { validateEmail } = require("../validate-email")
const { validatePhoneNumber } = require("../validate-phone-number")
const driverIdValidation = (check, Repo) =>{
    const validation = check('driver_id', 'Driver ID is Required').trim().notEmpty()
        .custom((value) => Repo
            .findAll({ where: { driver_id: value } })
            .then(user => {
                if(user.length > 0){
                    return Promise.reject(`Driver Id already exits`)
                }
            })
        )
    return validation
}
exports.driverRoutesValidation = ({ check }, driverRepo, clientRepo, route) =>{
    switch(route){
    case 'driver:create':
        return[
            check('id', 'Invalid UUID').trim().isUUID(),
            check('firstname', 'First Name is Required').trim().notEmpty(),
            check('lastname', 'Last Name is Required').trim().notEmpty(),
            validatePhoneNumber(),
            validateEmail(driverRepo),
            driverIdValidation(check, driverRepo),
            check('drivers_licence', 'Driver Licence number is Required').trim().notEmpty(),
            check('licence_state', 'Licence state/province is Required').trim().notEmpty(),
            validateClient(clientRepo)
        ]
    case 'driver:update':
        return[
            check('id', 'Invalid UUID').trim().isUUID()
                .custom(value => driverRepo
                    .findByPk(value)
                    .then(driver => {
                        if(!driver){
                            return Promise.reject(`Driver not found`)
                        }
                    })
                )
        ]
    default:
        return []
        
    }
}