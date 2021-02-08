import React, { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import MessageModal from "../messageStorage/MessageModal";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../contextapi/authContext";

let socket;

const Invite = ({ list }) => {
  const { fullname, email, _id } = list;
  const [invite, setInvite] = useState();
  const [user, setUser] = useContext(AuthContext).uso;
  const userID = user.user.id;
  const userName = user.user.fullname;
  const ENDPOINT = "http://localhost:4000";

  const clickHandler = (e) => {
    console.log(userID);
    axios({
      url: `http://localhost:4000/friends/invite/${_id}`,
      method: "POST",
      data: {
        user_id: `${userID}`,
        username: `${fullname}`,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    axios({
      url: `http://localhost:4000/friends/invite/${userID}`,
      method: "POST",
      data: {
        user_id: `${_id}`,
        username: `${userName}`,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("clicked");

    socket = io.connect(ENDPOINT);
    e.preventDefault();
    socket.emit("invite", {
      to: _id,
      from: userID,
      username: userName,
    });
  };
  return (
    <div className="container">
      <Card className="my-5">
        <Card.Header as="h5">{fullname}</Card.Header>
        <Card.Body>
          <Card.Title>{email}</Card.Title>
          <Card.Text>
            Invite {_id}
            <Button
              variant="secondary"
              style={{ float: "right" }}
              onClick={clickHandler}
            >
              {/* Message */}
              Invite
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <MessageModal /> */}
    </div>
  );
};

export default Invite;
