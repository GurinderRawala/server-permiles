const bcrypt = require('bcrypt');

module.exports.createHashPassword = (password) =>{
    const hashedPassword = createHash.bind(null, password)
    return hashedPassword
}

async function createHash(password, callback){
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt)
    callback(null, pass)
}