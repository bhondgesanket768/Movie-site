import React, { useState, useEffect } from "react"
import { Rate } from 'antd';
import { notify } from "../utils"
import axios from "axios"

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

function RateMovie(props) {

    const [value, setValue] = useState(0);

    let variable;

    if (props.show) {
        const data = {
            userId: props.userId,
            showId: props.showId
        }
        variable = data
    } else {
        const data = {
            userId: props.userId,
            movieId: props.movieId
        }
        variable = data;
    }

    useEffect(() => {
        if (props.show) {
            axios.post("/api/showRating/getRating", variable)
                .then(response => {
                    if (response.data.success) {
                        setValue(response.data.rating.rating)
                    } else {
                        alert("failed to fetch rating")
                    }
                })
        } else {
            axios.post("/api/rating/getRating", variable)
                .then(response => {
                    if (response.data.success) {
                        setValue(response.data.rating.rating)
                    } else {
                        alert("failed to fetch rating")
                    }
                })
        }
    }, [])

    const handleChange = (value) => {

        if (props.show) {
            const upDate = {
                userId: props.userId,
                showId: props.showId,
                rating: value
            }
            axios.post("/api/showRating/upDateRating", upDate)
                .then(response => {
                    if (response.data.success) {
                        setValue(response.data.rating.rating);
                        notify("success", "Success", "Your rating recorded Successfully")
                    } else {
                        alert("failed to update your rating")
                    }
                })
                .catch(() => notify("error", "Error", "Please log in to rate this Show"))
        } else {
            const upDate = {
                userId: props.userId,
                movieId: props.movieId,
                rating: value
            }
            axios.post("/api/rating/upDateRating", upDate)
                .then(response => {
                    if (response.data.success) {
                        setValue(response.data.rating.rating);
                        notify("success", "Success", "Your rating recorded Successfully")
                    } else {
                        alert("failed to update your rating")
                    }
                })
                .catch(() => notify("error", "Error", "Please log in to rate this movie"))
        }

    }

    return (
        <div>
            <span>
                <Rate tooltips={desc} onChange={handleChange} value={value} />
                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
            </span>
        </div>
    )
}

export default RateMovie