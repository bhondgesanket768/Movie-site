import React, { useEffect, useState } from "react"
import { Tooltip } from "antd"
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons';
import axios from "axios"
import { notify } from "../utils";

function LikeDislike(props) {

    const [likes, setLikes] = useState(0)
    const [dislikes, setdisLikes] = useState(0)
    const [likeAction, setLikeAction] = useState(false)
    const [dislikeAction, setdisLikeAction] = useState(false)

    const variable = {
        commentId: props.commentId,
        userId: props.userId
    }

    useEffect(() => {
        axios.post("/api/likes/getLikes", variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length)
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction(true)
                        }
                    })
                } else {
                    alert("failed to fetch likes from db")
                }
            })

        axios.post("/api/likes/getDisLikes", variable)
            .then(response => {
                if (response.data.success) {
                    setdisLikes(response.data.dislikes.length)
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setdisLikeAction(true)
                        }
                    })
                } else {
                    alert("failed to fetch dislikes from db")
                }
            })
    }, [])

    const likeUp = () => {
        axios.post("/api/likes/upLike", variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(likes + 1);
                    setLikeAction(true)
                    if (dislikeAction) {
                        setdisLikeAction(false)
                        setdisLikes(dislikes - 1)
                    }
                } else {
                    alert("failed to increase the likes")
                }
            })
            .catch(() => notify("error", "Error", "Please login to do this action"))
    }

    const unLike = () => {
        axios.post("/api/likes/unLike", variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(likes - 1);
                    setLikeAction(false)
                } else {
                    alert("failed to increase the likes")
                }
            })
            .catch(() => notify("error", "Error", "Please login to do this action"))
    }

    const dislikeUp = () => {
        axios.post("/api/likes/upDislike", variable)
            .then(response => {
                if (response.data.success) {
                    setdisLikes(dislikes + 1);
                    setdisLikeAction(true)
                    if (likeAction) {
                        setLikeAction(false)
                        setLikes(likes - 1)
                    }
                } else {
                    alert("failed to upDislike")
                }
            })
            .catch(() => notify("error", "Error", "Please login to do this action"))
    }

    const dislikeDown = () => {
        axios.post("/api/likes/unDislike", variable)
            .then(response => {
                if (response.data.success) {
                    setdisLikes(dislikes - 1);
                    setdisLikeAction(false)
                } else {
                    alert("failed to unDislike")
                }
            })
            .catch(() => notify("error", "Error", "Please login to do this action"))
    }

    return (
        <div>
            <React.Fragment>
                <span key="comment-basic-like">
                    <Tooltip title="Like">
                        {likeAction ? (<LikeFilled onClick={unLike} />) : (<LikeOutlined onClick={likeUp} />)}
                    </Tooltip>
                    <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>
                </span>
                <span key="comment-basic-dislike" style={{ paddingLeft: "8px" }}>
                    <Tooltip title="Dislike">
                        {dislikeAction ? (<DislikeFilled onClick={dislikeDown} />) : (<DislikeOutlined onClick={dislikeUp} />)}

                    </Tooltip>
                    <span style={{ paddingLeft: "8px", cursor: "auto" }}>{dislikes}</span>
                </span>
            </React.Fragment>
        </div>
    )
}

export default LikeDislike