import React, { useState, useEffect } from "react"
import { Button } from 'antd';
import { notify } from "../utils"
import axios from "axios"

function ShowFavourite(props) {

    const [favouriteNo, setFavouriteNo] = useState(0);
    const [favourite, setFavourite] = useState(false);

    const data = {
        userFrom: props.userFrom,
        showId: props.showId,
        showName: props.showName,
        vote: props.votes
    }

    useEffect(() => {
        axios.post("/api/showFavourite/number", data)
            .then(response => {
                if (response.data.success) {
                    setFavouriteNo(response.data.number)
                } else {
                    alert("failed to fetch number from server");
                }
            })

        axios.post("/api/showFavourite/favourited", data)
            .then(response => {
                if (response.data.success) {
                    setFavourite(response.data.favourited)
                } else {
                    alert("failed to fetch favourited value")
                }
            })

    }, [])

    const handleClick = () => {
        if (favourite) {
            axios.post("/api/showFavourite/removeFavourite", data)
                .then(response => {
                    if (response.data.success) {
                        setFavouriteNo(favouriteNo - 1);
                        setFavourite(false)
                        notify("success", "Success", "Show removed from favourite list")
                    } else {
                        alert("failed to remove from favourite list")
                    }
                })
        } else {
            axios.post("/api/showFavourite/addFavourite", data)
                .then(response => {
                    if (response.data.success) {
                        setFavouriteNo(favouriteNo + 1);
                        setFavourite(true)
                        notify("success", "Success", "Show Added to favourite list")
                    } else {
                        alert("failed to add to favourite list")
                    }
                })
                .catch(() => notify("error", "Error", "Please login to add this to favourite list"))
        }
    }

    return (
        <div>
            <Button onClick={handleClick}>{favourite ? "Remove from Favourite" : "Add to favourite"} - {favouriteNo} </Button>
        </div>
    )
}

export default ShowFavourite