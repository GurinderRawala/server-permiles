const bcrypt = require('bcrypt');
module.exports = async ( log, password, hash, callback ) =>{
    try{
        const verify = await bcrypt.compare(password, hash)
        log.info(verify, "verify results")
        return callback(null, verify)
    }catch(err){
        log.error(err, "Error verifing password")
        return callback(err)
    }
}