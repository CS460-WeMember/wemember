import "../styles/ProgressBar.css";
import React, { Component } from 'react';
import {BiBookContent, BiStopwatch, BiCamera, BiWrench, BiVolumeFull, BiCheck} from "react-icons/bi";

function ProgressBar({setTask, setTime, setPicture, setLights, setOthers}) {
    return(
        <div className="container">
            <div className="checkpoint">
                <BiBookContent className="progress-bar-icon"></BiBookContent>
                <div className = {(setTask == "done")? "done-circle" : (setTask=="active")? "active-circle" : "inactive-circle"}>
                    {
                        setTask=="active" && <div className = "active-dot"/>
                    }
                    {
                        setTask=="done" && <BiCheck className="progress-bar-icon"></BiCheck>
                    }
                </div>
                <div className="text-container">
                    <text className="text">
                        Task
                    </text>
                </div>
            </div>

            <div className="line-container">
                <hr className = {setTime == "done"? "active-line" : setTime=="active"? "active-line" : "inactive-line"}/>
            </div>

            <div className="checkpoint">
                <BiStopwatch className="progress-bar-icon"></BiStopwatch>
                <div className = {(setTime == "done")? "done-circle" : (setTime=="active")? "active-circle" : "inactive-circle"}>
                    {
                        setTime=="active" && <div className = "active-dot"/>
                    }
                    {
                        setTime=="done" && <BiCheck className="progress-bar-icon"></BiCheck>
                    }
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
                <hr className = {setPicture == "done"? "active-line" : setPicture=="active"? "active-line" : "inactive-line"}/>
            </div>

            <div className="checkpoint">
                <BiCamera className="progress-bar-icon"></BiCamera>
                <div className = {(setPicture == "done")? "done-circle" : (setPicture=="active")? "active-circle" : "inactive-circle"}>
                    {
                        setPicture=="active" && <div className = "active-dot"/>
                    }
                    {
                        setPicture=="done" && <BiCheck className="progress-bar-icon"></BiCheck>
                    }
                </div>
                <div className="text-container">
                    <text className="text">
                        Picture
                    </text>
                </div>
            </div>

            <div className="line-container">
                <hr className = {setLights == "done"? "active-line" : setLights=="active"? "active-line" : "inactive-line"}/>
            </div>

            <div className="checkpoint">
                <BiVolumeFull className="progress-bar-icon"></BiVolumeFull>
                <div className = {(setLights == "done")? "done-circle" : (setLights=="active")? "active-circle" : "inactive-circle"}>
                    {
                        setLights=="active" && <div className = "active-dot"/>
                    }
                    {
                        setLights=="done" && <BiCheck className="progress-bar-icon"></BiCheck>
                    }
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
                <hr className = {setOthers == "done"? "active-line" : setOthers=="active"? "active-line" : "inactive-line"}/>
            </div>

            <div className="checkpoint">
                <BiWrench className="progress-bar-icon"></BiWrench>
                <div className = {(setOthers == "done")? "done-circle" : (setOthers=="active")? "active-circle" : "inactive-circle"}>
                    {
                        setOthers=="active" && <div className = "active-dot"/>
                    }
                    {
                        setOthers=="done" && <BiCheck className="progress-bar-icon"></BiCheck>
                    }
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