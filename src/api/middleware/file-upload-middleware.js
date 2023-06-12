const multer = require('multer')
const path = require('path')
const allowedExts = ['.pdf', '.jpeg', '.jpg', '.docx', '.doc', '.svg', '.png']
const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname)
  if (!allowedExts.includes(ext)) {
    return callback({ msg: `${ext} is not allowed` }, false)
  }
  callback(null, true)
}
exports.fileUploadMiddleware = () => {
  const storage = multer.memoryStorage()
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 209715200,
    },
  }).array('files', 5)
  return upload
}
