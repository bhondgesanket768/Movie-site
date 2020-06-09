import React, { useEffect, useState } from "react"
import { API_KEY, API_URL, IMAGE_URL } from "../../components/config"
import MainImage from "../../components/mainImage";
import { Typography, Row, Button, Input, Result, Spin, Select, Cascader } from "antd"
import GridCard from "../../components/GridCard";
import CarouselComponent from "../../components/carousel"
import { SearchOutlined } from '@ant-design/icons';
import Footer from "../../components/footer"
const { Title } = Typography
const { Option } = Select;

function TvShows() {

    const [tvShows, setTvShows] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [topRated, setTopRated] = useState([]);
    const [airingToday, setAiringToday] = useState([]);
    const [onAir, setOnAir] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [genre, setGenre] = useState([]);
    const [sortShows, setSortShows] = useState([]);

    const fetchShows = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                console.log(response.results)
                setTvShows([...tvShows, ...response.results]);
                setPageNumber(response.page)
            })
    }

    const fetchTopRated = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                setTopRated(response.results)
            })
    }

    const fetchAiringToday = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                setAiringToday(response.results)
            })
    }

    const fetchOnAir = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                setOnAir(response.results)
            })
    }

    const searchShows = () => {
        fetch(`${API_URL}search/tv?api_key=${API_KEY}&query=${searchName}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                setSearchResult(response.results)
            })
    }

    const fetchGenres = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                setGenre(response.genres)
            })
    }

    const fetchSelectedGenres = (value) => {
        fetch(`${API_URL}discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${value}`)
            .then(response => response.json())
            .then(response => {
                setSortShows(response.results)
            })
    }

    useEffect(() => {
        const path = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchShows(path);

        const topRated = `${API_URL}tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        fetchTopRated(topRated)

        const airingToday = `${API_URL}tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
        fetchAiringToday(airingToday)

        const onAir = `${API_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
        fetchOnAir(onAir)

        const genreList = `${API_URL}genre/tv/list?api_key=${API_KEY}&language=en-US`
        fetchGenres(genreList);


    }, [])

    const loadMore = () => {
        const path = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber + 1}`
        fetchShows(path);
    }

    const onChange = e => {
        setSearchName(e.target.value);
        searchShows();
    }

    const genreSort = (value) => {
        fetchSelectedGenres(value)
    }

    return (
        <div style={{ width: "100%", margin: 0 }}>
            {tvShows[0] &&
                <MainImage image={`${IMAGE_URL}w1280${tvShows[0].backdrop_path}`}
                    title={tvShows[0].original_title}
                    text={tvShows[0].overview}
                />
            }
            <div style={{ width: "85%", margin: "1rem auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Title level={2}>Popular Shows</Title>
                    <div align="right" style={{ width: "60%", paddingRight: 30 }}>
                        <Input.Group>
                            <Select onChange={genreSort} style={{ width: '30%' }} placeholder="sort by genre" align="left">
                                <Option value="All">All</Option>
                                {genre.map((genre, index) => (
                                    <Option key={index} value={genre.id}>{genre.name}</Option>
                                ))}
                            </Select>
                        </Input.Group>
                    </div>
                    <Input style={{ width: "20%" }} placeholder="Search by Name" suffix={<SearchOutlined />} onChange={onChange} />
                </div>
                <hr />
                {searchName ? (
                    searchResult && searchResult.length > 0 ? (
                        <Row gutter={[16, 16]}>
                            {
                                searchResult && searchResult.map((show, index) => (
                                    <React.Fragment key={index}>
                                        {show.poster_path &&
                                            <GridCard image={`${IMAGE_URL}w500${show.poster_path}`} showId={show.id} votes={show.vote_average} tv />
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </Row>
                    ) : (
                            <div align="center">
                                <Result
                                    status="404"
                                    title="404"
                                    subTitle={"Sorry, Show does not exist"}
                                />
                            </div>
                        )
                ) : (
                        <div>
                            {sortShows && sortShows.length > 0 ? (
                                <Row gutter={[16, 16]}>
                                    {
                                        sortShows && sortShows.map((show, index) => (
                                            <React.Fragment key={index}>
                                                {show.poster_path && show.id &&
                                                    <GridCard image={`${IMAGE_URL}w500${show.poster_path}`} showId={show.id} votes={show.vote_average} tv />
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </Row>
                            ) : (
                                    <div>
                                        <Row gutter={[16, 16]}>
                                            {
                                                tvShows && tvShows.map((show, index) => (
                                                    <React.Fragment key={index}>
                                                        {show.poster_path &&
                                                            <GridCard image={`${IMAGE_URL}w500${show.poster_path}`} showId={show.id} votes={show.vote_average} tv />
                                                        }
                                                    </React.Fragment>
                                                ))
                                            }
                                        </Row>
                                        <br />
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <Button onClick={loadMore}>Load more</Button>
                                        </div>
                                    </div>
                                )}
                        </div>
                    )}
                <br />
                <div style={{ paddingTop: 50, paddingBottom: 30 }}>
                    <h3>Top Rated</h3>
                </div>
                <div>
                    <CarouselComponent data={topRated} topRated tv />
                </div>
                <div style={{ paddingTop: 50, paddingBottom: 30 }}>
                    <h3>Airing Today</h3>
                </div>
                <div>
                    <CarouselComponent data={airingToday} airingToday tv />
                </div>
                <div style={{ paddingTop: 50, paddingBottom: 30 }}>
                    <h3>Tv on the Air</h3>
                </div>
                <div>
                    <CarouselComponent data={onAir} onAir tv />
                </div>
            </div>
            <div style={{ paddingTop: 100 }}>
                <Footer />
            </div>
        </div>
    )
}

export default TvShows