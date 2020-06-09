import React from "react"
import { Typography, Row, Button, Card } from "antd"
const { Title } = Typography

function MainImage(props) {

    if (props.movieinfo || props.showinfo) {
        return (
            <div style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0)
                        39%,rgba(0,0,0,0)
                        41%,rgba(0,0,0,0.65)
                        100%
                    ),
                    url("${props.image}"),#1c1c1c`,
                height: "500px",
                backgroundSize: "100%, cover",
                backgroundPosition: "center,center",
                width: "100%",
                position: "relative"
            }}>
                <div style={{ paddingLeft: 20 }}>
                    <div style={{
                        position: "absolute",
                        maxWidth: "500px", bottom: "2rem", marginheight: "2rem"
                    }}>
                        <Title style={{ color: "white" }} level={2}>{props.title}</Title>
                        <p style={{ color: "white", fontSize: "1rem" }}>{props.text}</p>
                    </div>
                </div>
                <div style={{ paddingRight: 20,paddingTop:400 }} align="right">
                    {props.genres.map((genre, index) => (
                        <div style={{ color: "white", paddingRight: 20 }} key={index}>
                            <p>{genre.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        )

    } else {
        return (
            <div style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0)
                        39%,rgba(0,0,0,0)
                        41%,rgba(0,0,0,0.65)
                        100%
                    ),
                    url("${props.image}"),#1c1c1c`,
                height: "500px",
                backgroundSize: "100%, cover",
                backgroundPosition: "center,center",
                width: "100%",
                position: "relative"
            }}>
                <div style={{ paddingLeft: 20 }}>
                    <div style={{
                        position: "absolute",
                        maxWidth: "500px", bottom: "2rem", marginheight: "2rem"
                    }}>
                        <Title style={{ color: "white" }} level={2}>{props.title}</Title>
                        <p style={{ color: "white", fontSize: "1rem" }}>{props.text}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainImage;