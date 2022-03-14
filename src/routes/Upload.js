const express = require('express')
const UploadFile = require('../FileSystem/UploadFile')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
 
/*
 Send Request using formData along with path to store file
 */

router.post('/upload', requireAuth, (req, res) =>{

    UploadFile(req, res)
    
})

module.exports = router