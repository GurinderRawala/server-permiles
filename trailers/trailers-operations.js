const { Trailer } = require("./trailer")
const { Op } = require("sequelize")
async function addTrailer(trailerRepo, log, trailer, callback){
    try{
        const res = await trailerRepo.create(trailer)
        log.info({res}, 'Trailer has been added')
        return callback(null, {msg: `Trailer has been added`})
    }catch(err){
        log.error({err}, 'Error adding trailer')
        return callback(err)
    }
}
async function createTrailer(trailerRepo, log, uploadService, trailer, files, callback){
    const truckPayload = await Trailer.uploadTrailerFiles(trailer, files, { uploadService })
    await addTrailer(trailerRepo, log, truckPayload, (err, res) =>{
        if(err){ return callback(err)}
        return callback(null, res)
    })
}
async function updateTrailer(trailerRepo, log, trailer, callback){
    try{
        const res = await trailerRepo.update(trailer, { where:{ id: trailer.id } })
        return res[0] === 1 ? callback(null, {msg: `Trailer has been updated`})
            :callback({msg: `Error Updating trailer`})
    }catch(err){
        log.error({err}, 'Error updating trailer')
        return callback(err)
    }
}
async function getTrailerById (trailerRepo, log, trailer, callback){
    try{
        const res = await trailerRepo.findByPk(trailer.id)
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding trailer')
        return callback(err)
    }
}
async function getTrailerList (trailerRepo, log, { clientid }, callback) {
    try{
        const res = await trailerRepo.findAll({ where:{ clientid } })
        if(res.length === 0){
            return callback({msg: 'No Trailer Found'})
        }
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding Trips')
        return callback(err)
    }
}
async function getTrailerByTrailerNumber(trailerRepo, log, trailer, callback){
    try{
        const res = await trailerRepo.findAll({
            where:{
                [Op.and]:[
                    { clientid: trailer.clientid },
                    { trailerNo: trailer.trailerNo }
                ]
            }
        })
        if(res.length === 0){
            return callback({msg: `No trailer found by trailer#: ${trailer.trailerNo}`})
        }
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding Trailer by trailer#')
        return callback(err)
    }
}
module.exports = {
    createAddTrailer: ({trailerRepo, log, uploadService}) => createTrailer.bind(null, trailerRepo, log, uploadService),
    createUpdateTrailer: ({ trailerRepo, log }) => updateTrailer.bind(null, trailerRepo, log),
    createGetTrailerById: ({ trailerRepo, log }) => getTrailerById.bind(null, trailerRepo, log),
    createGetTrailerList: ({ trailerRepo, log }) => getTrailerList.bind(null, trailerRepo, log),
    createGetTrailerByTrailerNumber: ({ trailerRepo, log }) => getTrailerByTrailerNumber.bind(null, trailerRepo, log),
}