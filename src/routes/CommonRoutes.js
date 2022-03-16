const express = require('express');
const db = require('../db/connect');
const requireAuth = require('../middleware/requireAuth');
const AddTrailers = require('../models/AddTrailers');
const fs = require('fs');
const DeleteFolder = require('../FileSystem/DeleteFolder');
const router = express.Router()

router.get('/anydata/:tableName/:where/:id', requireAuth, (req, res) =>{
    const { username } = req.user;
    const { tableName, where, id } = req.params;
    if( !tableName || !where || !id ) 
    {
        return res.status(401).send({error: 'Access Denied'})
    }
    const table = `${tableName}_${username}`;
    let sql = AddTrailers.select(table);
    if( where !== 'all' && id !== 'none'){
        sql += ` WHERE ${where} = '${id}'`;
    }

    db.query(sql, (err, results) =>{
        if(err){
            
            return res.status(422).send({error: 'Error Processing request'})
        }
        res.send({results})
    })
})

router.post('/deleteUpdate/:action', requireAuth, (req, res) =>{
    const { username } = req.user;
    const { action } = req.params;
    const { where, value, table, statement, filepath } = req.body;
    if(!where || !value || !table || !action){
        return res.status(422).send({error: "Required data is missing"})
    }
    const tablename = `${table}_${username}`;
    let sql;
    if(action === 'delete'){
       if(filepath){
          DeleteFolder(`./public/${username}/${filepath}`)
       }
       sql = `DELETE from ${tablename} where ${where} = '${value}'`;
    }
    if(action === 'update'){
        if(!statement){
            return res.status(422).send({error: "Required data is missing"})
        }
        sql = `Update ${tablename} SET ${statement} where ${where} = '${value}'`;
    }
  

    db.query(sql, (err, results) =>{
        if(err){
            
            return res.status(422).send({error: 'Error Processing request'})
        }

        return res.send({msg: 'Record updated successfully'})
    })
})

router.delete('/deleteFile', requireAuth, (req, res) =>{
    const { username } = req.user;
    const { filepath } = req.body;
  
    if(!filepath ){
        return res.status(422).send({error: "Access denined"})
    }
 
  
    fs.unlink(`./public/${filepath}`, (err) => {
     if (err) return res.status(422).send({error: 'Error Deleting file' })
     return res.send({msg: "File has been deleted"})
   })
      
 
  
 
 })

module.exports = router