import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;
const InviteBox = () => {
  const [receiveInvite, setReceiveInvite] = useState("");

  const ENDPOINT = "http://localhost:4000";

  useEffect(() => {
    socket = io.connect(ENDPOINT);
    socket.on("invite", (invite) => {
      setReceiveInvite(invite);
      console.log(invite, "userList");
    });
  }, []);

  return (
    <div>
      {receiveInvite.map((list) => {
        return list;
      })}
    </div>
  );
};

export default InviteBox;
