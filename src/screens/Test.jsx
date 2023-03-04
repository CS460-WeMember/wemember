import "./Test.css";
import React, { Component } from 'react';
import {BiBookContent, BiStopwatch, BiCamera, BiWrench, BiVolumeFull} from "react-icons/bi";

function Test() {
    return(
        <div style={{backgroundColor:"#55BDE5", display:"flex", flexDirection:"row", justifyContent:"center", zIndex:0}}>

            <div className="checkpoint">
                <BiBookContent className="icon"></BiBookContent>
                <div className="active-circle">
                    <div className="active-dot"></div>
                </div>
                <text className="text">
                    Task
                </text>
            </div>

            <div className="line-container">
                <hr className="line" />
            </div>

            <div className="checkpoint">
                <BiStopwatch className="icon"></BiStopwatch>
                <div className="inactive-circle">
                    <div className="inactive-dot"></div>
                </div>
                    <text className="text">
                        Time & 
                    </text>
                    <text className="text">
                        Location
                    </text>
            </div>

            <div className="line-container">
                <hr className="line" />
            </div>

            <div className="checkpoint">
                <BiCamera className="icon"></BiCamera>
                <div className="inactive-circle">
                    <div className="inactive-dot"></div>
                </div>
                    <text className="text">
                        Picture
                    </text>
            </div>

            <div className="line-container">
                <hr className="line" />
            </div>

            <div className="checkpoint">
                <BiVolumeFull className="icon"></BiVolumeFull>
                <div className="inactive-circle">
                    <div className="inactive-dot"></div>
                </div>
                    <text className="text">
                        Lights &
                    </text>
                    <text className="text">
                        Sounds
                    </text>
            </div>

            <div className="line-container">
                <hr className="line" />
            </div>

            <div className="checkpoint">
                <BiWrench className="icon"></BiWrench>
                <div className="inactive-circle">
                    <div className="inactive-dot"></div>
                </div>
                    <text className="text">
                        Others
                    </text>
            </div>


        </div>
    

    )
}

export default Test;