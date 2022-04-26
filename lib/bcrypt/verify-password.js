const bcrypt = require('bcrypt');
module.exports.verifyPassword = async ( log, password, hash, callback ) =>{
    try{
        const verify = await bcrypt.compare(password, hash)
        log.info(verify, "verify results")
        callback(null, verify)
    }catch(err){
        log.error(err, "Error verifing password")
        callback(err)
    }
}