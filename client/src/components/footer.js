import React from "react"
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import history from "../history";

function Footer() {
    return (
        <div style={{ width: "100%", backgroundColor: "grey" }}>
            <div style={{ paddingTop: 50, width: "100%" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "33.33%", padding: 20 }}>
                        <h1 style={{ color: "white" }}>Address</h1>
                        <h3 style={{ color: "white" }}>Nagpur</h3>
                    </div>
                    <div style={{ width: "33.33%", padding: 20, borderLeft: "2px solid black" }}>
                        <h1 style={{ color: "white" }}>Explore</h1>
                        <h3 style={{ color: "white" }} onClick={() => history.push("/movies")} >Movies</h3>
                        <h3 style={{ color: "white" }} onClick={() => history.push("/tvShows")} >Tv shows</h3>
                        <h3 style={{ color: "white" }} onClick={() => history.push("/favourite")}>favourite List</h3>
                    </div>
                    <div style={{ width: "33.33%", padding: 20, borderLeft: "2px solid black" }}>
                        <h1 style={{ color: "white" }}>Follow us</h1>
                        <TwitterOutlined style={{ fontSize: "32px", color: "light-blue" }} />
                        <FacebookOutlined style={{ fontSize: "32px", paddingLeft: "32px" }} />
                        <InstagramOutlined style={{ fontSize: "32px", paddingLeft: "32px" }} />
                        <div style={{ paddingTop: 20, display: "flex" }}>
                            <MailOutlined style={{ fontSize: "32px" }} />
                            <h3 style={{ paddingLeft: "32px" }}>movic.01@gmail.com</h3>
                        </div>
                        <div style={{ paddingTop: 20, display: "flex" }}>
                            <PhoneOutlined style={{ fontSize: "32px" }} />
                            <h3 style={{ paddingLeft: "32px" }}>9998886660</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div align="center">
                <h3> &copy; Copyright. All Rights Reserved</h3>
            </div>
        </div>
    )
}

export default Footer