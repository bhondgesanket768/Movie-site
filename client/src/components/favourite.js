import React, { useEffect, useState } from "react"
import { Button } from 'antd';
import { notify } from "../utils";
import axios from "axios"

function Favourite(props) {

    const [favouriteNo, setFavouriteNO] = useState(0);
    const [favourite, setFavourite] = useState(false);

    const data = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movie.original_title,
        movieImage: props.movie.backdrop_path,
        movieRunTime: props.movie.runtime
    }

    useEffect(() => {

        axios.post("/api/favourite/number", data)
            .then(response => {
                if (response.data.success) {
                    setFavouriteNO(response.data.FavouriteNumber)
                } else {
                    notify("error", "Error", "Failed to fetch favourite numbers")
                }
            })


        axios.post("/api/favourite/favourited", data)
            .then(response => {
                if (response.data.success) {
                    setFavourite(response.data.favourited)
                } else {
                    notify("error", "Error", "Failed to fetch your favourite")
                }
            })
    }, [])

    const handleSubmit = () => {
        if (favourite) {
            axios.post("/api/favourite/removeFromFavourite", data)
                .then(response => {
                    if (response.data.success) {
                        setFavouriteNO(favouriteNo - 1);
                        setFavourite(!favourite)
                    } else {
                        notify("error", "Error", "something went wrong")
                    }
                })

        } else {
            axios.post("/api/favourite/addToFavourite", data)
                .then(response => {
                    if (response.data.success) {
                        setFavouriteNO(favouriteNo + 1);
                        setFavourite(!favourite)
                    } else {
                        notify("error", "Error", "something went wrong")
                    }
                })
                .catch(() => notify("error", "Error", "Please log in to add this movie to your favourites "))
        }
    }

    return (
        <div>
            <Button onClick={handleSubmit}>{favourite ? "Remove from Favourite" : "Add to favourite"} - {favouriteNo} </Button>
        </div>
    )
}

export default Favourite;