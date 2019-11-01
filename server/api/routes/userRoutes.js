const express = require('express')
const cors = require('cors')
const User = require('../Model/user.js')
const userroute = express.Router()
const today = new Date()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
process.env.SECRET_KEY='key'

userroute.use(cors())

userroute.route('/login').post(function (req, res) {
    User.findOne({ 
        where: { 
            email: req.body.email 
        }
    })
    .then(user => {
        //console.log(user)
        if(user){
            //console.log(req.body.password)
            //console.log(user.password)
            bcrypt.compare(req.body.password, user.password) .then(result => {
                //console.log(result)
                if(result)
                {
                  let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                      expiresIn: 10000
                    })
                    //console.log(token)
                    res.status(200).json(token)
                }
                else{
                  res.json({ error: 'Invalid Credentials' })
                }
              });
            }else{
              res.json({ error: 'Invalid Credentials' })
            } 
        })
        .catch(err => {
          res.status(400).json({ error: err })
        })
})


userroute.route('/userName').post(function (req, res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      //console.log(user.username)
      if (user) {
        res.status(200).json(user.username)
      } else {
        res.json({ error: 'User does not exists' })
      }
    })
})

module.exports=userroute;