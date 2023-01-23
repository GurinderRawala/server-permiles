module.exports = {
    graphql:{
        can: [
            'userAccount:graphql'
        ]
    },
    manager: {
        can: [ 
            'driver:invite',
            'driver:update',
            'driver:get-driver',

            'user-account:create',
            'user-account:update',
            'user-account:activate',

            'client:retreive',
            'client:invite-user',
            
            'broker:add-broker',
            'broker:update-broker',
            'broker:broker-list',

            'loads:add-load',
            'loads:update-load',
            'loads:get-load',
            'loads:load-list',
            'loads:by-loadId',

            'trip:add-trip',
            'trip:update-trip',
            'trip:get-trip',

            'truck:add-truck',
            'truck:update-truck',
            'truck:get-truck',

            'trailer:add-trailer',
            'trailer:update-trailer',
            'trailer:get-trailer',

            'file:upload-file',
            'file:get-file',
            'file:delete-file'
        ],
        inherits: ['graphql'],
    },
    admin: {
        inherits: ['manager'],
        can: []
    },
    superAdmin: {
        can: [
            'client:create',
            'client:update',
            'client:get-client',
            'client:delete',
        ],
        inherits: ['admin']
    },
}