const { check } = require('express-validator');
exports.validateClient = (clientRepo) =>{
    const clientValidation = check('clientid', 'Invalid client UUID').trim().isUUID()
        .custom(value => clientRepo
            .findAll({ where: { id: value } })
            .then(client => {
                if(client.length === 0){
                    return Promise.reject(`Client is not found`)
                }
            })
        )
    return clientValidation
}