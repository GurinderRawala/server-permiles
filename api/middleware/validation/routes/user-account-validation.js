exports.userAccountValidation = ({ check }, userAccountRepo, route) =>{
    switch(route){
    case 'user-account:update':
        return[
            validateUserAccountPk(check, userAccountRepo)
        ]
    case 'user-account:activate':
        return[
            validateUserAccountPk(check, userAccountRepo),
            check('password', 'Password must have more then 5 characters')
                .trim().notEmpty().isLength({min: 6}),
            check('confirmPassword', 'Repeat password does not match password')
                .exists()
                .custom((value, { req }) => value === req.body.password)
        ]
    case 'user-account:signin':
        return[
            checkEmailforSignin(check, userAccountRepo),
            check('password', 'Must provide a valid password to login')
                .trim().notEmpty()
        ]
    default:
        return []
    }
}
const validateUserAccountPk = (check, userAccountRepo) =>{
    const validation =  check('id', 'Invalid user id').trim().isUUID()
        .custom(value => userAccountRepo
            .findByPk(value)
            .then(user => {
                if(!user){
                    return Promise.reject(`User not found`)
                }
            }))
    return validation
}
const checkEmailforSignin = (check, userAccountRepo) =>{
    const validation = check('email', 'Invalid email address')
        .trim().isEmail().normalizeEmail()
        .custom(value => userAccountRepo
            .findOne({ where: { email: value } })
            .then(user => {
                if(!user){
                    return Promise.reject(`${value} email does not exits`)
                }
            })
        )
    return validation
}