const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        let { email, password, passwordCheck, fullname } = req.body;

        //validate
        if (!email || !password || !passwordCheck) {
            return res.status(400).json({ msg: 'Not all fields have been entered' })
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: 'The password must to be atleast 5 characters long.' })
        }
        if (password !== passwordCheck) {
            return res.status(400).json({ msg: 'Password did not match' })
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ msg: "An account already exist" })
        }
        if (!fullname) fullname = email;

        //Hashing
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        //New user
        const newUser = new User({
            email,
            password: passwordHash,
            fullname,
        });

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)
        res.json({ user, token })
    }
    catch (error) {
        console.log(error);

    }
}

//Login
exports.login = async (req, res) => {

    try {
        const { email, password, firstname } = req.body;

        //validate
        if (!email || !password) {
            return res.status(400).json({ msg: 'Fill up all the fields' })
        }

        const user = await User.findOne({ email: email });

        if (!user)
            return res.status(400).json({ msg: 'There is no email as per your input' })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
            return res.status(400).json({ msg: 'Wrong password' })

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)

        res.json({
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        })

    } catch (error) {
        console.log(error);
    }
}


exports.protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization

        if (!token) return res.status(401).send('Please provide a valid token.')
        token = token.split(" ");

        if (token[0] !== 'Bearer') return res.status(401).send("provide a valid token")
        token = token[1]

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        if (!decoded) {
            return res.send(401).send('Provide valid token.')
        }
        req.user = decoded.id;
        const user = await User.findById(req.user)
        if (!user) {
            return res.send(401).send('User not exist or it may be deleted..')
        }
        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({
            status: "failed",
            message: error.message
        })
    }
}

