import React, { useState } from "react";
import UploadProfile from "../components/uploadProfile";
import { Button, Descriptions, Card, Alert } from 'antd';
import axios from "axios";
import { notify } from "../utils";
import { updateProfile } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function Profile() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    const [image, setimage] = useState([]);
    const [upload, setUpload] = useState(false);
    const [editimage, setEdit] = useState(true);

    const update = (newImage) => {
        setimage(newImage);
    }

    const edit = () => {
        setUpload(true);
        setEdit(false);
    }

    const handleClick = () => {
        const variable = {
            userId: localStorage.getItem("userId"),
            image: image[0]
        }
        axios.post("/api/users/changeProfile", variable)
            .then(response => {
                if (response.data.success) {
                    dispatch(updateProfile({ image: image[0] }))
                    notify("success", "Success", "Profile pic updated successfully")
                    setUpload(false);
                    setEdit(true);
                } else {
                    alert("failed to upload image");
                }
            })
    }

    return (
        <div align="center" style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Card>
                <UploadProfile refreshFunction={update} edit={edit} upload={editimage} />
                {upload && image.length === 0 &&
                    <div align="left">
                        <Alert
                            message="Note"
                            description="Click on the above dropzone to upload image"
                            type="info"
                            showIcon
                        />
                    </div>
                }
                {upload && image.length > 0 && <Button onClick={handleClick}>Upload</Button>}
                <hr />

                <div>
                    <Descriptions title="User Info" >
                        <Descriptions.Item label="Name">{user.userData && user.userData.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.userData && user.userData.email}</Descriptions.Item>
                        <Descriptions.Item label="Role">{user.userData && user.userData.role}</Descriptions.Item>
                    </Descriptions>
                </div>
            </Card>
        </div>
    )
}

export default Profile;