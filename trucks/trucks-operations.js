const { Truck } = require("./truck")
const { Op } = require("sequelize")
async function addTruck(truckRepo, log, truck, callback){
    try{
        const res = await truckRepo.create(truck)
        log.info({res}, 'Truck has been added')
        return callback(null, {msg: `Truck has been added`})
    }catch(err){
        log.error({err}, 'Error adding truck')
        return callback(err)
    }
}
async function createTruck(truckRepo, log, uploadService, truck, files, callback){
    const truckPayload = await Truck.uploadTruckFiles(truck, files, { uploadService })
    await addTruck(truckRepo, log, truckPayload, (err, res) =>{
        if(err){ return callback(err)}
        return callback(null, res)
    })
}
async function updateTruck(truckRepo, log, truck, callback){
    try{
        const res = await truckRepo.update(truck, { where:{ id: truck.id } })
        return res[0] === 1 ? callback(null, {msg: `Truck has been updated`})
            :callback({msg: `Error Updating truck`})
    }catch(err){
        log.error({err}, 'Error updating truck')
        return callback(err)
    }
}
async function getTruckById (truckRepo, log, truck, callback){
    try{
        const res = await truckRepo.findByPk(truck.id)
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding truck')
        return callback(err)
    }
}
async function getTruckList (truckRepo, log, { clientid }, callback) {
    try{
        const res = await truckRepo.findAll({ where:{ clientid } })
        if(res.length === 0){
            return callback({msg: 'No Truck Found'})
        }
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding Trips')
        return callback(err)
    }
}
async function getTruckByTruckNumber(truckRepo, log, truck, callback){
    try{
        const res = await truckRepo.findAll({
            where:{
                truckNo: truck.truckNo,
                [Op.and]:{
                    clientid: truck.clientid
                }
            }
        })
        if(res.length === 0){
            return callback({msg: `No truck found by truck#: ${truck.truckNo}`})
        }
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding Truck by truck#')
        return callback(err)
    }
}
module.exports = {
    createAddTruck: ({truckRepo, log, uploadService}) => createTruck.bind(null, truckRepo, log, uploadService),
    createUpdateTruck: ({ truckRepo, log }) => updateTruck.bind(null, truckRepo, log),
    createGetTruckById: ({ truckRepo, log }) => getTruckById.bind(null, truckRepo, log),
    createGetTruckList: ({ truckRepo, log }) => getTruckList.bind(null, truckRepo, log),
    createGetTruckByTruckNumber: ({ truckRepo, log }) => getTruckByTruckNumber.bind(null, truckRepo, log),
}