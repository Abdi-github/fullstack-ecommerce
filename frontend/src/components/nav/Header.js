import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "../Input-forms/SearchForm";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const user = useSelector((state) => state.user);
  // console.log(user);

  const { email, token, role } = user;

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
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
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
            {token && role === "customer" && (
              <Item>
                <Link to="/user/dashboard">Dashboard</Link>
              </Item>
            )}

            {token && role === "admin" && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}
        <span className="float-right p-1">
          <SearchForm />
        </span>
      </Menu>

      {/* <Menu mode="horizontal">
        <SubMenu key="SubMenu" title="Laptops">
          <Menu.Item key="setting:1">
            <Link to="/user/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="desktop" title="Desktops">
          <Menu.Item key="setting:a">
            <Link to="/user/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="setting:b">Option 2</Menu.Item>
          <Menu.Item key="setting:c">Option 3</Menu.Item>
          <Menu.Item key="setting:d">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="mobile" title="Mobiles">
          <Menu.Item key="setting:a">
            <Link to="/user/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="setting:b">Option 2</Menu.Item>
          <Menu.Item key="setting:c">Option 3</Menu.Item>
          <Menu.Item key="setting:d">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="printer" title="Printers">
          <Menu.Item key="setting:a">
            <Link to="/user/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="setting:b">Option 2</Menu.Item>
          <Menu.Item key="setting:c">Option 3</Menu.Item>
          <Menu.Item key="setting:d">Option 4</Menu.Item>
        </SubMenu>
      </Menu> */}
      {/* <CategoryList /> */}
    </>
  );
};

export default Header;
