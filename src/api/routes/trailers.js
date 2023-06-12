const express = require('express')
const router = express.Router()
const {
  createAddTrailer,
  createUpdateTrailer,
  createGetTrailerById,
  createGetTrailerList,
  createGetTrailerByTrailerNumber,
} = require('../../trailers')
exports.registerRoutes = (server, modules) => {
  const {
    authenticationMiddleware: { determineUserRole, permissions },
    sessionHandler,
    validation: { trailerRoutesValidation, validationErrorMessage },
    uploadMiddleware,
  } = modules
  const permissionsAddTrailer = permissions('trailer:add-trailer')
  const validateAddTrailer = trailerRoutesValidation('trailer:add-trailer')
  router.post(
    '/trailers/add-trailer',
    [
      uploadMiddleware,
      sessionHandler,
      determineUserRole,
      permissionsAddTrailer,
      validateAddTrailer,
    ],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const addTrailer = createAddTrailer(modules)
      addTrailer(req.body, req.files, (err, response) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(response)
        next()
      })
    }
  )
  const permissionsUpdateTrailer = permissions('trailer:update-trailer')
  const validateUpdateTrailer = trailerRoutesValidation(
    'trailer:update-trailer'
  )
  router.post(
    '/trailers/update-trailer',
    [
      sessionHandler,
      determineUserRole,
      permissionsUpdateTrailer,
      validateUpdateTrailer,
    ],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const updateTrailer = createUpdateTrailer(modules)
      updateTrailer(req.body, (err, msg) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(msg)
        next()
      })
    }
  )
  const permissionsGetTrailer = permissions('trailer:get-trailer')
  router.get(
    '/trailers/:id',
    [
      sessionHandler,
      determineUserRole,
      permissionsGetTrailer,
      validateUpdateTrailer,
    ],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const getTrailerById = createGetTrailerById(modules)
      getTrailerById(req.params, (err, trailer) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(trailer)
        next()
      })
    }
  )
  router.post(
    '/trailers/trailer-list',
    [sessionHandler, determineUserRole, permissionsGetTrailer],
    (req, res, next) => {
      const getTrailerList = createGetTrailerList(modules)
      getTrailerList(req.body, (err, trailer) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(trailer)
        next()
      })
    }
  )
  const validateGetTrailerByTrailerNumber = trailerRoutesValidation(
    'trailer:by-trailer-number'
  )
  router.post(
    '/trailers/by-trailer-number',
    [
      sessionHandler,
      determineUserRole,
      permissionsGetTrailer,
      validateGetTrailerByTrailerNumber,
    ],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const getTrailerByTrailerNumber = createGetTrailerByTrailerNumber(modules)
      getTrailerByTrailerNumber(req.body, (err, trailer) => {
        if (err) {
          return next(err)
        }
        res.status(201).send(trailer)
        next()
      })
    }
  )
  server.use('/api', router)
}
