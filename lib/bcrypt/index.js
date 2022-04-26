module.exports = (log) => {
    return{
        ...require('./hash-password').bind( null,log ),
        ...require('./verify-password').bind( null,log )
    }
}