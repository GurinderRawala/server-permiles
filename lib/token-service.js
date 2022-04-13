const jwt = require('jsonwebtoken');

const createTokenService = (privateKey) => {
    const createToken = create.bind(null, privateKey)
    const verifyToken = verify.bind(null, privateKey )
    return {
        create : (payload, options)=> createToken(payload, options),
        verify : (payload, options) => verifyToken(payload, options)
    }
}

const create = (privateKey, payload, options) => {
    return jwt.sign(payload,privateKey, options)
}

const verify = (privateKey, payload, options) => {
    return jwt.verify(payload,privateKey, options)
}

module.exports = {
    createTokenService
}
