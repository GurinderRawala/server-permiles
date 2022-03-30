module.exports = {
    manager: {
        can: [ 
            'driver:add',
            'driver:edit',
            'user-account:create',
            'user-account:edit'
        ]
    },
    admin: {
        can: ['rule the server', 'super-user:create', 'super-user:edit'],
        inherits: ['manager']
    }
}