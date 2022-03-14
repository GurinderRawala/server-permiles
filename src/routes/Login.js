const SendEmail = require('../Mailer/SendEmail')
const VerificationEmail = require('../Mailer/VerificationEmail')
const requireAuth = require('../middleware/requireAuth')
const express = require('express');
const db = require('../db/connect');
const router = express.Router()
const Users = require('../models/users') //users table
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const PasswordResetEmail = require('../Mailer/PasswordResetEmail');
const fs = require('fs');

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

const HashPwd = async (password) =>{

    try{
      
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt)
  
    return pass?pass: null;

    }catch(err){
        console.log(err)
    }

   
}

router.post('/signup', async (req, res) =>{
    db.query(Users, (err, results) =>{
        //if(err) console.log(err)
       // console.log("table created")
    })

    const verify = getRndInteger(10000,99999);
    const { firstname, lastname, username, email, company, password } =  req.body;
    if(!firstname || !lastname || !username || !email || !company || !password){
        return res.status(422).send({error: "access denied"})
    }
    
    let hash = await HashPwd(password);
    
    const Insert = `INSERT INTO users(firstname, lastname, username, email, company, password, verify)
                    VALUES(?,?,?,?,?,?,?)`;
    db.query(Insert, [firstname, lastname, username.toLowerCase(), email.toLowerCase(), company, hash, verify], (err, results) =>{
        if (err){
            return res.status(422).send({error: "Username or Email already exists"})
        }

       db.query('SELECT * from users', (err, results) =>{
           if(!err) {
            const token = jwt.sign({userId: results[results.length - 1].id}, 'MY_SECRET_KEY')
            const mailBody = VerificationEmail(verify)
            SendEmail('Verify your Per Miles account', email, mailBody, [])
            res.send({token})
           }
       })
       
    })

})

router.post('/signin', (req, res) =>{
    const { username, password } = req.body;
    if(!username || !password ){
        return res.status(422).send({error: "Must provide username and password"})
    }

 db.query(`SELECT * FROM users WHERE username = "${username.toLowerCase()}" OR email= "${username.toLowerCase()}"`, async (err, results) =>{
        if(err || !results){
            return res.status(422).send({error: "Invalid username or password"})
        }
        const Result = results[0];
        const compair = await bcrypt.compare(password, Result.password);
        if(compair){
            const token = jwt.sign({userId: Result.id}, 'MY_SECRET_KEY')
            res.send({token})
        }else{
            res.status(422).send({error: "Invalid username or password"})
        }
    })
})

router.post('/usercheck', (req, res) =>{
    const { username, email } = req.body;
    if( !username && !email ){
        return res.status(422).send({error: "Must provide email and username"})
    }
 
 db.query(`SELECT * FROM users WHERE username = "${username ? username.toLowerCase() : ''}"`, (err, results) =>{
    let user, mail;
    if(err){
      return res.status(422).send({error: "Something went wrong"})
    }

    user = results[0];
    db.query(`SELECT * FROM users WHERE email = "${email ? email.toLowerCase() : ''}"`, (err, results) =>{
        if(err){
            return res.status(401).send({error: "Something went wrong"})
         }

         mail = results[0]
         let sendMsg = { username: !user?true: false, email: !mail?true: false };
         return res.send(sendMsg)
    })
 })

})

router.post('/verify', requireAuth, async (req, res) =>{
    const { username } = req.user;
    const { code } = req.body;
    if(!code || !username ){
        return res.status(422).send({error: "Access denied"})
    }

    db.query(`SELECT verify from users where username = "${username}"`, (err, results) =>{
        if(err){
          return  res.status(422).send({error: "Something went wrong"})
        }

        let serverCode = results[0].verify;
        if(serverCode !== parseInt(code)){
         return res.send({msg: "reject"})
        }
    
        db.query(`UPDATE users SET verify= 0 WHERE username= "${username}"`, (err, results) =>{
            if(err){
              return  res.status(422).send({error: "Something went wrong"})
            }

            return res.send({msg: "accept"})
        })
    })

  
})

router.post('/resend', requireAuth, async (req, res) =>{
    const { username } = req.user;
    const { pwdReset } = req.body;
    if(!username){
        return res.status(422).send({error: "Access denied"})
    }
    

    db.query(`SELECT * FROM users WHERE username= "${username}"`, (err, results) =>{
        if(results.length !== 0){
            const verify = getRndInteger(10000,99999);
            if(db.query(`UPDATE users SET verify="${verify}" WHERE username="${username}"`)){
                const mailBody = pwdReset?PasswordResetEmail(verify): VerificationEmail(verify);
                SendEmail(!pwdReset?'Verify your Per Miles account': 'Reset your Per Miles Password', results[0].email, mailBody, [])
                res.send({msg: 'Email Sent'})
            }else{
                return res.status(422).send({error: "Access denied"})
            }
            
        }else{
            return res.status(422).send({error: "Access denied"})
        }
    })
})

router.post('/forgotpwd', (req, res) =>{
    const { email } = req.body;

    if(!email){
        return res.status(422).send({error: 'Access denied'})
    }

 db.query(`SELECT * from users where email="${email}"`, (err, results) =>{
     if( err ){
         return res.status(401).send({error: 'Something went wrong'})
     }

     if(results.length === 0){
       return  res.status(422).send({error: 'User not Found'})
     }

     const code = getRndInteger(10000,99999);
     db.query(`UPDATE users SET verify="${code}" where email="${email}"`, (err, Results) =>{
         if(err) {
             return res.status(401).send({error: 'Something went wrong'})
         }
         const mailBody = PasswordResetEmail(code);
         SendEmail('Reset your Per Miles Password', email, mailBody, [])
         const token = jwt.sign({userId: results[0].id}, 'MY_SECRET_KEY')
         res.send({token})
        
     })
 })
      
})

router.post('/resetpwd', requireAuth, async(req, res) =>{
    const { password } = req.body;
    const { id } = req.user;
    if(!password || !id){
        return res.status(401).send({error: 'Access denied'})
    }
    
    const hash = await HashPwd(password);

    db.query(`UPDATE users SET password= "${hash}", verify= 0 WHERE id="${id}"`, (err, results) =>{
        if(err){
            return res.status(401).send({error: 'Something went wrong'})
        }

        return res.send({msg: "Password change is Successful"})
    })
    
})

router.post('/updateaddress', requireAuth, (req, res) =>{
    const { id } = req.user;
    const { address } = req.body;
    if(!address || !id){
        return res.status(401).send({error: 'Access denied'})
    }
    db.query(`UPDATE users SET address= '${address}' WHERE id='${id}'`, (err, results) =>{
        if(err) {
            return res.status(401).send({error: 'Something went wrong'})
        }

        return res.send({msg: "Address has been Updated"})
    })
})

router.post('/profilePhoto', requireAuth, (req, res) =>{
    const { id } = req.user;
    const { filepath } = req.body;
    if(!filepath || !id){
        return res.status(401).send({error: 'Access denied'})
    }

    db.query(`UPDATE users SET filepath= '${filepath}' WHERE id='${id}'`, (err, results) =>{
        if(err) {
            return res.status(401).send({error: 'Something went wrong'})
        }

        return res.send({msg: "Profile photo has been Updated"})
    })
})



module.exports = router