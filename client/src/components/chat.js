import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import queryString from 'query-string'
import InfoBar from "./Infobar/InfoBar";
import Input from "./input/input";
import { Card, Form, Button } from 'react-bootstrap'
import Messages from "./Messages";
import MesssageBox from "./messageStorage/MesssageBox";

let socket;

const Chat = ({ location }) => {
  const [userID, setUserID] = useState('')
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState()
  const ENDPOINT = "http://localhost:4000"
  const [receiveMessage, setReceiveMessage] = useState('sdfsdfasdfsdfsd')

  const userValue = location.userProps.user
  const { fullname, email } = location.userProps

  const handleSubmit = (e) => {
    socket = io.connect(ENDPOINT);

    e.preventDefault();

    socket.emit('private', {
      to: userValue,
      message: message
    });
  }

  return (
    <div>
      <div className="container mt-5">
        <h4>Chat App</h4>
        <Card border="secondary" style={{ width: '30rem' }} className="p-3">
          <Card.Header>{fullname}</Card.Header>
          <Card.Body>
            <MesssageBox />

          </Card.Body>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <input
                type="text" placeholder="id" value={userValue} readOnly />
              <Form.Control type="text" placeholder="Message.." value={message} onChange={(e) => setMessage(e.target.value)} />

            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
  </Button>


          </Form>
        </Card>
        {/* <InfoBar room={room} />
        <Messages message={messages} name={name} users={users} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
      </div>
    </div>
  );
};

export default Chat;
