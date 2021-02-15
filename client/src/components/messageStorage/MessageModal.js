import React, { useState, useEffect, useContext } from 'react'
import { io } from "socket.io-client";
import { Card, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../contextapi/authContext';

var socket;

const MessageModal = ({ fullname, email, _id, pm }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiveMessage, setReceiveMessage] = useState('')
    const [user, setUser] = useContext(AuthContext).uso;
    const userID = user.user.id

    const ENDPOINT = "http://localhost:4000"


    useEffect(() => {
        socket = io.connect(ENDPOINT);
    }, [ENDPOINT]);


    useEffect(() => {
        socket.emit('user_connected', userID)

        socket.on('private_receive', (privateData) => {
            const message = privateData.message
            setMessages(messages => [...messages, message])
        })
    }, [])

    console.log(messages);


    // useEffect(() => {
    //     socket.on("private_receive", (message) => {
    //         console.log(message, "list aslkdfnsaldfsbdn,jk");

    //         setMessages(messages => [...messages, message.message])
    //     })
    // }, [])

    const handleSubmit = (e) => {
        // socket = io.connect(ENDPOINT);
        e.preventDefault();
        socket.emit('private', {
            to: _id,
            message: message
        });
    }

    return (
        <div>

            <Card border="secondary" style={{ width: '30rem' }} className="p-3">
                <Card.Header>{fullname}</Card.Header>
                <Card.Body style={{ height: '300px' }}>
                    {messages.map((list) => {
                        return (
                            <p>{list}</p>
                        )
                    })}
                </Card.Body>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <input
                            type="text" placeholder="id" value={_id} readOnly />
                        <Form.Control type="text" placeholder="Message.." value={message} onChange={(e) => setMessage(e.target.value)} />

                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
  </Button>


                </Form>
            </Card>

        </div>
    )
}

export default MessageModal
