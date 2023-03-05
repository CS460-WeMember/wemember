import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";

import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfigPortalSetTask() {
    const navigate = useNavigate();

    const [location, setLocation] = useState('');
    const handleLocationChange = (event) => {
      setLocation(event.target.value);
    };

    const [repeat, setRepeat] = useState('');
    const handleRepeatChange = (event) => {
      setRepeat(event.target.value);
    };

    function handleBackButtonClick(event) {
        console.log("back button clicked!");
        navigate("/config/settask");
    }

    function handleNextButtonClick(event) {
        console.log("next button clicked!");
    }

    return(
        <div className="grey-background">
            <div className="blue-container">

                <div className="blue-grid">
                    <div className="progress-bar-container">
                        <ProgressBar setTask="done" setTime="active" setPicture="inactive" setLights="inactive" setOthers="inactive"/>
                    </div>
                    <div className="cancel-button-container">
                        <CancelButton className="cancel-button-positioning"/>
                    </div>
                </div>

                <div className="semi-circle">
                    <div className="white-grid">
                        <div className="main-input-container">
                            <div className="set-time-and-location-container">

                                <text className="question-text">
                                    When and where should the task be completed?
                                </text>

                                <div className="set-time-and-location-input-fields">
                                    <div className="input-field-wrapper">
                                        <text className="small-text">
                                            Date
                                        </text>
                                        <div className="set-time-and-location-input-field">
                                            <input className="small-text" type="date" id="date-input" name="date" style={{outline:'none'}}/>
                                        </div>
                                    </div>

                                    <div className="input-field-wrapper">
                                        <text className="small-text">
                                            Start Time
                                        </text>
                                        <div className="set-time-and-location-input-field">
                                            <input className="small-text" type="time" id="start-time-input" name="start-time" style={{outline:'none'}}/>
                                            <BiTimeFive className="icon"/>
                                        </div>
                                    </div>

                                    <div className="input-field-wrapper">
                                        <text className="small-text">
                                            End Time
                                        </text>
                                        <div className="set-time-and-location-input-field">
                                            <input className="small-text" type="time" id="start-time-input" name="start-time" style={{outline:'none'}}/>
                                            <BiTimeFive className="icon"/>
                                        </div>
                                    </div>

                                    <div className="input-field-wrapper">
                                        <text className="small-text">
                                            Where?
                                        </text>
                                        <div className="set-time-and-location-input-field">
                                            <select 
                                                id="dropdown" 
                                                value={location} 
                                                onChange={handleLocationChange} 
                                                style={{backgroundColor:"white", fontWeight:"normal"}} 
                                                className="small-text"
                                            >
                                                    <option value="">Choose a location</option>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="input-field-wrapper">
                                        <text className="small-text">
                                            How Often?
                                        </text>
                                        <div className="set-time-and-location-input-field">
                                            <select 
                                                id="dropdown" 
                                                value={repeat} 
                                                onChange={handleRepeatChange} 
                                                style={{backgroundColor:"white", fontWeight:"normal"}} 
                                                className="small-text"
                                            >
                                                    <option value="">Choose how often</option>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="back-button" onClick={handleBackButtonClick}>
                            <BiLeftArrowAlt className="icon"></BiLeftArrowAlt>
                            <text className="button-text">
                                Back
                            </text>
                        </button>

                        <button className="next-button" onClick={handleNextButtonClick}>
                            <text className="button-text">
                                Next
                            </text>
                            <BiRightArrowAlt className="icon"></BiRightArrowAlt>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfigPortalSetTask;