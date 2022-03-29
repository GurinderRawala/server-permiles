const express = require('express');
const { hashPassword } = require('../../lib/encrypt');
const { createAddUserAccount, createEditUserAccount } = require('../../user-account');
const router = express.Router()

exports.registerRoutes = (server, modules) =>{
    router.post('/user-accounts/create-user-account',(req, res, next) => {
        const addUserAccount = createAddUserAccount(modules)
        const { createHashPassword } = modules
        const hashPassword = createHashPassword(req.body.password)
        hashPassword((err, password) =>{
            if(err){return next(err)}
            req.body.password = password
            addUserAccount(req.body, (err) => {
                if (err) { return next(err) }
                  res.sendStatus(201)
                next()
            })
        })
    })
    router.post('/user-accounts/edit-user-account', (req, res, next) =>{
        const editUserAccount = createEditUserAccount(modules)
        editUserAccount(req.body, (err, resp) =>{
            if(err) return next(err)
            res.sendStatus(201)
            next()
        })
    })
    server.use(router)
}