import React from "react"
import { Carousel, Row } from 'antd';
import { API_KEY, API_URL, IMAGE_URL } from "./config"
import GridCard from "./GridCard";

function CarouselComponent(props) {
    return (
        <div>
            <Carousel autoplay style={{ width: "100%", paddingBottom: 20 }}>
                <div>
                    <Row gutter={16}>
                        {props.data && props.data.slice(0, 4).map((movie, index) => (
                            <React.Fragment key={index}>
                                {props.nowPlaying || props.topRated || props.airingToday || props.onAir ? (
                                    movie.poster_path &&
                                    <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} votes={movie.vote_average} tv={props.tv} showId={movie.id} />

                                ) : (
                                        movie.poster_path &&
                                        <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} releaseDate={movie.release_date} />

                                    )}
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
                <div>
                    <Row gutter={16}>
                        {props.data && props.data.slice(4, 8).map((movie, index) => (
                            <React.Fragment key={index}>
                                {props.nowPlaying || props.topRated || props.airingToday || props.onAir ? (
                                    movie.poster_path &&
                                    <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} votes={movie.vote_average} tv={props.tv} showId={movie.id} />

                                ) : (
                                        movie.poster_path &&
                                        <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} releaseDate={movie.release_date} />

                                    )}
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
                <div>
                    <Row gutter={16}>
                        {props.data && props.data.slice(8, 12).map((movie, index) => (
                            <React.Fragment key={index}>
                                {props.nowPlaying || props.topRated || props.airingToday || props.onAir ? (
                                    movie.poster_path &&
                                    <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} votes={movie.vote_average} tv={props.tv} showId={movie.id} />

                                ) : (
                                        movie.poster_path &&
                                        <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} releaseDate={movie.release_date} />

                                    )}
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
                <div>
                    <Row gutter={16}>
                        {props.data && props.data.slice(12, 16).map((movie, index) => (
                            <React.Fragment key={index}>
                                {props.nowPlaying || props.topRated || props.airingToday || props.onAir ? (
                                    movie.poster_path &&
                                    <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} votes={movie.vote_average} tv={props.tv} showId={movie.id} />

                                ) : (
                                        movie.poster_path &&
                                        <GridCard image={`${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id} releaseDate={movie.release_date} />

                                    )}
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
            </Carousel>,
            </div>
    )
}

export default CarouselComponent