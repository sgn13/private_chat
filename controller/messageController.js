const User = require('../models/userModel');
const Message = require('../models/messageModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.dm = async (req, res) => {
    try {
        // const { message, from, to } = req.body;
        const newMessage = new Message({

            from: req.body.from,
            to: req.params.msg_id,
            message: req.body.message,

        });
        const msg = await newMessage.save();
        res.json(msg)
    }
    catch (error) {
        console.log(error);

    }
}


