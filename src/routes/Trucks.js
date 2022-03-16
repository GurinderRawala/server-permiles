const express = require('express');
const db = require('../db/connect');
const requireAuth = require('../middleware/requireAuth');
const AddTrailers = require('../models/AddTrailers');
const AddTrucks = require('../models/AddTrucks');
const router = express.Router()

class TrailerUpdate{
    
    constructor(username){
      this.username = username;
      this.table = `add_trailers_${username}`;
    }
   CreateTable(){
      const Sql = AddTrailers.create(this.table)
      db.query(Sql, (err, results) =>{}) //table created 
    }
    Insert(req, res ){
        const InsertQuery = AddTrailers.insert(this.table)
        const { model, make, year, unitno, vin, plate, state, type, notes } = req.body;
        if(!model || !make || !year || !unitno || !vin || !plate || !type){
            res.status(422).send({error: 'Invalid access'})
        }
        const filepath = `${this.username}/${type}/${unitno}`;
        
        const DATA = [model, make, year, unitno, vin, filepath, plate, state, type, notes];
        db.query(InsertQuery, DATA,  (err, results) =>{
             if(err){
                 return res.status(422).send({error: `Record for unit# ${unitno} already exits. `})
             }

             return res.send({msg: `Record has been updated`})
        })
    }

    
}

router.post('/addEquipment/:type', requireAuth, (req, res) =>{
    const { username } = req.user;
    const { type } = req.params;
    if(!type || (type !== 'trailers' && type !== 'trucks')) {
        return res.status(422).send({error: 'Equipment type is missing'})
    }
    if(type === 'trailers'){
        const Trailer = new TrailerUpdate(username);
        Trailer.CreateTable()
        Trailer.Insert(req, res, type)
        return;
    }

   if(type === 'trucks'){
   
    const table = `add_trucks_${username}`
    const CreateQuery = AddTrucks.create(table)
    db.query(CreateQuery, (err, results) => {}) //table created

    const { make, model, year, unitno, vin, plate, state, notes } = req.body;

    if(!make || !model || !year || !unitno || !vin || !plate || !state || !type){
        return res.status(422).send({ error: "Access denied"})
    }
    const filepath = `${username}/${type}/${unitno}`;
    
    const InsertQuery = AddTrucks.insert(table);
    db.query(InsertQuery, [model, make, year, unitno, vin, filepath, plate, state, notes], (err, results) =>{
        if(err){
            return res.status(422).send({error: `Record for unit# ${unitno} already exits. `})
        }

        return res.send({msg: 'Record has been updated'})
    })
     



   } 
   

})

router.get('/getEquipment/:type/:unitno', requireAuth, (req, res) =>{

    const { username } = req.user;
    let { type, unitno } = req.params;
    if(!type || (type !== 'trucks' && type !=='trailers')){
        return res.status(422).send({error: 'Equipment type is missing'})
    }
    const table = `add_${type}_${username}`;
    let sql = AddTrailers.select(table);

    if(unitno !== 'all'){
        sql += ` where ${type.replace('s', '')}no = '${unitno}'`;
    }
   // console.log(sql)
    db.query(sql,(err, results) =>{
        if(err){
            return res.status(422).send({keyUpError: 'Error Finding records'})
        }
        
        return res.send({results})
    })


})

module.exports = router