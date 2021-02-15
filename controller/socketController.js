const User = require('../models/userModel')
const Message = require('../models/messageModel')

// const onlineList = User.find();
// User.find()
//     .then(user => console.log(user))

var connectedUsers = {};

exports.chat = (http) => {


    const io = require("socket.io")(http,
        {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
            },
        });


    io.on("connection", async (socket) => {

        // const userId = await (socket)
        userlist = async () => {
            const onlineList = await User.find();
            onlineList.forEach(element => {
                socket.userID = element._id;
                connectedUsers[element._id] = socket
                console.log(socket);

            });
        }

        // userlist()

        socket.on('user_connected', function (userID) {
            socket.userID = userID;
            connectedUsers[userID] = socket
        })

        socket.on('private', function (data) {

            const from = data.from, to = data.to, message = data.message
            // const newMessage = new Message({
            //     from: from,
            //     to: to,
            //     message: message
            // })
            // newMessage.save()

            if (connectedUsers.hasOwnProperty(to)) {
                connectedUsers[to].emit('private_receive', {
                    to: to,
                    message: message
                })
                console.log("yes user is there");
            }
            else {
                console.log("user not found");
            }

        })
    });
};
