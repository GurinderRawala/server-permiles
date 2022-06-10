const { Op } = require('sequelize')
const { Trip } = require('./trip')
async function addTrip(tripRepo, log, trip, callback){
    try{
        const res = await tripRepo.create(trip)
        log.info({res}, 'Trip has been added')
        return callback(null, {msg: `Trip has been added`})
    }catch(err){
        log.error({err}, 'Error adding trip')
        return callback(err)
    }
}
async function getTripList (tripRepo, log, { clientid }, callback) {
    try{
        const res = await tripRepo.findAll({ where:{ clientid } })
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding Trips')
        return callback(err)
    }
}
async function getTripById (tripRepo, log, trip, callback){
    try{
        const res = await tripRepo.findByPk(trip.id)
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding trip')
        return callback(err)
    }
}
async function getTripByTripNumber(tripRepo, log, trip, callback){
    try{
        const res = await tripRepo.findOne({
            where:{
                tripId: trip.tripId,
                [Op.and]:{
                    clientid: trip.clientid
                }
            }
        })
        if(!res){
            return callback({msg: `No trip found by trip#: ${trip.tripId}`})
        }
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding Trip by trip#')
        return callback(err)
    }
}
async function updateTrip(tripRepo, log, trip, callback){
    try{
        const res = await tripRepo.update(trip, { where:{ id: trip.id } })
        return res[0] === 1 ? callback(null, {msg: `Load has been updated`})
            :callback({msg: `Error Updating trip`})
    }catch(err){
        log.error({err}, 'Error updating trip')
        return callback(err)
    }
}
async function createTrip(tripRepo, log, uploadService, trip, files, callback){
    const tripData = new Trip(trip)
    const bol = await tripData.uploadTripFiles(files, { uploadService })
    const payload = {
        ...trip,
        bol
    }
    await addTrip(tripRepo, log, payload, (err, msg) => {
        if(err){ return callback(err)}
        return callback(null, msg)
    })

}
module.exports = {
    createAddTrip: ({ tripRepo, log, uploadService }) => createTrip.bind(null, tripRepo, log, uploadService),
    createGetTripList: ({ tripRepo, log }) => getTripList.bind(null, tripRepo, log),
    createGetTripById: ({ tripRepo, log }) => getTripById.bind(null, tripRepo, log),
    createGetTripByTripNumber: ({ tripRepo, log }) => getTripByTripNumber.bind(null, tripRepo, log),
    createUpdateTrip: ({ tripRepo, log }) => updateTrip.bind(null, tripRepo, log)
}