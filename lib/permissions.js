module.exports = {
    manager: {
        can: [ 
            'driver:add',
            'user-account:create',
            'user-account:edit'
        ]
    },
    admin: {
        can: ['rule the server'],
        inherits: ['manager']
    }
}