const { Client } = require('pg')
//TODO: Add log

exports.getConnection = async (config) => {
    try {
    const dbClient = new Client(config)
    await dbClient.connect()
    return dbClient
    }
    catch (ex){
        console.log(ex)
    }
}