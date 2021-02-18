import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Person from "./Person";
import { io } from "socket.io-client";
import { AuthContext } from "../contextapi/authContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
let socket;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [receiveMessage, setReceiveMessage] = useState("");
  const [user, setUser] = useContext(AuthContext).uso;

  const userID = user.user.id;

  const ENDPOINT = "http://localhost:4000";

  useEffect(async () => {
    const response = await axios({
      url: `http://localhost:4000/friends/allfriends/${userID}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const datas = response.data;
    console.log(datas);
    setUsers(datas);
  }, []);

  useEffect(() => {
    socket = io.connect(ENDPOINT);
    socket.emit("user_connected", userID);
  }, [ENDPOINT]);

  return (
    <div className="container my-4">
      <h4>Friend List</h4>
      {receiveMessage}
      {users.map((list) => {
        return <Person list={list} key={list._id} />;
      })}
    </div>
  );
};

export default UserList;
