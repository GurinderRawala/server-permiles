module.exports = {
    manager: {
        can: [ 
            'driver:add'
        ]
    },
    admin: {
        can: ['rule the server'],
        inherits: ['manager']
    }
}