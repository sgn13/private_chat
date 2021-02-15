const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({

    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
})

const Message = mongoose.model('message', MessageSchema)
module.exports = Message