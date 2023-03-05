import "../styles/ProgressBar.css";
import React, { Component } from 'react';
import {BiBookContent, BiStopwatch, BiCamera, BiWrench, BiVolumeFull} from "react-icons/bi";

function ProgressBar({setTask, setTime, setPicture, setLights, setOthers}) {
    return(
        <div className="container">
            <div className="checkpoint">
                <BiBookContent className="icon"></BiBookContent>
                <div className = {setTask == "active"? "active-circle" : "inactive-circle"}>
                    <div className = {setTask == "active"? "active-dot" : "inactive-dot"}></div>
                </div>
                <div className="text-container">
                    <text className="text">
                        Task
                    </text>
                </div>
            </div>

            <div className="line-container">
                <hr className = {setTime == "active"? "active-line" : "inactive-line"}/>
            </div>

            <div className="checkpoint">
                <BiStopwatch className="icon"></BiStopwatch>
                <div className = {setTime == "active"? "active-circle" : "inactive-circle"}>
                    <div className = {setTime == "active"? "active-dot" : "inactive-dot"}></div>
                </div>
                <div className="text-container">
                    <text className="text">
                        Time & 
                    </text>
                    <text className="text">
                        Location
                    </text>
                </div>
            </div>

            <div className="line-container">
                <hr className = {setPicture == "active"? "active-line" : "inactive-line"} />
            </div>

            <div className="checkpoint">
                <BiCamera className="icon"></BiCamera>
                <div className = {setPicture == "active"? "active-circle" : "inactive-circle"}>
                    <div className = {setPicture == "active"? "active-dot" : "inactive-dot"}></div>
                </div>
                <div className="text-container">
                    <text className="text">
                        Picture
                    </text>
                </div>
            </div>

            <div className="line-container">
                <hr className = {setLights == "active"? "active-line" : "inactive-line"}/>
            </div>

            <div className="checkpoint">
                <BiVolumeFull className="icon"></BiVolumeFull>
                <div className = {setLights == "active"? "active-circle" : "inactive-circle"}>
                    <div className = {setLights == "active"? "active-dot" : "inactive-dot"}></div>
                </div>
                <div className="text-container">
                    <text className="text">
                        Lights &
                    </text>
                    <text className="text">
                        Sounds
                    </text>
                </div>
            </div>

            <div className="line-container">
                <hr className = {setOthers == "active"? "active-line" : "inactive-line"} />
            </div>

            <div className="checkpoint">
                <BiWrench className="icon"></BiWrench>
                <div className = {setOthers == "active"? "active-circle" : "inactive-circle"}>
                    <div className = {setOthers == "active"? "active-dot" : "inactive-dot"}></div>
                </div>
                <div className="text-container">
                    <text className="text">
                        Others
                    </text>
                </div>
            </div>


        </div>
    
    )
}

export default ProgressBar;