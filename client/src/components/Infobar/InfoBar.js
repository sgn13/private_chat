import React from 'react'
import './InfoBar.css'
import { Link } from 'react-router-dom'

const InfoBar = ({ room }) => {
    return (
        <div>
            <div className="infoBar">
                <div className="leftInnerContainer">
                    <h3>Room: {room}</h3>
                </div>
                <div className="rightInnerContainer">
                    <Link to="/userList"><button>Leave Room</button></Link>

                </div>
            </div>

        </div>
    )
}

export default InfoBar
