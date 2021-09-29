import React, { useState, useEffect } from 'react'

import './topnav.css'

import { useHistory } from 'react-router-dom'

import Dropdown from '../badge/dropdown/Dropdown'


import user_image from '../../assets/images/user_image.png'

import user_menu from '../../assets/JsonData/user_menus.json'

import firebase from '../../config/firebase.js'


const Topnav = () => {

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const history = useHistory();

    useEffect(() => {
        firebase.database().ref('users').child(localStorage.getItem('museruids')).on("value", (snapshot) => {
            const dataVal = snapshot.val();

            console.log(dataVal);

            if (dataVal === null) {

                setName("Admin")
                setImage(user_image)

            } else {

                setName(dataVal.name)
                localStorage.setItem('muserimage',dataVal.image)
                setImage(dataVal.image)

            }
        })
    }, [])


    const renderUserToggle = () => (
        <div className="topnav__right-user">
            <div className="topnav__right-user__image">
                <img src={localStorage.getItem('muserimage')} alt="" />
            </div>
            <div className="topnav__right-user__name">
                {name}
            </div>
        </div>
    )



    const logout = () => {
        firebase.auth().signOut().then(() => {
            localStorage.setItem("hasUser", false)
            localStorage.setItem("museremail", "null")
            localStorage.setItem("museruids", "null")
            localStorage.setItem("muserpassword", "null")

            history.push('/');

        }).catch((error) => {
            alert("Logout Failed")
            console.log(error)
        });

    }

    const gotoSetting = () => {
        history.push('/settings');
    }







    const renderNotificationItem = (item, index) => (
        <div className="notification-item" key={index}>
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    )

    const renderUserMenu = (item, index) => {

        if (item.content === "Logout") {
            return (
                <div onClick={logout} style={{ cursor: "pointer" }} key={index}>
                    <div className="notification-item">
                        <i className={item.icon}></i>
                        <span>{item.content}</span>
                    </div>
                </div>
            )

        } else if (item.content === "Settings") {
            return (
                <div onClick={gotoSetting} style={{ cursor: "pointer" }} to='/settings' key={index}>
                    <div className="notification-item">
                        <i className={item.icon}></i>
                        <span>{item.content}</span>
                    </div>
                </div>
            )


        } else if (item.content === "Profile") {
            return (
                <div onClick={gotoSetting} style={{ cursor: "pointer" }} key={index}>
                    <div className="notification-item">
                        <i className={item.icon}></i>
                        <span>{item.content}</span>
                    </div>
                </div>
            )

        }

    }

    return (
        <div className='topnav'>

            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle()}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                </div>
            </div>
        </div>
    )
}

export default Topnav
