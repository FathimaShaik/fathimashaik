const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user.js')
const mongoose = require('mongoose')
const db = "mongodb://fathima:fathima123@ds159782.mlab.com:59782/eventsdb"

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('connected to mongodb')
    }
})
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('From API routes')
})


router.post('/register', (req, res) => {
    console.log("IN REGISTER")
    let userData = req.body
    //let user1 = new User(userData)
    console.log("email " + userData.email)
    User.findOne({ email: userData.email }, (error, user) => {
        if (user) {
            console.log('Already Exist')
            res.status(200).send('Already Exist')
        }
        else {
            User.create(req.body, (err, registeredUser) => {

                if (error) {
                    console.log(error)
                } else {
                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
            })
        }
    })

})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else {
                console.log(user.password)
                console.log(userData.password)
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
            }
        }

    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem iosum",
            "date": "12/04/23"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem iosum",
            "date": "12/04/23"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem iosum",
            "date": "12/04/23"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem iosum",
            "date": "12/04/23"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem iosum",
            "date": "12/04/23"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem iosum",
            "date": "12/04/23"
        },
        {
            "_id": "7",
            "name": "Auto Expo",
            "description": "lorem iosum",
            "date": "12/04/23"
        }

    ]
    res.json(events)
})
router.get('/register', (req, res) => {
})

router.get('/login', (req, res) => {
})

router.get('/events', (req, res) => {
})


router.get('/special', verifyToken, (req, res) => {
    let events = [

    ]
    res.json(events)
})

module.exports = router