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
        host: 'localhost',
        database: 'permiles',
        username: 'postgres',
        password: 'NInAN5t3kJo8d7I3',
    },
    privateKey: '1DCLDToVBohPgizzbqqLCZbs3Sk9Ww2yK5',
    sequelize : {
        dialect: 'postgres',
        logging : false
    },
    mailer: {
        name: "permiles.com",
        host: "mail.permiles.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'no-reply@permiles.com', // generated ethereal user
            pass: 'Rawala39!!', // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        },
        from : '"Per Miles" <no-reply@permiles.com>'
    }
})