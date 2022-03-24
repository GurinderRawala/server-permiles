module.exports.updateDriver =  ({ driverRepo, log }) => { 
  const update = dispatchUpdate.bind(null, driverRepo, log)
  return update
}

const dispatchUpdate = async (driverRepo, log, query, callback) =>{

log.info({query}, 'updating driver')
     const res = await driverRepo.update(
         {[query.updateField]: query.update},
         {where: {[query.findField]: query.find}}
     )

    callback(null, res)

}