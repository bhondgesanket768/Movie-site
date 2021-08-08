import React from 'react'
import "./cards.css";
import CardItem from "./CardsItems"
import movies from "../assets/movies.jpg"
import tvShows from "../assets/tvshows.jpg"
import rating from "../assets/rating.jpg"
import information from "../assets/information.jpg"
import favouriteList from "../assets/favourite_list.png"

function Cards() {
    return (
        <div className="cards">
            <h1>Our Services</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src={movies}
                            text='Explore All the latest movies and reviews here'
                            label='Movies'
                            path='/movies'
                            redirect={true}
                        />
                        <CardItem
                            src={tvShows}
                            text='Explore All the latest TV Shows on air here'
                            label='TV Shows'
                            path='/tvShows'
                            redirect={true}
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem
                            src={information}
                            text='Get information reading Movies'
                            label='Information'
                            path=''
                            redirect={false}
                        />
                        <CardItem
                            src={favouriteList}
                            text='Add movies and Shows to your favourite List'
                            label='Favourite List'
                            path=''
                            redirect={false}
                        />
                        <CardItem
                            src={rating}
                            text='Rate your Favourite movies'
                            label='Rating'
                            //path='/'
                            redirect={false}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards