module.exports = {
    manager: {
        can: [ 
            'driver:create',
            'driver:update',
            'user-account:create',
            'user-account:update',
            'client:retreive'
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