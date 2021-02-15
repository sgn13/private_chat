import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./components/chat";
import Join from "./components/Join";
import UserList from "./components/userStorage/UserList";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Join} />
      <Route path='/userList' component={UserList} />
      <Route path="/chat" component={Chat} />
    </BrowserRouter>
  );
};

export default Routes;
