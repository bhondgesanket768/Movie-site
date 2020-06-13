import React, { useState } from "react";
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios"
import { Button } from 'antd';
import { useSelector } from "react-redux";

function UploadProfile(props) {

    const [Images, setImages] = useState([])
    const user = useSelector(state => state.user)

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 

        axios.post('/api/users/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }

    const handleEdit = () => {
        setImages([])
        props.edit();
    }

    return (
        <div align="center">
            {props.upload ? (
                <img style={{ width: '200px', height: '200px', borderRadius: "50%" }} src={user.userData && ( user.userData.image.substring(0, 4) === "http" ? user.userData.image : `https://www.movietpoint.com/${user.userData.image}`)} alt="img" />
            ) : (
                    Images.length === 0 ? (
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={800000000}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div style={{
                                    width: '200px', height: '200px', border: '1px solid lightgray',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "50%"
                                }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <PlusOutlined style={{ fontSize: '3rem' }} />

                                </div>
                            )}
                        </Dropzone>
                    ) : (
                            <div style={{ display: 'flex', width: '200px', height: '200px' }}>
                                {Images.map((image, index) => (
                                    <div onClick>
                                        <img style={{ width: '200px', height: '200px', borderRadius: "50%" }} src={`https://www.movietpoint.com/${image}`} alt={`productImg-${index}`} />
                                    </div>
                                ))}
                            </div>
                        )
                )}

            <div style={{ paddingTop: 16 }}>
                {props.upload && <Button onClick={handleEdit} >Edit</Button>}
            </div>
        </div>
    )
}

export default UploadProfile;