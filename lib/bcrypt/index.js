module.exports = (log) => {
    return{
        hashPassword: require('./hash-password.js').bind( null,log ),
        verifyPassword: require('./verify-password').bind( null,log )
    }
}