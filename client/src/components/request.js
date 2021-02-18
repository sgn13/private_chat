import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { Card } from "react-bootstrap";
import { AuthContext } from "./contextapi/authContext";

let socket;

const Request = () => {
  const [invite, setInvite] = useState([]);
  const [user, setUser] = useContext(AuthContext).uso;
  const [senderID, setsenderID] = useState([]);
  const [name, setName] = useState([]);
  const [accept, setAccept] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [request, setRequest] = useState([]);
  const userID = user.user.id;
  const ENDPOINT = "http://localhost:4000";

  useEffect(() => {
    console.log(senderID, userID);
    axios({
      method: "GET",
      url: `http://localhost:4000/friends/pending/${userID}`,
    }).then((res) => {
      setRequest(res.data);
    });
  }, [refresh]);

  // useEffect(() => {
  //   console.log("rerender");
  //   axios.post(`http://localhost:4000/friends/invitetrue/${senderID}`);
  // }, [accept]);
  // useEffect(() => {
  //   console.log("frequest");
  //   if (accept)
  //     axios.post(`http://localhost:4000/friends/invitetrue/${senderID}`);
  // }, [accept]);
  // useEffect(() => {
  //   console.log("useeffect");
  //   socket = io.connect(ENDPOINT);
  //   socket.emit("user_connected", userID);

  //   socket.on("invite", (invite) => {
  //     console.log(invite);
  //     setInvite([invite.message]);
  //     setsenderID([invite.sender_id]);
  //     setName([invite.sender_name]);
  //   });
  // }, [ENDPOINT]);

  const handleClick = (e) => {
    //  console.log(name);
    console.log(e.target.value);
    console.log(userID);
    const ID = e.target.value;
    axios
      .post(`http://localhost:4000/friends/invitetrue/${userID}`)
      .then(
        axios.post(`http://localhost:4000/friends/invitetrue/${ID}`),
        setRefresh(true)
      );
  };

  const handleDelete = (e) => {
    console.log("delete", e.target.value);
    const id = e.target.value;
    axios({
      url: `http://localhost:4000/friends/delfriend`,
      method: "delete",
      data: {
        id,
      },
    }).then(
      axios({
        url: `http://localhost:4000/friends/delfriend`,
        method: "delete",
        data: {
          id: userID,
        },
      }),
      setRefresh(true)
    );
  };
  return (
    <div className="container my-5">
      <h4>Request List</h4>

      {request.map((list) => {
        return (
          <>
            <Card className="my-3 " style={{ width: "400px", height: "40px" }}>
              <p>
                <strong>{list.f_name}</strong> has send a friend request
              </p>
            </Card>

            <Button
              className=" btn btn-primary btn-sm"
              value={list.f_id}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Confirm
            </Button>
            <Button
              className="ml-2  btn btn-light btn-sm"
              value={list.f_id}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        );
      })}
    </div>
  );
};

export default Request;
