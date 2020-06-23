import React, { useState } from "react"
import { Comment, Avatar, Button, Input, Form } from "antd"
import { useSelector } from "react-redux";
import { notify } from "../utils"
import LikeDislike from "../components/likeDislike"
import axios from "axios"

function SingleComment(props) {

    const user = useSelector(state => state.user)
    const [form] = Form.useForm()

    const [OpenReply, setOpenReply] = useState(false);

    const handleSubmit = (values) => {

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: values.comment
        }

        axios.post("/api/comments/saveComment", variables)
            .then(response => {
                if (response.data.success) {
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    notify("error", "Error", "something went wrong")
                }
            })
            .catch(() => notify("error", "Error", "please login before comment"))

        form.resetFields()
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const action = [
        <LikeDislike commentId={props.comment._id} userId={localStorage.getItem("userId")} />,
        <span onClick={openReply} key="comment-basic-reply-to" style={{ paddingLeft: "8px" }} >Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={action}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            />

            {OpenReply &&
                <Form layout="vertical" form={form} onFinish={handleSubmit} style={{ display: "flex" }}>
                    <Form.Item name="comment" label="comment" style={{ width: "100%", borderRadius: "5px" }}>
                        <Input.TextArea placeholder="Write some comments" />
                    </Form.Item>
                    <Form.Item style={{ width: "30%", height: "52px", paddingTop: 30 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                     </Button>
                    </Form.Item>
                </Form>
            }
        </div>
    )
}

export default SingleComment