const express = require('express');
const app = express.Router();
const User = require('../../models/userModel')
const messageController = require('../../controller/messageController')

app.post('/t/:msg_id', messageController.dm)

module.exports = app;