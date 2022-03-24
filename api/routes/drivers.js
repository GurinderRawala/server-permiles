const express = require('express');
const router = express.Router()
const { createAddDriver } = require('../../driver')

exports.registerRoutes = (server, config) => {
    router.post('/drivers/add-driver', (req, res, next) => {
      const addDriver = createAddDriver({ connection: config.postgres.connection })
      //Todo: translate req.body to Driver object
      addDriver(req.body, (err) => {
        if (err) { return next(err) }
          res.sendStatus(201)
        next()
      })
  })
  server.use(router)
}