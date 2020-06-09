import React, { useState } from 'react';
import { Menu } from 'antd';
import { notify } from "../../../utils";
import history from "../../../history";
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {

  const user = useSelector(state => state.user)

  const handleClick = () => {
    if (user.userData && user.userData.isAuth) {
      history.push("/favourite")
    } else {
      notify("error", "Error", "Please log in to see the favourite list..")
    }
  }

  const onClick = (e) => {
    history.push("/movies");
  }

  const homeClick = (e) => {
    history.push("/");
  }

  const showClick = (e) => {
    history.push("/tvShows");
  }

  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home" onClick={homeClick}>
        <a>Home</a>
      </Menu.Item>
      <Menu.Item key="movies" onClick={onClick} >
        <a>Movies</a>
      </Menu.Item>
      <Menu.Item key="tv" onClick={showClick} >
        <a>Tv Shows</a>
      </Menu.Item>
      <SubMenu title={<span>More</span>} >
        <MenuItemGroup title="Others">
          <Menu.Item key="favourite" onClick={handleClick}>Favoutite List</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  )
}

export default LeftMenu