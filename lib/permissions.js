module.exports = {
    manager: {
        can: [ 
            'driver:add',
            'driver:edit'
        ]
    },
    admin: {
        can: ['rule the server'],
        inherits: ['manager']
    }
}