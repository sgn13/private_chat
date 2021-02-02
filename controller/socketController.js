// const User = require('../models/userModel')

// const onlineList = User.find();
// User.find()
//     .then(user => console.log(user))

var connectedUsers = {};
// userlist = async () => {
//     const onlineList = await User.find();

//     // console.log(connectedUsers, "onlsndfkdsfb");
//     onlineList.forEach(element => {
//         connectedUsers[element._id]
//         console.log(element);

//         connectedUsers[element.fullname]
//     });
// }
// userlist()



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
        console.log(connectedUsers, "connected users list");

        socket.on('user_connected', function (userID) {
            socket.userID = userID;
            connectedUsers[userID] = socket
            console.log(socket);

        })

        socket.on('private', function (data) {
            const to = data.to, message = data.message
            console.log({ to, message });


            if (connectedUsers.hasOwnProperty(to)) {
                connectedUsers[to].emit('private', {
                    message: message
                })
                console.log("yes user is there");
            }
            else {
                console.log("user not found");
            }
            // io.emit('private_msg', {
            //     username: to,
            //     message: message
            // })
        })
    });
};
