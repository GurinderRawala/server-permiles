const jwt = require('jsonwebtoken');
const db = require('../db/connect');

module.exports = (req, res, next) =>{
    const { authorization } = req.headers;
    if( !authorization ){
        return res.status(401).send({error: "Access denined"})
    }
 
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, 'MY_SECRET_KEY', ( err, payload ) =>{
        if( err ){
            return res.status(401).send({error: "Access denined"})
        }
 
        const { userId } = payload;
        db.query('SELECT * FROM users where id= ?', [userId], (err, result) =>{
          if(!err){
              req.user = result[0];
              next()
          } 
        })
        
    })
 }