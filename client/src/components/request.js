import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { AuthContext } from "./contextapi/authContext";

let socket;

const Request = () => {
  const [invite, setInvite] = useState([]);
  const [user, setUser] = useContext(AuthContext).uso;
  const [senderID, setsenderID] = useState([]);
  const [name, setName] = useState([]);
  const userID = user.user.id;
  const ENDPOINT = "http://localhost:4000";
  const handleClick = () => {
    console.log(name);
    axios
      .post(`http://localhost:4000/friends/invitetrue/${userID}`)
      .then(
        axios({
          url: `http://localhost:4000/friends/invite/${senderID}`,
          method: "POST",
          data: {
            user_id: `${userID}`,
            username: `${name}`,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
      )
      .then(axios.post(`http://localhost:4000/friends/invitetrue/${senderID}`));
  };

  useEffect(() => {
    console.log("useeffect");
    socket = io.connect(ENDPOINT);
    socket.emit("user_connected", userID);

    socket.on("invite", (invite) => {
      console.log(invite);
      setInvite([invite.message]);
      setsenderID([invite.sender_id]);
      setName([invite.sender_name]);
    });
  }, [ENDPOINT]);
  return (
    <div>
      <h2>Request List</h2>

      {invite.map((list) => {
        return (
          <>
            {list}
            <Button onClick={handleClick}>Agree</Button>
            <Button>DisAgree</Button>
          </>
        );
      })}
    </div>
  );
};

export default Request;
