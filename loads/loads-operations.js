const { Load } = require("./loads")
const { Op } = require('sequelize')
async function addLoad (loadRepo, log, load, callback){
    try{
        const res = await loadRepo.create(load)
        log.info({res}, 'Load has been added')
        return callback(null, {msg: `Load has been added`})
    }catch(err){
        log.error({err}, 'Error adding load')
        return callback(err)
    }
}
async function createLoad(loadRepo, log, uploadService, load, files, callback){
    const loadData = await Load.createAddLoad(load, files, { uploadService })
    await addLoad(loadRepo, log, loadData, (err, msg) => {
        if(err){ return callback(err)}
        callback(msg)
    })

}
async function getLoadList (loadRepo, log, { clientid }, callback) {
    try{
        const res = await loadRepo.findAll({ where:{ clientid } })
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding load')
        return callback(err)
    }
}
async function updateLoad (loadRepo, log, load, callback){
    try{
        const res = await loadRepo.update(load, { where:{ id: load.id } })
        return res[0] === 1 ? callback(null, {msg: `Load has been updated`})
            :callback({msg: `Error Updating load`})
    }catch(err){
        log.error({err}, 'Error updating load')
        return callback(err)
    }
}
async function getLoadById (loadRepo, log, load, callback){
    try{
        const res = await loadRepo.findByPk(load.id)
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding load')
        return callback(err)
    }
}
async function getLoadByLoadNumber(loadRepo, log, load, callback){
    try{
        const res = await loadRepo.findOne({
            where:{
                loadId: load.loadId,
                [Op.and]:{
                    clientid: load.clientid
                }
            }
        })
        if(res.length === 0){
            return callback({msg: `No load found by load#: ${load.loadId}`})
        }
        return callback(null, res)
    }catch(err){
        log.error({err}, 'Error finding Trip by load#')
        return callback(err)
    }
}
module.exports = {
    createAddLoad: ({loadRepo, log, uploadService}) => createLoad.bind(null, loadRepo, log, uploadService),
    createGetLoadList: ({loadRepo, log}) => getLoadList.bind(null, loadRepo, log),
    createUpdateLoad: ({loadRepo, log}) => updateLoad.bind(null, loadRepo, log),
    createGetLoadById: ({ loadRepo, log }) => getLoadById.bind(null, loadRepo, log),
    createGetLoadByLoadNumber: ({ loadRepo, log }) => getLoadByLoadNumber.bind(null, loadRepo, log)
}