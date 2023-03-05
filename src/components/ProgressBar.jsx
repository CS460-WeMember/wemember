import "../styles/ProgressBar.css";
import React, { Component } from 'react';
import {BiBookContent, BiStopwatch, BiCamera, BiWrench, BiVolumeFull, BiCheck} from "react-icons/bi";

function ProgressBar({setTask, setTime, setPicture, setLights, setOthers}) {
    return(
        <div className="container">
            <div className="checkpoint">
                <BiBookContent className="icon"></BiBookContent>
                <div className = {(setTask == "done")? "done-circle" : (setTask=="active")? "active-circle" : "inactive-circle"}>
                    {
                        (setTask=="active" || setTask=="inactive") && <div className = {setTask =="active"? "active-dot" : "inactive-dot"}/>
                    }
                    {
                        setTask=="done" && <BiCheck className="icon"></BiCheck>
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
                <BiStopwatch className="icon"></BiStopwatch>
                <div className = {(setTime == "done")? "done-circle" : (setTime=="active")? "active-circle" : "inactive-circle"}>
                    {
                        (setTime=="active" || setTime=="inactive") && <div className = {setTime =="active"? "active-dot" : "inactive-dot"}/>
                    }
                    {
                        setTime=="done" && <BiCheck className="icon"></BiCheck>
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
                <BiCamera className="icon"></BiCamera>
                <div className = {(setPicture == "done")? "done-circle" : (setPicture=="active")? "active-circle" : "inactive-circle"}>
                    {
                        (setPicture=="active" || setPicture=="inactive") && <div className = {setPicture =="active"? "active-dot" : "inactive-dot"}/>
                    }
                    {
                        setPicture=="done" && <BiCheck className="icon"></BiCheck>
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
                <BiVolumeFull className="icon"></BiVolumeFull>
                <div className = {(setLights == "done")? "done-circle" : (setLights=="active")? "active-circle" : "inactive-circle"}>
                    {
                        (setLights=="active" || setLights=="inactive") && <div className = {setLights =="active"? "active-dot" : "inactive-dot"}/>
                    }
                    {
                        setLights=="done" && <BiCheck className="icon"></BiCheck>
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
                <BiWrench className="icon"></BiWrench>
                <div className = {(setOthers == "done")? "done-circle" : (setOthers=="active")? "active-circle" : "inactive-circle"}>
                    {
                        (setOthers=="active" || setOthers=="inactive") && <div className = {setOthers =="active"? "active-dot" : "inactive-dot"}/>
                    }
                    {
                        setOthers=="done" && <BiCheck className="icon"></BiCheck>
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