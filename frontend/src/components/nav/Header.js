import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const user = useSelector((state) => state.user);
  // console.log(user);

  const { email, token } = user;

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    firebase.auth().signOut();

    dispatch({
      type: "LOGOUT",
      payload: {},
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!token ? (
        <>
          <Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/register">Register</Link>
          </Item>
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
        </>
      ) : (
        <SubMenu
          icon={<SettingOutlined />}
          title={email.split("@")[0]}
          className="float-right"
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
