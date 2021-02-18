import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./components/chat";
import Join from "./components/Join";
import Room from "./components/room";
import Home from "./components/home";
import UserList from "./components/userStorage/UserList";
import InviteList from "./components/userStorage/InviteList";
import InviteBox from "./components/inviteStorage/InviteBox";
import Navbar from "./components/navbar";
import Request from "./components/request";
import { Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MessageOutlined,
  UserOutlined,
  BellOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Content, Header } = Layout;
const Routes = () => {
  const [collapsed, setCollapse] = useState(false);
  const toggle = () => {
    setCollapse(!collapsed);
  };
  return (
    <Layout style={{ minHeight: "780px" }}>
      <BrowserRouter>
        <Navbar />
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header> */}
          <Content>
            <Route path="/" exact component={Join} />
            <Route path="/home" exact component={Home} />
            <Route path="/userList" component={UserList} />
            <Route path="/inviteList" component={InviteList} />
            <Route path="/chat" component={Chat} />
            <Route path="/room" component={Room} />
            <Route path="/request" component={Request} />
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
};

export default Routes;
