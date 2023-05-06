module.exports = require('rc')('permiles',{
    authentication: {
        enabled: true
    },
    log: {
        name: 'permiles.api',
        level: 'info'
    },
    port: 8081,
    postgres: {
        host: process.env.PG_HOST || 'localhost',
        database: process.env.PG_DATABASE,
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
    },
    privateKey: process.env.PRIVATE_KEY,
    sequelize : {
        dialect: 'postgres',
        logging : false
    },
    mailer: {
        name: process.env.MAILER_NAME,
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SENDER_EMAIL, // generated ethereal user
            pass: process.env.SENDER_EMAIL_PASS, // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        },
        from : {
            name: process.env.FROM_NAME,
            address: process.env.FROM_ADDRESS
        }
    },
    awsBucket: process.env.AWS_BUCKET_NAME,
    uuidRegex: /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
})