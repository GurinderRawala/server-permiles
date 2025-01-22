const express = require('express')
const { get } = require('lodash')
const router = express.Router()
exports.registerRoutes = (server, modules) => {
  const {
    authenticationMiddleware: { determineUserRole, permissions },
    sessionHandler,
    validation,
    uploadMiddleware,
    uploadService,
    log,
  } = modules
  const fileUploadPermissions = permissions('file:upload-file')
  const { fileRoutesValidation, validationErrorMessage } = validation
  const uploadFileRouteValidation = fileRoutesValidation('file:upload-file')

  router.post(
    '/upload-file/:uuid/:repo',
    [
      uploadMiddleware,
      sessionHandler,
      determineUserRole,
      fileUploadPermissions,
      uploadFileRouteValidation,
    ],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const { fieldToUpdate, clientid } = req.body
      const { uuid, repo } = req.params
      const path = [clientid, repo.replace('Repo', '')].join('/')

      uploadService(req.files, path, async (err, data) => {
        if (err) return next({ msg: err })
        if (!data) return next({ msg: 'File upload failed, please try again.' })
        const currentRecord = await get(modules, repo).findByPk(uuid)
        const inRecordFiles =
          currentRecord[fieldToUpdate]?.map((v) => JSON.parse(v)) || []

        try {
          await get(modules, repo).update(
            { [fieldToUpdate]: [...inRecordFiles, ...data] },
            { where: { id: uuid } }
          )
          log.info("file info uploaded successfully.", { fieldToUpdate, uuid })
          return res
            .status(201)
            .send({ fileUploadResponse: [...inRecordFiles, ...data] })
        } catch (err) {
          log.error({ err })
          return next(err)
        }
      })
    }
  )

  const getFilePermission = permissions('file:get-file')
  const getFileValidation = fileRoutesValidation('file:get-file')
  router.post(
    '/get-file',
    [sessionHandler, determineUserRole, getFilePermission, getFileValidation],
    (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const { getFileService } = modules
      const { filePath } = req.body
      getFileService(filePath, (err, data) => {
        if (err) return next({ msg: err })
        res.attachment(filePath)
        data.pipe(res)
      })
    }
  )

  const deleteFilePermission = permissions('file:delete-file')
  const deleteFileValidation = fileRoutesValidation('file:delete-file')
  router.post(
    '/delete-file/:uuid/:repo',
    [
      sessionHandler,
      determineUserRole,
      deleteFilePermission,
      deleteFileValidation,
    ],
    async (req, res, next) => {
      if (validationErrorMessage(req, res, next)) return
      const { deleteFileService } = modules
      const { filePath, fieldToUpdate } = req.body
      const { uuid, repo } = req.params
      const model = get(modules, repo)

      deleteFileService(filePath, async (err, data) => {
        if (err) return next({ msg: err })
        try {
          const dbData = await model.findByPk(uuid)
          if (!dbData) {
            return next({
              msg: 'File is deleted from cloud, but no changes made in DB',
              deletedFileData: data,
            })
          }

          const removeFilePath = dbData[fieldToUpdate]?.filter(
            (fileInfo) => JSON.parse(fileInfo).key !== filePath
          )
          log.info({ removeFilePath }, 'filePath removed, new payload.')
          try {
            await model.update(
              { [fieldToUpdate]: removeFilePath },
              { where: { id: uuid } }
            )
            return res
              .status(201)
              .send({
                msg: 'File is deleted from cloud, changes made in DB',
                deletedFileData: data,
              })
          } catch (err) {
            log.error({ err }, 'error updating field, something went wrong')
            return next({ msg: err })
          }
        } catch {
          log.error(
            { err },
            'error updating finding data, something went wrong'
          )
          return next({ msg: err })
        }
      })
    }
  )

  server.use('/api', router)
}
