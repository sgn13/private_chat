import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Invite from "./Invite";
import { io } from "socket.io-client";
import { AuthContext } from "../contextapi/authContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

let socket;

const InviteList = () => {
  const [users, setUsers] = useState([]);
  const [receiveMessage, setReceiveMessage] = useState("");
  const [user, setUser] = useContext(AuthContext).uso;

  const userID = user.user.id;

  const ENDPOINT = "http://localhost:4000";

  useEffect(async () => {
    const response = await axios({
      url: "http://localhost:4000/users/",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const datas = response.data;
    setUsers(datas);
  }, []);

  useEffect(() => {
    socket = io.connect(ENDPOINT);
    socket.emit("user_connected", userID);
    socket.on("private", (privateData) => {
      setReceiveMessage(privateData.message);
      console.log(privateData, "userList");
    });
  }, [ENDPOINT]);

  return (
    <div>
      <h2>All User</h2>
      <Link to="/request">
        <Button variant="primary" type="submit">
          Request
        </Button>
      </Link>
      <Link to="/userList">
        <Button variant="primary" type="submit">
          Friends
        </Button>
      </Link>
      {receiveMessage}
      {users.map((list) => {
        console.log(list);
        return <Invite list={list} key={list._id} />;
      })}
    </div>
  );
};

export default InviteList;
