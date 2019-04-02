const express = require('express')
const jwt = require('jsonwebtoken')    // Needed for jsonwebtoken
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

function verifyToken(req, res, next){
      if(!req.headers.authorization){
        return res.status(401).send('Unauthorized1 request')
      }
      let token = req.headers.authorization.split(' ')[1] // gets token value
      if(token === ''){
        return res.status(401).send('Unauthorized2 request')
      }
      let payload = jwt.verify(token, 'key') // Returns decoded token if it is valid
      if(!payload){
        return res.status(401).send('Unauthorized3 request')
      }
      req.userID = payload.userid
      console.log(req.userID)
      next()
}

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
        let payload = { userid: registeredUser._id }
        let token = jwt.sign(payload, 'key') // Generates the token 'key' can be anything
        res.status(200).send({token}) // Sends token as an object
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
          let payload = { userid: user._id }
          //console.log(user._id)
          let token = jwt.sign(payload, 'key')
          //console.log(token);
          res.status(200).send({token})
          //console.log(user)
        }
    }
  })
})

router.get('/about', verifyToken, (req, res) => {
  // let data = [                          // Code here only runs if verifyToken works
  //   {
  //     "_id": "1",
  //     "name": "Random stuff"
  //   }
  // ]
  // res.json(data)

  res.json(req.userID)
})

module.exports = router
