const { S3 } = require('aws-sdk')
const uuid = require('uuid').v4
async function s3Uploadv2( bucket, log, files, path, callback ){
    const s3 = new S3()
    const params = files.map(file => {
        return{
            Bucket: bucket,
            Key: `${path}/${uuid()}-${file.originalname}`, 
            Body: file.buffer
        }
    })
    try{
        const results = await Promise.all(params.map( param => s3.upload(param).promise() ))
        log.info({results}, 'aws file upload successfull')
        return callback(null, results)
    }catch(err){
        log.error({err}, 'aws file upload failed')
        return callback(err)
    }
}

async function s3GetListOfObjects( bucket, log, prefix ){
    const s3 = new S3()
    const params = {
        Bucket: bucket,
        Delimiter: '/',
        Prefix: prefix
    }
    const objects = s3.listObjectsV2(params, (err, data) =>{
        if(err){ throw err }
        log.info(data)
        return data;
    })
    log.info({objects}, 'aws get file response')
    return objects
}
module.exports = {
    fileUploadService: (bucket, log) => s3Uploadv2.bind(null, bucket, log),
    getFileListService: (bucket, log) => s3GetListOfObjects.bind(null, bucket, log)
}
