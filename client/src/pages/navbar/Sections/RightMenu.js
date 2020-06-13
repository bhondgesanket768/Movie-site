import React, { useState } from 'react';
import { Menu, Avatar } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import history from "../../../history"

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`/api/users/logout`).then(response => {
      if (response.status === 200) {
        history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const loginClick = () => {
    history.push("/login");
  }

  const registerClick = () => {
    history.push("/register");
  }

  const profileClick = () => {
    history.push("/profile");
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="login" onClick={loginClick}>
          <a>Signin</a>
        </Menu.Item>
        <Menu.Item key="register" onClick={registerClick}>
          <a>Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="Profile" style={{ paddingBottom: 10 }} onClick={profileClick}>
          <Avatar src={user.userData && (user.userData.image.substring(0, 4) === "http" ? user.userData.image : `http://localhost:5000/${user.userData.image}`)} alt="image"></Avatar>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);