import React, { useEffect, useState } from "react"
import { Button, Table, Popconfirm, Popover } from "antd";
import axios from "axios"
import { notify } from "../../utils";

function FavouritePage() {

    const [favouriteList, setList] = useState([]);
    const [showFavouriteList, setShowFavouriteList] = useState([]);

    const variable = {
        userFrom: localStorage.getItem("userId")
    }

    useEffect(() => {
        fetchFavouriteList();
    }, [])

    const fetchFavouriteList = () => {
        axios.post("/api/favourite/getFavourite", variable)
            .then(response => {
                if (response.data.success) {
                    setList(response.data.data)
                } else {
                    alert("error to fetch data")
                }
            })

        axios.post("/api/showFavourite/getFavourite", variable)
            .then(response => {
                if (response.data.success) {
                    setShowFavouriteList(response.data.result)
                } else {
                    alert("failed to fetch your favourite list");
                }
            })
    }

    const handleRemove = (title) => {

        const movie = favouriteList.filter(movie => movie.movieTitle === title);

        const data = {
            movieId: movie[0].movieId,
            userFrom: localStorage.getItem("userId"),
        }
        axios.post("/api/favourite/removeFromFavourite", data)
            .then(response => {
                if (response.data.success) {
                    fetchFavouriteList();
                    notify("success", "Success", "Movie removed from favourite list")
                } else {
                    notify("error", "Error", "something went wrong")
                }
            })
    }

    const showRemove = (name) => {
        const show = showFavouriteList.filter(show => show.showName === name);

        const data = {
            showId: show[0].showId,
            userFrom: localStorage.getItem("userId")
        }

        axios.post("/api/showFavourite/removeFavourite", data)
            .then(response => {
                if (response.data.success) {
                    fetchFavouriteList();
                    notify("success", "Success", "Show removed from favourite list")
                } else {
                    alert("failed to remove from favourite list")
                }
            })
    }

    const columns = [
        {
            title: 'Movie Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Movie RunTime',
            dataIndex: 'RunTime',
            key: 'RunTime',
        },
        {
            title: 'Remove from favourites',
            dataIndex: 'remove',
            key: 'remove',
            render: (_, { title }) => (
                <Popconfirm title={`This will remove movie from your favourite list. Are you sure?`} onConfirm={() => handleRemove(title)}>
                    <Button style={{ color: "red" }}>Remove</Button>
                </Popconfirm>
            )
        },
    ]

    const showColumns = [
        {
            title: 'Show Title',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Show Rating',
            dataIndex: 'votes',
            key: 'votes',
        },
        {
            title: 'Remove from favourites',
            dataIndex: 'remove',
            key: 'remove',
            render: (_, { name }) => (
                <Popconfirm title={`This will remove Show from your favourite list. Are you sure?`} onConfirm={() => showRemove(name)}>
                    <Button style={{ color: "red" }}>Remove</Button>
                </Popconfirm>
            )
        },
    ]

    const data = favouriteList.map((movie, index) => ({
        key: index,
        title: movie.movieTitle,
        RunTime: movie.movieRunTime,
    }))

    const showData = showFavouriteList.map((show, index) => ({
        key: index,
        name: show.showName,
        votes: show.vote,
    }))


    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h3>Movies Favoutite List</h3>
            <hr />
            <Table columns={columns} dataSource={data} bordered style={{ paddingTop: 32 }} />
            <h3>Show Favoutite List</h3>
            <hr />
            <Table columns={showColumns} dataSource={showData} bordered style={{ paddingTop: 32 }} />
        </div>
    )
}

export default FavouritePage