const bcrypt = require('bcrypt');

module.exports.hashPassword = async(password) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt)
    return pass?pass: null;
    }catch(err){
        console.log(err)
    }
}