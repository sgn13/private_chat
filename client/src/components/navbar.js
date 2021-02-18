import React from "react";
import { Affix, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MessageOutlined,
  UserOutlined,
  BellOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./navbar.css";

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    top: 10,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="my-4" style={{ color: "white" }}>
            <Link to="/home">
              <p>CHAT APP</p>
            </Link>
          </div>
          <Affix>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<MessageOutlined />}>
                <Link to="/userList">Message</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/inviteList">All Users</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<BellOutlined />}>
                <Link to="/request">Request</Link>
              </Menu.Item>
            </Menu>
          </Affix>
        </Sider>
      </>
    );
  }
}
export default SiderDemo;
