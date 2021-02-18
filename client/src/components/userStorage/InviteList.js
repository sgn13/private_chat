import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Invite from "./Invite";
import { io } from "socket.io-client";
import { AuthContext } from "../contextapi/authContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { List, Avatar, Input, Space, AutoComplete } from "antd";
import Highlighter from "react-highlight-words";
import {
  UserOutlined,
  UserAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";

let socket;

const InviteList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [user, setUser] = useContext(AuthContext).uso;
  const [data, setData] = useState();
  const [post, setPost] = useState(false);
  const userID = user.user.id;
  const userName = user.user.fullname;

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

  const clickHandler = (e) => {
    console.log(e);
    const id = e._id;
    // console.log(e.fullname);
    const fullname = e.fullname;

    axios({
      url: `http://localhost:4000/friends/invite/${id}`,
      method: "POST",
      data: {
        user_id: `${userID}`,
        username: `${fullname}`,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then(setPost(true));

    console.log("clicked");
  };
  useEffect(() => {
    const id = data?._id;
    console.log(userName);
    axios({
      url: `http://localhost:4000/friends/invite/${userID}`,
      method: "POST",
      data: {
        user_id: `${id}`,
        username: `${userName}`,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [post]);
  useEffect(() => {
    const results = users.filter((person) => {
      const pers = person.fullname;
      console.log(pers);
      pers.includes(search);
    });
    console.log(results);
    setSearchResults(results);
  }, [search]);
  console.log(search, "search");
  return (
    // <>
    //   {users.map((list) => {
    //     console.log(list);
    //     return <Invite list={list} key={list._id} />;
    //   })}
    // </>
    <div className="container my-4">
      <h4>All User</h4>
      <AutoComplete>
        <Input.Search
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          size="large"
          placeholder="input here"
          enterButton
        />
      </AutoComplete>
      <ul>
        {searchResults.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<a href="https://ant.design">{item.email}</a>}
              description={item.fullname}
            />
            <Button
              className="btn btn-sm btn-primary"
              value={item}
              onClick={() => {
                setData(item);
                clickHandler(item);
              }}
            >
              <UserAddOutlined className="mr-1 mb-1" />
              Request
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default InviteList;
