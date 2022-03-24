module.exports.findDriver = ({driverRepo, log}) =>{
    const find = dispatchFind.bind(null, driverRepo, log)
    return find
}

const dispatchFind = async(driverRepo, log, query, callback) =>{
    log.info({query}, 'Find driver')
    const res = await driverRepo.findAll({where: query})
    callback(null, res)
}