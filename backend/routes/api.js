const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')

const db = "mongodb+srv://sudokuuser:sudokuuser1234@cluster0-wxkdr.mongodb.net/test?retryWrites=true";
mongoose.connect(db, err => {
  if (err){
      console.error('Error!' + err)
  } else{
      console.log('Connected to mongodb')
  }
})

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((error, registeredUser) =>{
      if(error) {
        console.log(error)
      } else {
        res.status(200).send(registeredUser)
      }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({username: userData.username}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      if (!user) {
        res.status(401).send('Invalid username or password')
      } else
        if (user.password !== userData.password){
          res.status(401).send('Invalid password or username')
        } else {
          res.status(200).send(user)
        }
    }
  })
})

module.exports = router
