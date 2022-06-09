const { validateClient } = require("../validate-client")
const { validateBrokerId } = require("./broker-routes-validation")

exports.loadRoutesValidation = ({ check }, loadRepo, clientRepo, brokerRepo, route) =>{
    switch(route){
    case 'loads:add-load':
        return[
            check('id', 'Invalid uuid for load').trim().isUUID(),
            validateClient(clientRepo),
            validateBrokerId(check, brokerRepo, 'brokerId'),
            check('shipper', 'Shipper information is required').notEmpty(),
            check('receiver', 'Reciever information is required').notEmpty(),
            check('poNumber', 'Po number is required').trim().notEmpty(),
            check('hazmat', 'Hazmat information is required').isBoolean()
        ]
    case 'loads:update-load':
        return[
            check('id', 'Invalid id for load').trim().isUUID()
                .custom(value => loadRepo.findByPk(value).then(load => {
                    if(!load){
                        return Promise.reject(`Load does not exits`)
                    }
                }))
        ]
    case 'loads:by-loadId':
        return[
            check('loadId', 'Load number is required').trim().notEmpty()
                .custom(loadId => loadRepo.findOne({ where:{ loadId } }).then(load => { 
                    if(!load){
                        return Promise.reject(`No record found for Load#: ${loadId}`)
                    }
                }))
        ]
    default:
        return []
    }
}