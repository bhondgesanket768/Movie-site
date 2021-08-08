import React, { useState, useEffect } from "react"
import { Col, Card } from "antd"
import { HeartFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom';
const { Meta } = Card;


function GridCard(props) {

    if (props.actor) {
        return (
            <Col lg={6} md={8} sm={24}>
                <div style={{ position: "relative" }}>
                    <Card
                        hoverable
                        bordered
                        style={{ width: "100%"}}
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
                    <Link to={props.tv ? `/tvShows/${props.showId}` : `/movie/${props.movieId}`}>
                        <Card
                            hoverable
                            style={{ width: "100%" }}
                            cover={<img alt="img" src={props.image} />}
                            onClick
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
                    </Link>
                </div>
            </Col>
        )
    }
}

export default GridCard