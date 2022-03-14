const express = require('express');
const db = require('../db/connect');
const requireAuth = require('../middleware/requireAuth');
const Trips = require('../models/Trips');
const router = express.Router()

router.post('/addtrip', requireAuth, (req, res) =>{
    const { username } = req.user;
    const tablename = `trips_${username}`;
    const sql = Trips.create(tablename);
    db.query(sql, (err, results) =>{});
    const alter = Trips.alter(tablename);
    db.query(alter, (err, results)=>{});
 
    const { Pickups, Deliveries, PO, broker, commodity, miles, noOfDeliveries, noOfPickups, trailerno, temperature, weight, hazmat } = req.body;
    //Validate Data
    if(!Pickups || !Deliveries || !PO || !broker || !noOfDeliveries || !noOfPickups || !commodity)
    {
        return res.status(422).send({error: 'Fill empty fields'})
    }

    //Insert Data
    const insertSql = Trips.insert(tablename)
    const insertData = [Pickups, Deliveries, PO, commodity, noOfPickups, noOfDeliveries, broker, miles, trailerno, temperature, weight, hazmat, 'Pending'];
    db.query(insertSql,insertData, (err, results) =>{
        if(err){
            console.log(err)
            return res.status(422).send({error: 'Error Creating Trip'})
        }

        return res.send({msg: 'Trip has been added to the system'})
    })


})

module.exports = router