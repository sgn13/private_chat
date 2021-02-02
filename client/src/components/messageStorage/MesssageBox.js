import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

let socket;
const MesssageBox = () => {
    const [receiveMessage, setReceiveMessage] = useState('')

    const ENDPOINT = "http://localhost:4000"

    useEffect(() => {
        socket = io.connect(ENDPOINT);
        socket.on('private', (privateData) => {
            setReceiveMessage(privateData.message)
            console.log(privateData, "userList");
        })

    }, []);

    return (
        <div>
            {receiveMessage}
            hy
        </div>
    )
}

export default MesssageBox
