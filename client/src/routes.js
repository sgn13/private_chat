import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./components/chat";
import Join from "./components/Join";
import Room from "./components/room";
import UserList from "./components/userStorage/UserList";
import InviteList from "./components/userStorage/InviteList";
import InviteBox from "./components/inviteStorage/InviteBox";
import Request from "./components/request";
const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Join} />
      <Route path="/userList" component={UserList} />
      <Route path="/inviteList" component={InviteList} />
      <Route path="/chat" component={Chat} />
      <Route path="/room" component={Room} />
      <Route path="/request" component={Request} />
    </BrowserRouter>
  );
};

export default Routes;
