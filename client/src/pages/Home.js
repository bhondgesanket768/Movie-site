import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import loginimage from "../assets/home.jpg"
import gradient from "../assets/gradient.jpg"
import { API_KEY, API_URL } from "../components/config"
import family from "../assets/family.jpg"
import { InfoCircleOutlined, PlayCircleOutlined, AppstoreAddOutlined, CommentOutlined } from '@ant-design/icons';
import Footer from "../components/footer"
import CarouselComponent from "../components/carousel"
import { useSelector } from "react-redux";
import history from "../history";

const { Meta } = Card;
function Home() {

    const [nowPlaying, setNowPlaying] = useState([]);
    const user = useSelector(state => state.user)

    const fetchNowPlaying = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                setNowPlaying(response.results)
            });
    }

    useEffect(() => {
        const nowPlaying = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        fetchNowPlaying(nowPlaying);
    }, [])

    const movieClick = () => {
        history.push("/movies")
    }

    const showClick = () => {
        history.push("/tvShows")
    }

    return (
        <div style={{ backgroundColor: "#F7DC6F " }}>
            <Card style={{ height: "60vh", background: `url(${loginimage})`, backgroundSize: "100%, cover", backgroundAttachment: "fixed" }}>
                <Row >
                    <Card style={{ marginTop: "30vh", marginLeft: "10%", width: "80%", minHeight: "40vh", backgroundColor: "white" }}>
                        <div align="center">
                            <h3 style={{ fontFamily: "Droid Sans", fontSize: 50 }}>Now or Never</h3>
                        </div>
                        <div align="center" style={{ fontSize: 20 }}>
                            <p> Watch latest movies and Tv show online here, Thousand of Movies and Tv show to explore. </p>
                            <p>Get information regarding movies and shows Free</p>
                        </div>

                        <div align="center" style={{ paddingTop: "20px" }}>
                            {user.userData && !user.userData.isAuth ? (
                                <div style={{ display: "flex", justifyContent: "space-between", width: "30%" }}>
                                    <Button type="primary" shape="round" size={"large"} onClick={() => history.push("/register")}>
                                        SignUp
                                      </Button>
                                    <Button type="primary" shape="round" size={"large"} onClick={() => history.push("/login")}>
                                        Login
                                      </Button>
                                </div>
                            ) : ("")}
                        </div>
                    </Card>
                </Row>
            </Card>
            <div style={{ width: "100%", margin: "1rem auto", paddingTop: "250px" }}>
                <div align="center">
                    <div style={{ width: "80%", minHeight: "40vh" }}>
                        <Row >
                            <Col span={12}>
                                <img src={family} style={{ width: "80%", borderRadius: "50%" }} />
                            </Col>
                            <Col span={12}>
                                <h2 style={{ fontSize: "30px", paddingBottom: "20px" }}>Our Features</h2>
                                <p style={{ fontSize: "20px", marginBottom: "50px" }}><InfoCircleOutlined size="large" style={{ color: "green", paddingRight: 8 }} />Get All the necessary information about Movies and Tv Shows</p>
                                <p style={{ fontSize: "20px", marginBottom: "50px" }}><PlayCircleOutlined size="large" style={{ color: "green", paddingRight: 8 }} />Watch Latest Movies and Tv shows Online</p>
                                <p style={{ fontSize: "20px", marginBottom: "50px" }}><AppstoreAddOutlined size="large" style={{ color: "green", paddingRight: 8 }} />Add movies and Tv shows to your favourite List</p>
                                <p style={{ fontSize: "20px", marginBottom: "50px" }}><CommentOutlined size="large" style={{ color: "green", paddingRight: 8 }} />Rate and Comments feature</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div align="center" style={{ width: "85%", margin: "1rem auto" }}>
                <Row>
                    <Col span={12}>
                        <Link to={`/movies`}>
                            <Card
                                hoverable
                                style={{ width: "90%", height: "150px", background: `url(${gradient})`, backgroundSize: "100%, cover" }}
                                cover
                                onClick
                            >
                                <Meta title="Get Movies List" description={<b>Watch Latest Movies Online</b>} />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={12}>
                        <Card
                            hoverable
                            style={{ width: "90%", height: "150px", background: `url(${gradient})`, backgroundSize: "100%, cover" }}
                            cover
                            onClick={showClick}
                        >
                            <Meta title="Get Tv Shows List" description={<b>Watch Tv shows online</b>} />
                        </Card>
                    </Col>
                </Row>

                <div style={{ paddingTop: 50 }}>
                    <h3>Now Playing</h3>
                </div>

                <div style={{ paddingTop: 32 }}>
                    <CarouselComponent data={nowPlaying} nowPlaying />
                </div>

                <div style={{ paddingTop: 32 }}>
                    <a href="https://hostgator-india.sjv.io/c/2353394/424204/7275" id="424204">
                        <img src={"//a.impactradius-go.com/display-ad/7275-424204"} border="0" alt="" width="468" height="60" />
                    </a>
                    <img src={"//hostgator-india.sjv.io/i/2353394/424204/7275"} style={{ height: "0", width: "0", style: "position:absolute;visibility:hidden;", border: "0" }} />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Home