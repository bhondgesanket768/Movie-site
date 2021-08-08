import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import loginimage from "../assets/home.jpg"
import { API_KEY, API_URL } from "../components/config"
import Footer from "../components/footer"
import CarouselComponent from "../components/carousel"
import { useSelector } from "react-redux";
import history from "../history";
import Section1 from "../components/section1";
import Cards from "../components/cards";

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

    return (
        <>
        <Section1 user={user} />
        <div style={{backgroundColor:"white" ,width: "100%", margin: 0 }}>
            <Cards/>
            <div align="center" style={{ width: "85%", margin: "0.5rem auto" }}>
                    <h1>Now Playing</h1>
                <div style={{ paddingTop: 32 }}>
                    <CarouselComponent data={nowPlaying} nowPlaying />
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}

export default Home