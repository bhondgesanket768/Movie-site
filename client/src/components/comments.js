import React, { useEffect, useState } from "react"
import { Form, Input, InputNumber, Button } from 'antd';
import { useSelector } from "react-redux";
import axios from "axios";
import SingleComment from "./singleComment"
import ReplayComment from "./replayComment"
import { notify } from "../utils"

function Comment(props) {

    const user = useSelector(state => state.user)

    const [form] = Form.useForm()

    const handleSubmit = (values) => {
        const data = {
            content: values.comment,
            writer: user.userData._id,
            postId: props.postId
        }

        axios.post("/api/comments/saveComment", data)
            .then(response => {
                if (response.data.success) {
                    props.refreshFunction(response.data.result)
                } else {
                    notify("error", "Error", "Failed to save the comment")
                }
            })
            .catch(() => notify("error", "Error", "please login before comment"))
        form.resetFields()
    }

    return (
        <div>
            <h3>Add your reviews</h3>

            {props.commentList && props.commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplayComment commentList={props.commentList} postId={props.postId} refreshFunction={props.refreshFunction} parentComponentId={comment._id} />
                    </React.Fragment>
                )
            ))}

            <Form layout="vertical" form={form} onFinish={handleSubmit} style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Item name="comment" label="comment" style={{ width: "65%", borderRadius: "5px" }}>
                    <Input.TextArea placeholder="Write some comments" />
                </Form.Item>
                <Form.Item style={{ width: "30%", height: "52px", paddingTop: 30 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Comment