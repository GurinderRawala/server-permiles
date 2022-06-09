const { validateClient } = require("../validate-client")
const { validatePhoneNumber } = require("../validate-phone-number")
const validateEmailExits = (check, brokerRepo) =>{
    return check('email', 'Provide Broker email address').isEmail()
        .custom(value => brokerRepo
            .findOne({where:{ email: value }})
            .then(broker =>{
                if(broker){
                    return Promise.reject('Provided broker email already exits')
                }
            }))
}
const validateBrokerId = (check, brokerRepo, field) => {
    return check(field, 'Broker Id is required').trim().isUUID()
        .custom(value => brokerRepo
            .findByPk(value).then(broker =>{ 
                if( !broker ){ 
                    return Promise.reject('Broker does not exits')
                } 
            }
            ))
}
const brokerRoutesValidation = ({ check }, brokerRepo, clientRepo, route) =>{
    switch(route){
    case 'broker:add-broker':
        return[
            check('id', 'Invalid UUID').trim().isUUID(),
            validateClient(clientRepo),
            validateEmailExits(check, brokerRepo),
            check('name', 'Broker Name is required').trim().notEmpty(),
            check('streetaddress', 'Street Address is required').trim().notEmpty(),
            check('city', 'City Name is required').trim().notEmpty(),
            check('postalcode', 'Postal code is required').trim().notEmpty(),
            check('province', 'Province/State is required').trim().notEmpty(),
            check('country', 'Country field is required').trim().notEmpty(),
            validatePhoneNumber(),
            check('contactname', 'Contact person name is required').trim().notEmpty()
        ]
    case 'broker:update-broker':
        return[
            validateBrokerId(check, brokerRepo, 'id')
        ]
    case 'broker:by-name':
        return[
            check('name', 'Broker Name is Required').trim().notEmpty()
                .custom(name => brokerRepo.findOne({ 
                    where:{ name } 
                }).then(broker =>{
                    if(!broker){
                        return Promise.reject(`No broker is found by name: ${name}`)
                    }
                }))
        ]
    }
}

module.exports = {
    validateBrokerId,
    brokerRoutesValidation
}