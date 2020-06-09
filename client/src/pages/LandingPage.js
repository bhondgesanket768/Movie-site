import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_URL } from "../components/config"
import { Typography, Row, Button, Input, Result, Spin, Select, Cascader } from "antd"
import MainImage from "../components/mainImage";
import GridCard from "../components/GridCard";
import Footer from "../components/footer"
import CarouselComponent from "../components/carousel"
import { SearchOutlined } from '@ant-design/icons';
const { Title } = Typography
const { Option } = Select;

function LandingPage() {

    const [movies, setMovies] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [val, setVal] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [latest, setLatest] = useState([]);
    const [genre, setGenre] = useState([]);
    const [sortMovies, setSortMovies] = useState([]);

    const fetchMovies = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies([...movies, ...response.results])
                setPageNumber(response.page)
            })
    }

    const fetchNowPlaying = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                setNowPlaying(response.results)
            });
    }

    const fetchUpComming = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                setUpcoming(response.results)
            })
    }

    const searchMovies = () => {
        fetch(`${API_URL}search/movie?api_key=${API_KEY}&query=${val}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                setSearchResult(response.results)
            })
    }

    const fetchLatest = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                console.log(response)
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
        fetch(`${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${value}`)
            .then(response => response.json())
            .then(response => {
                setSortMovies(response.results)
            })
    }

    useEffect(() => {
        const path = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(path);

        const nowPlaying = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        fetchNowPlaying(nowPlaying);

        const upComing = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        fetchUpComming(upComing)

        const latestMovie = `${API_URL}movie/latest?api_key=${API_KEY}&language=en-US`
        fetchLatest(latestMovie)

        const genreList = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`
        fetchGenres(genreList);

    }, [])

    const loadMore = () => {
        const path = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber + 1}`
        fetchMovies(path);
    }

    const onChange = e => {
        setVal(e.target.value);
        searchMovies();
    };

    const genreSort = (value) => {
        fetchSelectedGenres(value)
    }

    return (
        <div style={{ width: "100%", margin: 0 }}>
            {movies[0] &&
                <MainImage image={`${IMAGE_URL}w1280${movies[0].backdrop_path}`}
                    title={movies[0].original_title}
                    text={movies[0].overview}
                />
            }
            <div style={{ width: "85%", margin: "1rem auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Title level={2}>Popular Movies</Title>
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

                {val ? (
                    searchResult && searchResult.length > 0 ? (
                        <Row gutter={[16, 16]}>
                            {
                                searchResult && searchResult.map((movie, index) => (
                                    <React.Fragment key={index}>
                                        {movie.poster_path &&
                                            <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} votes={movie.vote_average} />
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
                                    subTitle={"Sorry, the movie does not exist"}
                                />
                            </div>
                        )
                ) : (
                        <div>
                            {sortMovies && sortMovies.length > 0 ? (
                                <Row gutter={[16, 16]}>
                                    {
                                        sortMovies && sortMovies.map((movie, index) => (
                                            <React.Fragment key={index}>
                                                {movie.poster_path &&
                                                    <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} votes={movie.vote_average} />
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </Row>
                            ) : (
                                    <div>
                                        <Row gutter={[16, 16]}>
                                            {
                                                movies && movies.map((movie, index) => (
                                                    <React.Fragment key={index}>
                                                        {movie.poster_path &&
                                                            <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} votes={movie.vote_average} />
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
                                )
                            }
                        </div>
                    )}

                <br />
                <div style={{ paddingTop: 50, paddingBottom: 30 }}>
                    <h3>Now Playing</h3>
                </div>
                <div>
                    <CarouselComponent data={nowPlaying} nowPlaying />
                </div>
                <div style={{ paddingTop: 50, paddingBottom: 30 }}>
                    <h3>UpComing Movies</h3>
                </div>
                <div>
                    <CarouselComponent data={upcoming} />
                </div>
            </div>
            <div style={{ paddingTop: 100 }}>
                <Footer />
            </div>
        </div >
    )
}

export default LandingPage