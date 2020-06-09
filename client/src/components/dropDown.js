import React from "react"
import { Menu, Dropdown, message } from 'antd';

function dropDown() {

    const menu = (
        <Menu onClick>
            <Menu.Item key="1">1st menu item</Menu.Item>
            <Menu.Item key="2">2nd memu item</Menu.Item>
            <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
        </Dropdown>
    )
}

export default dropDown