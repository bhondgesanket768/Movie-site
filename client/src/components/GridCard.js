import React, { useState, useEffect } from "react"
import { Col, Card } from "antd"
import { HeartFilled } from '@ant-design/icons'
import history from "../history";
const { Meta } = Card;


function GridCard(props) {


    const handleClick = () => {
        if (props.tv) {
            history.push(`/tvShows/${props.showId}`)
        } else {
            history.push(`/movie/${props.movieId}`)
        }
    }

    if (props.actor) {
        return (
            <Col lg={6} md={8} sm={24}>
                <div style={{ position: "relative" }}>
                    <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<img alt="img" src={props.image} />}
                    >
                        <Meta title={props.name} description={`Character : ${props.character}`} />
                    </Card>
                </div>
            </Col>
        )

    } else if (props.season) {
        return (
            <Col lg={6} md={8} sm={24}>
                <div style={{ position: "relative" }}>
                    <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<img alt="img" src={props.image} />}
                    >
                        <Meta title={props.name} />
                    </Card>
                </div>
            </Col>
        )
    }
    else {
        return (
            <Col lg={6} md={8} sm={24}>
                <div style={{ position: "relative" }}>
                    <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<img alt="img" src={props.image} />}
                        onClick={handleClick}
                    >
                        <div style={{ display: "flex" }}>
                            {props.votes ? (
                                <div style={{ display: "flex" }}>
                                    <HeartFilled style={{ fontSize: "30px", color: "red", paddingRight: "16px" }} />
                                    <h3>{props.votes}</h3>
                                </div>
                            ) : (<div>
                                <h3>Release Date</h3>
                                <h3>{props.releaseDate}</h3>
                            </div>)}
                        </div>
                    </Card>
                </div>
            </Col>
        )
    }
}

export default GridCard