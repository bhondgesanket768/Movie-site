import React, { useState, useEffect } from "react"
import SingleComment from "./singleComment"

function ReplayComment(props) {

    const [replayComment, setReplayComment] = useState(0);
    const [openReplay, setOpenReplay] = useState(false)

    useEffect(() => {
        let countVal = 0;
        props.commentList.map((comment) => {
            if (comment.responseTo === props.parentComponentId) {
                countVal++;
            }
        })
        setReplayComment(countVal);
    }, [props.commentList, props.parentComponentId])


    const handleClick = () => {
        setOpenReplay(!openReplay)
    }

    return (
        <div>
            {replayComment > 0 &&
                <p style={{ fontSize: "14px", margin: 0, color: "grey" }} onClick={handleClick}>
                    View {replayComment} more comment(s)
             </p>
            }

            {openReplay && props.commentList && props.commentList.map((comment, index) => (
                <React.Fragment key={index}>
                    {comment.responseTo === props.parentComponentId &&
                        < div style={{ marginLeft: "50px", width: "80%" }}>
                            <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                            <ReplayComment commentList={props.commentList} postId={props.postId} refreshFunction={props.refreshFunction} parentComponentId={comment._id} />
                        </div>
                    }
                </React.Fragment>
            ))
            }
        </div >
    )
}

export default ReplayComment