import React from "react"
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import history from "../history";

function Footer() {
    return (
        <div style={{ width: "100%", backgroundColor: "grey" }}>
            <div style={{ paddingTop: 10, width: "100%", paddingBottom: 10 }}>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "20%", padding: 20 }}>
                        <h3 style={{ color: "white" }} onClick={() => history.push("/movies")} >Movies</h3>
                    </div>
                    <div style={{ width: "20%", padding: 20, borderLeft: "2px solid black" }}>
                        <h3 style={{ color: "white" }} onClick={() => history.push("/tvShows")} >Tv shows</h3>
                    </div>
                    <div style={{ width: "20%", padding: 20, borderLeft: "2px solid black" }}>
                        <h3 style={{ color: "white" }} onClick={() => history.push("/favourite")}>favourite List</h3>
                    </div>
                    <div style={{ width: "20%", padding: 20, borderLeft: "2px solid black" }}>
                        <div align="center">
                            <h3> &copy; Copyright 2020. All Rights Reserved</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer