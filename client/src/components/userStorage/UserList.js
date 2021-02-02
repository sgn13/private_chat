import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Person from './Person'
import { io } from "socket.io-client";
import { AuthContext } from '../contextapi/authContext';


let socket;

const UserList = () => {
    const [users, setUsers] = useState([])
    const [receiveMessage, setReceiveMessage] = useState('')
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
        socket.on('private', (privateData) => {
            setReceiveMessage(privateData.message)
            console.log(privateData, "userList");
        })

    }, [ENDPOINT]);

    return (
        <div>

            {receiveMessage}
            {users.map((list) => {
                return (
                    <Person list={list} key={list._id} />
                )
            })}
        </div>
    )
}

export default UserList
