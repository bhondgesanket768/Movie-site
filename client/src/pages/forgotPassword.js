import React from "react"
import { Modal, Input, Radio, Form } from 'antd';
import { notify } from "../utils"

const ForgotPassword = (props) => {

    const [form] = Form.useForm()

    const handleSubmit = (e) => {
        form.validateFields().then(values => {
            if (values.password.length < 6) {
                notify("error", "Error", "Password length must be at least 6 character");
            } else {
                try {
                    props.handleSubmit(values.email, values.password);
                    props.handleCancel();
                    form.resetFields();
                } catch (ex) {
                    notify("error", "Error", ex.toString())
                }
            }
        });
    }

    return (
        <Modal
            title="Reset Password"
            visible={true}
            okText="Submit"
            onCancel={props.handleCancel}
            onOk={handleSubmit}
        >
            <Form layout="vertical" form={form} onSubmit={handleSubmit}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input placeholder="email" />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password',
                        },
                    ]}
                >
                    <Input type="password"
                        placeholder="Password" />
                </Form.Item>
            </Form>
        </Modal>
    );

}

export default ForgotPassword 