const { check } = require('express-validator')
exports.validateEmail = ( Repo ) =>{
    const validationEmail = 
        check('email', 'Enter a valid Email').trim().isEmail().normalizeEmail()
            .custom(value =>{
                return Repo
                    .findAll( { where: {email: value} } )
                    .then(user => {
                        if(user.length > 0){
                            return Promise.reject(`Provided Email already exits`)
                        }
                    })
            })
    return validationEmail
}