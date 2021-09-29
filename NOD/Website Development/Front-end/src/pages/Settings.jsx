import React from 'react'
import './page.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from '../components/sidebar/Sidebar'
import TopNav from '../components/topnav/TopNav'

import ThemeAction from '../redux/actions/ThemeAction'

import { v4 as uuid } from 'uuid';
import firebase from '../config/firebase.js'
import add_photo from '../Images/add_photo.PNG'
import uploading from '../Images/uploading.gif'
import { useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import user_image from '../assets/images/user_image.png'

const appStyle = {
    height: "100vh",
    display: "flex",
    backgroundColor: "#0F2147",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px"
}; 

const formStyle = {
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
    display: 'block'
};

const labelStyle = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    padding: '15px',
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    padding: '17px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%',
    fontSize: '15px',
    color: 'white',
    display: 'block'
};



const Settings = (props) => {

    const themeReducer = useSelector(state => state.ThemeReducer)
    const history = useHistory();

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [isUploading, setisUploading] = useState(false);


    const [error, setError] = React.useState(false)
    const [errorss, setErrorss] = React.useState(false)

    const [errors, setErrors] = React.useState(false)

    const displayimagehandleChange = async (e) => {
        const file = e.target.files[0];
        setisUploading(true)

        const id = uuid();
        const storageRef = firebase.storage().ref('images').child(id);
        await storageRef.put(file);
        storageRef.getDownloadURL().then((url) => {
            setImage(url)
            setisUploading(false)

        })

    }


    const handleSubmit = () => {
        setError(false)
        setErrors(false)
        setErrorss(false)
        if (oldPassword === "" && newPassword === "") {
            firebase.database().ref('users').child(localStorage.getItem('museruids')).set({
                email: email,
                name: name,
                image: image

            })
            alert("Profile Updated Successfully")

        } else if (oldPassword !== "" && newPassword === "") {
            setError(true)
        } else if (oldPassword !== "" && newPassword !== "") {

            if (oldPassword !== localStorage.getItem('muserpassword')) {
                setErrorss(true)

            } else {

                function isUpper(str) {
                    return /[A-Z]/.test(str);
                }

                function isDigit(str) {
                    return /[0-9]/.test(str);
                }

                function isLower(str){
                    return /[a-z]/.test(str);
                }

                var format1 = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

                if (format1.test(newPassword)) {

                    if (isUpper(newPassword)) {

                        if (isDigit(newPassword)) {

                            if(isLower(newPassword)){
                                firebase.database().ref('users').child(localStorage.getItem('museruids')).set({
                                    email: email,
                                    name: name,
                                    image: image
    
                                })
    
                                var user = firebase.auth().currentUser;
                                user.updatePassword(newPassword).then(function () {
                                    console.log("success")
                                    alert("Profile and Password Updated Successfully")
                                    setNewPassword("");
                                }).catch(function (error) {
                                    console.log(error)
                                    alert("error")
                                });
                            }else{
                                setErrors(true)

                            }
                        
                        } else {
                            setErrors(true)
                        }
                    } else {
                        setErrors(true)
                    }

                } else {
                    setErrors(true)
                }



            }

        }
    }



    useEffect(() => {
        console.log("This function runs only on first Render")
        if (localStorage.getItem('museremail') === null || localStorage.getItem('museremail') === "" || localStorage.getItem('museremail') === "null") {
            history.push("/")
        }

        firebase.database().ref('users').child(localStorage.getItem('museruids')).on("value", (snapshot) => {
            const dataVal = snapshot.val();

            console.log(dataVal);

            if (dataVal === null) {

                setName("Admin")
                setEmail(localStorage.getItem('museremail'))
                setImage(user_image)

            } else {

                setName(dataVal.name)
                setEmail(dataVal.email)
                setImage(dataVal.image)

            }
        })


        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, []);


    return (
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>

            <Sidebar {...props} />
            <div className="layout__content">

                <TopNav />
                <div className="layout__content-main">
                    <div style={formStyle} style={{ paddingLeft: 'auto !important' }}>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", flexWrap: "wrap" }}>

                            <div style={{
                                backgroundColor: "white",
                                height: "700px",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                borderRadius: "20px",
                                padding: "20px",
                                width: "100%",
                            }}>
                                <h2>Update Profile</h2>
                                <br /><br />
                                <input type="email" value={email} placeholder="Enter Email Address" style={inputStyle} readOnly />

                                <br />
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter User Name" style={inputStyle} />

                                <br />
                                <input type="password" onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter Old Password" style={inputStyle} />

                                <br />
                                <input type="password" onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" style={inputStyle} />

                                <br />
                                {error &&
                                    <div style={{ fontSize: 15, color: 'red' }}>Enter New Password To Change Current Password</div>}
                                {errorss &&
                                    <div style={{ fontSize: 15, color: 'red' }}>Wrong Old Password</div>}

                                {errors &&
                                    <div style={{ fontSize: 15, color: 'red' }}>New Password Must Contain Capital Alphabet , Symbol, A Digit And A Normal Alphabet</div>}

                                <br />
                                <div style={{ display: "flex", alignItems: 'center' }}>
                                    <div className="upload-btn-wrapper">
                                        {image === ""
                                            ?
                                            <img src={add_photo} alt="logo" style={{ border: "2px solid black" }} />
                                            :
                                            <img src={image} alt="logo" width="99px" height="99px" />
                                        }
                                        <br /><br />
                                        <input type="file" name="image" onChange={displayimagehandleChange} />

                                        <br /><h5>Upload An Image</h5><br /><br /><br />
                                    </div>

                                    <Dialog
                                        open={isUploading}
                                    >
                                        <DialogContent>
                                            <img src={uploading} alt="uploading" className="d-flex align-self-center" />

                                        </DialogContent>

                                    </Dialog>


                                </div>

                                <div>
                                    <br />

                                    <button style={submitStyle} onClick={handleSubmit}>Update Profile</button>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Settings
