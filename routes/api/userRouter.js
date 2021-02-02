const express = require('express');
const app = express.Router();
const User = require('../../models/userModel')
const authController = require('../../controller/authController')

app.get('/', (req, res) => {
    User.find()
        .then(user => res.json(user))
})
app.post('/register', authController.register)

app.post('/login', authController.login)

// app.post('/yo', authController.protect)

// app.post('/protect_to', authController.restrictTo(['admin', 'customer']))



module.exports = app;