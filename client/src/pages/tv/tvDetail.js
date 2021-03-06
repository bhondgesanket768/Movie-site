import React, { useEffect, useState } from "react"
import { API_KEY, API_URL, IMAGE_URL, YOU_TUBE } from "../../components/config";
import MainImage from "../../components/mainImage"
import { Descriptions, Avatar, Button, Row, Col, Card } from 'antd';
import GridCard from "../../components/GridCard";
import ShowFavourite from "../../components/showFavourite"
import Rate from "../../components/rate";
import Comment from "../../components/comments"
import Footer from "../../components/footer"
import axios from "axios"
import showTime from "../../assets/showtime.jpg"
import disney from "../../assets/Disney.png";

function TvDetailed(props) {

    const showId = props.match.params.showId;

    const [show, setShow] = useState([]);
    const [cast, setCast] = useState([])
    const [actorToggle, setToggle] = useState(false);
    const [trailer, setTrailer] = useState("");
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}tv/${showId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setShow(response)
                fetch(`${API_URL}tv/${showId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        setCast(response.cast);
                    })
            })

        fetch(`${API_URL}tv/${showId}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                try {
                    response.results[0] &&
                        setTrailer(response.results[0].key)
                } catch (ex) {
                    console.log(ex)
                }
            })

        axios.post("/api/comments/show/getComments", { showId })
            .then(response => {
                if (response.data.success) {
                    setCommentList(response.data.comments)
                } else {
                    alert("error in getting the comments");
                }
            })

    }, [])

    const handleToggle = () => {
        setToggle(!actorToggle)
    }

    const updateComment = (newComment) => {
        setCommentList(commentList.concat(newComment))
    }

    return (
        <div align="center">
            {show && show.genres &&
                <MainImage image={`${IMAGE_URL}w1280${show.backdrop_path}`}
                    title={show.original_title}
                    text={show.overview}
                    showinfo
                    genres={show.genres}
                />
            }
            <div style={{ width: "85%", margin: "1 rem auto", paddingTop: 32 }}>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3><a href={`${YOU_TUBE}${trailer}`} target="_blank">Watch Trailer</a></h3>
                    <ShowFavourite userFrom={localStorage.getItem("userId")} showId={showId} showName={show.name} votes={show.vote_average} />
                </div>

                <div align="center" style={{ paddingTop: 30 }}>
                    <Descriptions title="Show Info" >
                        <Descriptions.Item label="Title">{show.name}</Descriptions.Item>
                        <Descriptions.Item label="HomePage">{show.homepage}</Descriptions.Item>
                        <Descriptions.Item label="Popularity">{show.popularity}</Descriptions.Item>
                        <Descriptions.Item label="Release Date">{show.first_air_date}</Descriptions.Item>
                        <Descriptions.Item label="Seasons">{show.seasons && show.seasons.length}</Descriptions.Item>
                        <Descriptions.Item label="Vote Count">{show.vote_count}</Descriptions.Item>
                        <Descriptions.Item label="Status">{show.status}</Descriptions.Item>
                        <Descriptions.Item label="No of episodes">{show.number_of_episodes}</Descriptions.Item>
                        <Descriptions.Item label="Vote">{show.vote_average}</Descriptions.Item>
                    </Descriptions>
                </div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "32px" }}>
                    <Button onClick={handleToggle}>Show Actors</Button>
                </div>
                {actorToggle &&
                    <div style={{ paddingTop: "32px" }}>
                        <Row gutter={[16, 16]}>
                            {cast && cast.map((cast, index) => (
                                <React.Fragment key={index}>
                                    {cast.profile_path &&
                                        <GridCard actor image={`${IMAGE_URL}w500${cast.profile_path}`} name={cast.name} character={cast.character} />
                                    }
                                </React.Fragment>
                            ))}
                        </Row>
                    </div>
                }

                <div align="left" style={{ paddingBottom: 30, paddingTop: 30 }}>
                    <h3>Seasons</h3>
                    <div style={{ paddingTop: "32px" }}>
                        <Row gutter={[16, 16]}>
                            {show.seasons && show.seasons.map((season, index) => (
                                <React.Fragment key={index}>
                                    {season.poster_path &&
                                        <GridCard image={`${IMAGE_URL}w500${season.poster_path}`} name={season.name} season />
                                    }
                                </React.Fragment>
                            ))}
                        </Row>
                    </div>
                </div>
                {/*
                <div style={{ paddingTop: "32px" }}>
                    <Row>
                        <Col lg={8} md={24} sm={24} style={{ paddingRight: 16 }}>
                            <h2>Amazon Prime</h2>
                            <Card >
                                <Col lg={12} md={24} sm={24}>
                                    <div>
                                        <a target="_blank" href="https://www.primevideo.com/">
                                            <img border="0" src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=IN&ASIN=B07VCB6CRK&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=movietpoint-21" style={{ width: "100px" }} />
                                        </a>
                                        <img src="//ir-in.amazon-adsystem.com/e/ir?t=movietpoint-21&l=am2&o=31&a=B07VCB6CRK" width="1" height="1" border="0" alt="" style={{ border: "none !important; margin:0px !important;" }} />
                                    </div>
                                </Col>
                                <Col lg={12} md={24} sm={24}>
                                    <p style={{ paddingTop: 10 }}>Get 30 days Free Trial</p>
                                </Col>
                            </Card>
                        </Col>
                        <Col lg={8} md={24} sm={24} style={{ paddingRight: 16 }}>
                            <h2>ShowTime</h2>
                            <Card >
                                <a target="_blank" href="https://www.amazon.com/gp/video/offers/signup/ref=DVM_PTM_AMG_US_AC_C_ACQ_SHOMLPlink2?benefitID=showtimeSub">
                                    <img src={showTime} style={{ width: "50%", borderRadius: "50%" }} />
                                </a>
                                <p style={{ paddingTop: 10 }}>Get 7 Days free Trail</p>
                            </Card>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <h2>Disney+</h2>
                            <Card>
                                <a target="_blank" href="https://www.hotstar.com/in">
                                    <img src={disney} style={{ width: "50%", borderRadius: "50%", height: 150 }} />
                                </a>
                                <p style={{ paddingTop: 10 }}>Watch online.</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
                */}
                <div align="left" style={{ paddingBottom: 30, paddingTop: 30 }}>
                    <h3>Rate this Show</h3>
                    <Rate showId={showId} userId={localStorage.getItem("userId")} show />
                </div>

                <div align="left">
                    <Comment postId={showId} refreshFunction={updateComment} commentList={commentList} />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default TvDetailed