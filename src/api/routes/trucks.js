const express = require('express')
const router = express.Router()
const {
  createAddTruck,
  createUpdateTruck,
  createGetTruckById,
  createGetTruckList,
  createGetTruckByTruckNumber,
} = require('../../trucks')
exports.registerRoutes = (server, modules) => {
  const {
    authenticationMiddleware: { determineUserRole, permissions },
    sessionHandler,
    validation: { truckRoutesValidation, validationErrorMessage },
    uploadMiddleware,
  } = modules
  const permissionsAddTruck = permissions('truck:add-truck')
  const validateAddTruck = truckRoutesValidation('truck:add-truck')
  router.post(
    '/trucks/add-truck',
    [
      uploadMiddleware,
      sessionHandler,
      determineUserRole,
      permissionsAddTruck,
      validateAddTruck,
    ],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const addTruck = createAddTruck(modules)
      addTruck(req.body, req.files, (err, response) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(response)
        next()
      })
    }
  )
  const permissionsUpdateTruck = permissions('truck:update-truck')
  const validateUpdateTruck = truckRoutesValidation('truck:update-truck')
  router.post(
    '/trucks/update-truck',
    [
      sessionHandler,
      determineUserRole,
      permissionsUpdateTruck,
      validateUpdateTruck,
    ],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const updateTruck = createUpdateTruck(modules)
      updateTruck(req.body, (err, msg) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(msg)
        next()
      })
    }
  )
  const permissionsGetTruck = permissions('truck:get-truck')
  router.get(
    '/trucks/:id',
    [
      sessionHandler,
      determineUserRole,
      permissionsGetTruck,
      validateUpdateTruck,
    ],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const getTruckById = createGetTruckById(modules)
      getTruckById(req.params, (err, truck) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(truck)
        next()
      })
    }
  )
  router.post(
    '/trucks/truck-list',
    [sessionHandler, determineUserRole, permissionsGetTruck],
    (req, res, next) => {
      const getTruckList = createGetTruckList(modules)
      getTruckList(req.body, (err, truck) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(truck)
        next()
      })
    }
  )
  const validateGetTruckByTruckNumber = truckRoutesValidation(
    'truck:by-truck-number'
  )
  router.post(
    '/trucks/by-truck-number',
    [
      sessionHandler,
      determineUserRole,
      permissionsGetTruck,
      validateGetTruckByTruckNumber,
    ],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const getTruckByNumber = createGetTruckByTruckNumber(modules)
      getTruckByNumber(req.body, (err, truck) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(truck)
        next()
      })
    }
  )
  server.use('/api', router)
}
