const { REPOS } = require('../../../../consts')
const { validateClient } = require('../validate-client')

exports.fileRoutesValidation = ({ check, param }, clientRepo, route) => {
  const fileUploadChain = [
    check('files').custom((_, { req }) => {
      if (!req.files?.length) throw new Error('No files to upload')
      return true
    }),
    validateClient(clientRepo),
    param('uuid', 'Missing unique identifier').trim().notEmpty().isUUID(),
    param('repo', 'Missing repo or invalid repo')
      .trim()
      .notEmpty()
      .custom((value) => {
        if (!REPOS.includes(value)) throw new Error('Invalid repo')
        return true
      }),
    check('fieldToUpdate', 'Missing field to update').trim().notEmpty(),
  ]

  switch (route) {
    case 'file:upload-file':
      return fileUploadChain
    case 'file:get-file':
      return [
        validateClient(clientRepo),
        check('filePath', 'Missing file path key').trim().notEmpty(),
      ]
    case 'file:delete-file':
      return [
        ...fileUploadChain.slice(-1),
        check('filePath', 'Missing file path key').trim().notEmpty(),
      ]
    default:
      return []
  }
}
