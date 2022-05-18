const { check } = require('express-validator')
exports.clientRoutesValidation = (userAccountRepo, route) =>{
    switch(route){
    case 'invite-user':
        return[
            check('id', 'Invalid UUID').isUUID(),
            check('firstname', 'First Name is Required').not().isEmpty(),
            check('lastname', 'Last Name is Required').not().isEmpty(),
            check('username', 'Username is Required').not().isEmpty().isLength({ min: 4 }),
            check('email', 'Enter a valid Email').isEmail().normalizeEmail(),
            check('password', 'Enter a valid Password').not().isEmpty().isLength({ min: 6 }),
            check('company', 'Company Name is Required').not().isEmpty(),
            check('role', 'User Role is Required').not().isEmpty(),
            check('active', 'Active status is Required').isBoolean(),
            check('awaitingSignup', 'Await signup is Required').isBoolean(),
            check('clientid', 'Invalid Client Id').isUUID(),
            check('email')
                .custom(value =>{
                    if( value ){
                        return userAccountRepo
                            .findAll( { where: {email: value} } )
                            .then(user => {
                                console.log(user)
                                if(user.length > 0){
                                    return Promise.reject(`${value} is already registered`)
                                }
                            })
                    }
                    return false
                })
        ]
    default:
        return
    }
}