import React, { useEffect, useState } from "react"
import { API_KEY, API_URL, IMAGE_URL, YOU_TUBE } from "../../components/config";
import MainImage from "../../components/mainImage"
import { Descriptions, Avatar, Button, Row, Col, Card } from 'antd';
import { PlaySquareFilled } from "@ant-design/icons"
import GridCard from "../../components/GridCard";
import Favourite from "../../components/favourite"
import Comment from "../../components/comments"
import Footer from "../../components/footer"
import Rate from "../../components/rate"
import axios from "axios";
import showTime from "../../assets/showtime.jpg"

function MovieDetail(props) {

    const [movie, setMovie] = useState([]);
    const [casts, setCast] = useState([]);
    const [actorToggle, setToggle] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [trailer, setTrailer] = useState("");

    const variable = {
        movieId: props.match.params.movieId
    }

    useEffect(() => {
        fetch(`${API_URL}movie/${props.match.params.movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
                fetch(`${API_URL}movie/${props.match.params.movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        setCast(response.cast);
                    })

            })

        fetch(`${API_URL}movie/${props.match.params.movieId}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                try {
                    response.results &&
                        setTrailer(response.results[0].key)
                } catch (ex) {
                    console.log(ex)
                }

            })

        axios.post("/api/comments/getComments", variable)
            .then(response => {
                if (response.data.success) {
                    setCommentList(response.data.comments)
                } else {
                    alert("error");
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
            <div>
                {movie && movie.genres &&
                    <MainImage image={`${IMAGE_URL}w1280${movie.backdrop_path}`}
                        title={movie.original_title}
                        text={movie.overview}
                        movieinfo
                        genres={movie.genres}
                    />
                }
            </div>
            <div style={{ width: "85%", margin: "1 rem auto", paddingTop: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3><a href={`${YOU_TUBE}${trailer}`} target="_blank">Watch Trailer</a></h3>
                    <Favourite movie={movie} userFrom={localStorage.getItem("userId")} movieId={props.match.params.movieId} />
                </div>


                <div align="center" style={{ paddingTop: 30 }}>
                    <Descriptions title="Movie Info" >
                        <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
                        <Descriptions.Item label="Budget">{movie.budget}</Descriptions.Item>
                        <Descriptions.Item label="Popularity">{movie.popularity}</Descriptions.Item>
                        <Descriptions.Item label="Release Date">{movie.release_date}</Descriptions.Item>
                        <Descriptions.Item label="Revenue">{movie.revenue}</Descriptions.Item>
                        <Descriptions.Item label="Runtime">{movie.runtime}</Descriptions.Item>
                        <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
                        <Descriptions.Item label="Tagline">{movie.tagline}</Descriptions.Item>
                        <Descriptions.Item label="Vote">{movie.vote_average}</Descriptions.Item>
                    </Descriptions>
                </div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "32px" }}>
                    <Button onClick={handleToggle}>Show Actors</Button>
                </div>

                {actorToggle &&
                    <div style={{ paddingTop: "32px" }}>
                        <Row gutter={[16, 16]}>
                            {casts && casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    {cast.profile_path &&
                                        <GridCard actor image={`${IMAGE_URL}w500${cast.profile_path}`} name={cast.name} character={cast.character} />
                                    }
                                </React.Fragment>
                            ))}
                        </Row>
                    </div>
                }

                <div style={{ paddingTop: "32px" }}>
                    <Row>
                        <Col lg={8} md={24} sm={24} style={{ paddingRight: 16 }}>
                            <h2>amazon prime</h2>
                            <Card >
                                <Col lg={12} md={24} sm={24}>
                                    <div>
                                        <a target="_blank" href="https://www.amazon.in/gp/product/B07VCB6CRK/ref=as_li_tl?ie=UTF8&camp=3638&creative=24630&creativeASIN=B07VCB6CRK&linkCode=as2&tag=movietpoint-21&linkId=0965907c3d9f41cc97ec7ca58ae45ae5">
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
                            <Card >
                                <p>Coming Soon..</p>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div align="left" style={{ paddingBottom: 30, paddingTop: 30 }}>
                    <h3>Rate this Movie</h3>
                    <Rate movieId={props.match.params.movieId} userId={localStorage.getItem("userId")} />
                </div>

                <div align="left">
                    <Comment postId={props.match.params.movieId} refreshFunction={updateComment} commentList={commentList} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MovieDetail;