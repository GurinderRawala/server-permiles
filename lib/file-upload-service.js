const { S3 } = require('aws-sdk')
const uuid = require('uuid').v4
async function s3Uploadv2( bucket, log, files, path ){
    const s3 = new S3()
    const params = files.map(file => {
        return{
            Bucket: bucket,
            Key: `${path}/${uuid()}-${file.originalname}`, 
            Body: file.buffer
        }
    })
    const results = await Promise.all(params.map( param => s3.upload(param).promise() ))
    log.info({results}, 'aws file upload response')
    return results
}

exports.fileUploadService = (bucket, log) => s3Uploadv2.bind(null, bucket, log)