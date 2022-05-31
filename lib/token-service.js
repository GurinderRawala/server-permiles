const jwt = require('jsonwebtoken');

const createTokenService = (privateKey) => {
    const createToken = create.bind(null, privateKey)
    const verifyToken = verify.bind(null, privateKey )
    return {
        create : (payload, options)=> createToken(payload, options),
        verify : (payload, callback) => verifyToken(payload, callback)
    }
}

const create = (privateKey, payload, options) => {
    return jwt.sign(payload,privateKey, options)
}

const verify = (privateKey, payload, options) => {
    try {
        const token = jwt.verify(payload, privateKey, options)
        return token
    }
    catch (ex) {
        const error = new Error("Invalid Token")
        error.inner =ex
        return { error }
    }
}

module.exports = {
    createTokenService
}
