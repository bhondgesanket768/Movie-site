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
                <div style={{ display: "inline" }}>
                    <div style={{ justifyContent: "space-around", display: "flex" }}>
                        <iframe style={{ width: "120px", height: "240px" }} marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ac&ref=tf_til&ad_type=product_link&tracking_id=jonty06-21&marketplace=amazon&amp;region=IN&placement=B006QRQRLC&asins=B006QRQRLC&linkId=0900f84d325ae0182d44cd86f42ce674&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                        </iframe>
                        <iframe style={{ width: "120px", height: "240px" }} marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=jonty06-21&marketplace=amazon&amp;region=IN&placement=B09CV4YHTK&asins=B09CV4YHTK&linkId=0808cbf690e4b77c7e33254d1ccb296a&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                        </iframe>
                        <iframe style={{ width: "120px", height: "240px" }} marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=jonty06-21&language=en_IN&marketplace=amazon&region=IN&placement=B0168AZH4E&asins=B0168AZH4E&linkId=e45b4505fe5c6da5c3e1166da1eab6a0&show_border=true&link_opens_in_new_window=true"></iframe>
                        <iframe style={{ width: "120px", height: "240px" }} marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=jonty06-21&language=en_IN&marketplace=amazon&region=IN&placement=B00XCD59YE&asins=B00XCD59YE&linkId=f87ff89cd04ef56a6a2c0079df3de6dd&show_border=true&link_opens_in_new_window=true"></iframe>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: 100 }}>
                <Footer />
            </div>
        </div >
    )
}

export default LandingPage