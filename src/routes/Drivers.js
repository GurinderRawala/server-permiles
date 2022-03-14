const express = require('express');
const db = require('../db/connect');
const requireAuth = require('../middleware/requireAuth');
const AddDriver = require('../models/AddDriver');
const router = express.Router()

router.post('/addDriver',requireAuth, (req, res) =>{
    const { username } = req.user;
    const table = `add_drivers_${username}`
    const sql = AddDriver(table)
    db.query(sql, (err, results) =>{
        //if(err) console.log(err)
       // console.log("table created")
    })
   
    const { firstname, lastname, phone, driverId, email, licence, licenceState } = req.body;
    const insert = `INSERT INTO ${table} 
    (firstname, lastname, phone, email, driver_id, drivers_licence, licence_state, filepath)
    VALUES(?,?,?,?,?,?,?,?)`;
    const data = [firstname, lastname, phone, email, driverId, licence, licenceState, `${username}/drivers/${driverId}`];
    db.query(insert, data, (err, results) =>{
       if(err){
           console.log(err)
         return  res.status(422).send({error: 'DriverId or email address already exits'})
       }

       return res.send({msg: "Driver has been added"})
    })
})

router.get('/getDrivers', requireAuth, (req, res) =>{
  const { username } = req.user;
  if(!username){
    return res.status.send({error: 'Access denied'})
  }
  const table = `add_drivers_${username}`;

  db.query(`SELECT * FROM ${table}`, (err, results) =>{
    if(err){
      console.log(err)
      return res.status(422).send({error: 'No Record found'})
    }
    // if(results.length === 0)
    // {
    //   return res.send({msg: 'No Records Found'})
    // }
     return res.send({ results })
  })
})

module.exports = router