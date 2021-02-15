import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Person from './Person'
import { io } from "socket.io-client";
import { AuthContext } from '../contextapi/authContext';


let socket;

const UserList = () => {
    const [users, setUsers] = useState([])
    const [receiveMessage, setReceiveMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useContext(AuthContext).uso;
    const userID = user.user.id
    const ENDPOINT = "http://localhost:4000"

    useEffect(async () => {
        const response = await axios({
            url: "http://localhost:4000/users/",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const datas = response.data
        setUsers(datas)

    }, [])

    useEffect(() => {
        socket = io.connect(ENDPOINT);
        socket.emit('user_connected', userID)
        // socket.on('private_receive', (privateData) => {
        //     setReceiveMessage(privateData.message)
        //     console.log(privateData, "userList");
        // })
    }, [ENDPOINT]);
    console.log(messages);

    useEffect(() => {
        socket.on('private_receive', (privateData) => {
            setReceiveMessage(privateData.message)
            socket.on('private_receive', (privateData) => {
                const message = privateData.message
                setMessages(messages => [...messages, message])
            })
        })
    }, [messages])

    return (
        <div>
            {messages.map((list) => {
                return (
                    <p>{list} hello</p>
                )
            })}
            <h1 className="text-center" style={{ color: 'green' }}>{user.user.fullname}</h1>
            {users.map((list) => {
                return (
                    <Person key={list._id} {...list} pm={messages} userID={userID} />
                )
            })}
        </div>
    )
}

export default UserList
