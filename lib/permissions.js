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
        can: ['rule the server'],
        inherits: ['manager']
    },
    superadmin: {
        can: ['client:create', 'client-edit'],
        inherits: ['admin']
    },
}