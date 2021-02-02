import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./components/chat";
import Join from "./components/Join";
import Room from "./components/room";
import UserList from "./components/userStorage/UserList";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Join} />
      <Route path='/userList' component={UserList} />
      <Route path="/chat" component={Chat} />
      <Route path="/room" component={Room} />
    </BrowserRouter>
  );
};

export default Routes;
