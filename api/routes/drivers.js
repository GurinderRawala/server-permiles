const express = require('express');
const router = express.Router()
const { createAddDriver, updateDriver, findDriver } = require('../../driver')

exports.registerRoutes = (server, modules) => {
    router.post('/drivers/add-driver', (req, res, next) => {
      const addDriver = createAddDriver(modules)
      //Todo: translate req.body to Driver object
      addDriver(req.body, (err) => {
        if (err) { return next(err) }
          res.sendStatus(201)
        next()
      })
  })

  router.post('/drivers/update-driver', (req, res, next) =>{
     
      const updateD = updateDriver(modules)
      updateD(req.body, (err, response) => { 
      if (err) { return next(err) }
    
       response
       ? res.status(201).send({msg: 'Information has been Updated'})
       : res.status(422).send({error: 'Error Updating record'})
      
      next()
      })
  })

  router.get('/drivers/find-driver', (req, res, next) =>{
     const find = findDriver(modules)
     
     find(req.body, (err, response) =>{
       if(err) return next(err)
       res.status(200).send(response)
     })
  })
  server.use(router)
}