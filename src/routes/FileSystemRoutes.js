const express = require('express');
const ScanDir = require('../FileSystem/ScanDir');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router()

router.post('/scandir', requireAuth, (req, res) =>{
    const { username } = req.user;
    const { path } = req.body;

    if(!path){
        return res.status(422).send({error: 'File path is invalid'})
    }

    const dir = `./public/${username}/${path}`
    const files = ScanDir(dir)
    if(files.length === 0){
        return res.status(422).send({error: 'No file is found'})
    }
    return res.send({msg: files, dir})
})

module.exports = router