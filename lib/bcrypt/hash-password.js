const bcrypt = require('bcrypt');

module.exports = async ( log, password, callback ) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        log.info(hashedPassword, "Password has been hashed")
        return callback(null, hashedPassword)
    }catch(err){
        log.error(err, 'Hashing password failed')
        return callback(err)
    }
}