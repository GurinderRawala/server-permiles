const { S3 } = require('aws-sdk')
const uuid = require('uuid').v4

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

async function s3Uploadv2(bucket, log, files, path, callback) {
  const params = files.map((file) => {
    return {
      Bucket: bucket,
      Key: `${path}/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    }
  })
  try {
    const results = await Promise.all(
      params.map((param) => s3.upload(param).promise())
    )
    log.info({ results }, 'aws file upload successfull')
    return callback(null, results)
  } catch (err) {
    log.error({ err }, 'aws file upload failed')
    return callback(err)
  }
}

async function s3GetListOfObjects(bucket, log, prefix, callback) {
  const params = {
    Bucket: bucket,
    Delimiter: '/',
    Prefix: prefix,
  }
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      log.error({ err }, 's3 list objects failed')
      return callback(err)
    }

    callback(null, data)
  })
}

async function s3GetObject(bucket, log, pathToFile, callback) {
  try {
    const params = {
      Bucket: bucket,
      Key: pathToFile,
    }
    await s3.headObject(params).promise()
    const stream = s3.getObject(params).createReadStream()
    log.info('s3 get object successfull')
    return callback(null, stream)
  } catch (err) {
    log.error({ err }, 's3 get object failed')
    return callback(err)
  }
}

async function s3DeleteObject(bucket, log, pathToFile, callback) {
  try {
    const params = {
      Bucket: bucket,
      Key: pathToFile,
    }
    await s3.headObject(params).promise()
    s3.deleteObject(params, (err, data) => {
      if (err) {
        return callback(err)
      }
      log.info('s3 deleted object successful')
      return callback(null, data)
    })
  } catch (err) {
    log.error({ err }, 's3 delete object failed')
    return callback(err)
  }
}
module.exports = {
  fileUploadService: (bucket, log) => s3Uploadv2.bind(null, bucket, log),
  getFileListService: (bucket, log) =>
    s3GetListOfObjects.bind(null, bucket, log),
  getFileObjectService: (bucket, log) => s3GetObject.bind(null, bucket, log),
  deleteFileObjectService: (bucket, log) =>
    s3DeleteObject.bind(null, bucket, log),
}
