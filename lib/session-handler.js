const session = require("express-session")
let RedisStore = require("connect-redis")(session)


module.exports.createGetSessionHandler = async (log , privateKey) => {
    log.info('connecting to redis...')

    const { createClient } = require("redis")
    let client = createClient({ legacyMode: true })

    await client.connect().catch((err) => {
        log.error(err, 'error connecting to redis')
    })

    log.info('connection to redis has been established successfully')
  
    const store = new RedisStore({ client })

    return session({
        store,
        secret: privateKey,
        saveUninitialized: false,
        resave: false,
    })
}