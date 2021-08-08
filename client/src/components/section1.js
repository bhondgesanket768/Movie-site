import React from 'react';
import { Button } from 'antd';
import "./section1.css";
import clip from "../assets/cinema.mp4"
import history from "../history"

function Section1({user}) {
    return (
        <div className="section1-container">
            <video src={clip} autoPlay loop muted />
            <h1>ADVENTURE AWAITS</h1>
            <p>Now or Never</p>
            <p>Thousands of Movies and Tv shows to explore.</p>
            {user.userData && !user.userData.isAuth ? (
                <div className="section1-btn" style={{ display: "flex", justifyContent: "space-between", width: "15%" }}>
                    <Button type="primary" shape="round" size={"large"} onClick={() => history.push("/register")}>
                        SignUp
                    </Button>
                    <Button type="primary" shape="round" size={"large"} onClick={() => history.push("/login")}>
                        Login
                    </Button>
                </div>
            ) : ("")}
        </div>
    );
}

export default Section1;