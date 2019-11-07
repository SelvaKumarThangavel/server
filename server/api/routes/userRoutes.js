const express = require('express')
const cors = require('cors')
const User = require('../Model/user.js')
const userroute = express.Router()
const today = new Date()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
process.env.SECRET_KEY = 'key'
userroute.use(cors())

userroute.route('/login').post(function (req, res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      //console.log(user)
      if (user) {
        console.log(req.body.password)
        console.log(user.password)
        bcrypt.compare(req.body.password, user.password).then(result => {
          console.log(result)
          if (result) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 10000
            })
            //console.log(token)
            res.status(200).json(token)
          }
          else {
            console.log("inside else 1")
            res.json({ error: 'Invalid Credentials' })
          }
        });
      } else {
        console.log("inside else 2")
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

userroute.route('/resetPassword').post(function (req, res) {
  console.log(req.body)
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      //console.log(user)
      bcrypt.hash(req.body.confirmPassword, 10).then(hashedPassword => {
        //console.log(hashedPassword)    
        User.update(
          {
            password: hashedPassword,
            username: user.username,
            id: user.id,
            updated_at: today,
            created_at: user.created_at,
            email: user.email
          },
          {
            where: {
              email: req.body.email
            }
          }).then(user => {
            console.log(user)
            if (user) {
              //console.log("inside if of user")
              res.status(200).json({ message: 'Password Changed' })
            } else {
              //console.log("inside else of user")
              res.json({ error: 'Password not updated Successfully' })
            }
          })

      })
    } else {
      //console.log("inside else of user")
      res.json({ error: 'Password not updated Successfully' })
    }

  })

})

userroute.route('/newUser').post(function (req, res) {

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    console.log(user)
    if (!user) {
      bcrypt.hash(req.body.password, 10).then(hashedPassword => {
        User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          created_at: today,
          updated_at: today
        }).then(user => {
            res.status(200).json({ message: 'User Created Successfully' })
        })
      })
    } else {
      res.json({ error: 'User already exists' })
    }

  })
})

module.exports = userroute;