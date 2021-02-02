const express = require("express");

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const socketController = require('./controller/socketController')
const http = require('http').createServer(app)

dotenv.config();


const uri = process.env.DATABASE_LOCAL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

socketController.chat(http);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('!!! Database Successfully Connected !!!');
})

const port = process.env.PORT || 4000;
http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

