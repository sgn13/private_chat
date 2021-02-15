import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import queryString from 'query-string'
import InfoBar from "./Infobar/InfoBar";
import Input from "./input/input";
import { Card, Form, Button } from 'react-bootstrap'
import Messages from "./Messages";
import MesssageBox from "./messageStorage/MesssageBox";
import { useHistory } from "react-router-dom";

var socket;

const Chat = ({ location }) => {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState()
  const [receiveMessage, setReceiveMessage] = useState('sdfsdfasdfsdfsd')
  const userValue = (location?.userProps?.user)
  // const { fullname, email } = location.userProps
  const fullname = location.userProps?.fullname;
  const email = location.userProps?.email;
  const userID = location.userProps?.from;
  console.log(userID, "sdjfisdfnisdfu");


  const ENDPOINT = "http://localhost:4000"

  useEffect(() => {
    if (!location.userProps) {
      history.push("/userList");
    }
  }, [])

  useEffect(() => {
    socket = io.connect(ENDPOINT);
  }, [ENDPOINT]);

  const handleSubmit = (e) => {
    // socket = io.connect(ENDPOINT);
    e.preventDefault();
    console.log();

    socket.emit('private', {
      from: userID,
      to: userValue,
      message: message
    });
  }
  useEffect(() => {
    socket.on('private', (privateData) => {
      setReceiveMessage(privateData.message)
      console.log(privateData, "userList");
    })
  }, [])


  return (
    <div>
      {userValue}

      <div className="container mt-5">
        <h4>Chat App</h4>
        <Card border="secondary" style={{ width: '30rem' }} className="p-3">
          <Card.Header>{fullname}</Card.Header>
          <Card.Body>

          </Card.Body>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <input
                type="text" placeholder="id" value={userValue} />
              <Form.Control type="text" placeholder="Message.." value={message} onChange={(e) => setMessage(e.target.value)} />

            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
  </Button>


          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
