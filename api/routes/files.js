const express = require('express')
const { get } = require('lodash')
const router = express.Router()
exports.registerRoutes = (server, modules) =>{
    const { authenticationMiddlware : { determineUserRole, permissions }, sessionHandler, validation, uploadMiddleware, uploadService, log } = modules
    const fileUploadPermissions = permissions('file:upload-file')
    const { fileRoutesValidation, validationErrorMessage } = validation
    const uploadFileRouteValidation = fileRoutesValidation('file:upload-file')

    router.post("/upload-file/:uuid/:repo",
        [uploadMiddleware, sessionHandler, determineUserRole, fileUploadPermissions, uploadFileRouteValidation],
        (req, res, next) => {
            if( validationErrorMessage(req, res, next) ) return
            const { fieldToUpdate, clientid } = req.body;
            const { uuid, repo } = req.params;
            const path = [clientid, repo.replace("Repo", "")].join("/");
            uploadService(req.files, path, async (err, data) => {
                if( err ) return next({ msg: err});
                if(!data) return next({ msg: "File upload failed, please try again." });
             
                try{
                    const updated = await get(modules, repo).update({[fieldToUpdate]: data}, {where:{ id: uuid }});
                    if(updated[0] === 0){
                        return next({ msg: "Database update failed, please try again." });
                    }
                    return res.status(201).send({fileUploadResponse: data})
                }catch(err){
                    log.error({err})
                    return next(err)
                }
            })
        })
    
    const getFilePermission = permissions('file:get-file')
    const getFileValidation = fileRoutesValidation('file:get-file')
    
    router.post("/get-file",
        [sessionHandler, determineUserRole, getFilePermission, getFileValidation],
        (req, res, next)=>{
            if( validationErrorMessage(req, res, next) ) return
            const { getFileService } = modules
            const { filePath } = req.body
            getFileService(filePath, (err, data) =>{
                if(err) return next({ msg: err })
                res.attachment(filePath)
                data.pipe(res)
            })
        })
    
    const deleteFilePermission = permissions('file:delete-file')
    const deleteFileValidation = getFileValidation;
    router.post("/delete-file", 
        [sessionHandler, determineUserRole, deleteFilePermission, deleteFileValidation],
        (req, res, next) =>{
            if( validationErrorMessage(req, res, next) ) return
            const { deleteFileService } = modules
            const { filePath } = req.body
            deleteFileService(filePath, (err, data) =>{
                if(err) return next({ msg: err })
                return res.status(200).send({msg: data})
            })
        })

    server.use(router)
}