const Friend = require("../models/friendModel");

exports.invite = async (req, res) => {
  try {
    console.log(req.body.user_id, "invite");
    const f_id = req.params.id;
    const user_id = req.body.user_id;
    const f_name = req.body.username;
    const friends = await Friend.create({
      f_id,
      user_id,
      f_name,
    });
    res.json(friends);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.invitetrue = async (req, res) => {
  console.log(req.params.id, "invitetrue");
  try {
    const filter = { f_id: req.params.id };
    const update = { f_accept: true };
    const invite = await Friend.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.json(invite);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.friends = async (req, res) => {
  try {
    console.log(req.params.id);
    const friends = await Friend.find({
      f_accept: true,
      user_id: req.params.id,
    });
    res.json(friends);
    console.log(friends);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.pending = async (req, res) => {
  try {
    const pending = await Friend.find({
      f_accept: false,
      user_id: req.params.id,
    });
    res.json(pending);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body.id);
    const del = await Friend.findOneAndDelete({
      user_id: req.body.id,
    });
    res.json(del);
  } catch (err) {
    res.status(500).json(err);
  }
};
