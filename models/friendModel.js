const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const friendSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  f_id: {
    type: String,
  },
  f_accept: {
    type: String,
    default: false,
  },
  f_name: {
    type: String,
  },
});

const Friend = mongoose.model("friends", friendSchema);
module.exports = Friend;
