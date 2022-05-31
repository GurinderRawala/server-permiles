module.exports = {
    manager: {
        can: [ 
            'driver:invite',
            'driver:update',
            'driver:get-driver',
            'user-account:create',
            'user-account:update',
            'user-account:activate',
            'client:retreive',
            'client:invite-user'
        ]
    },
    admin: {
        inherits: ['manager'],
        can: []
    },
    superadmin: {
        can: ['client:create',
            'client:update'
        ],
        inherits: ['admin']
    },
}