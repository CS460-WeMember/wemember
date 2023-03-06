import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import "../styles/ConfigPortal.css";
import { HuePicker } from 'react-color';
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfigPortalSetLights() {
    const navigate = useNavigate();

    const [color, setColor] = useState('#FFE600'); // set the initial color to yellow
    function handleColorChange(newColor) {
      setColor(newColor.hex);
      console.log("color change detected: " + color);
    }

    function handleBackButtonClick(event) {
        console.log("back button clicked!");
        navigate("/config/setpicture");
    }

    function handleNextButtonClick(event) {
        console.log("next button clicked!");
        navigate("/config/setothers");
    }

    return(
      <div className="grey-background">
          <div className="blue-container">

              <div className="blue-grid">
                <div className="progress-bar-container">
                  <ProgressBar 
                    setTask="done" 
                    setTime="done" 
                    setPicture="done" 
                    setLights="active" 
                    setOthers="inactive"
                  />
                </div>
                <div className="cancel-button-container">
                  <CancelButton className="cancel-button-positioning"/>
                </div>
              </div>

              <div className="semi-circle">
                <div className="white-grid">
                  <div className="main-input-container">
                      
                    <text className="question-text" style={{fontWeight:"bold"}}>
                      Configure
                    </text>
                    <text className="small-text">
                      Adjust the lights and sounds of your reminder!
                    </text>

                    <div className="config-container">
                      <text className="question-text" style={{fontSize:"24px", fontWeight:"bold"}}>
                        Lights
                      </text>

                      <div className="pick-light-color-container">
                        <div className="light-color-header">
                          <text className="small-text">
                            Pick a light color:
                          </text>
                          <div className="color-display-container">
                            <button className="color-display" style={{backgroundColor: color}}/>
                          </div>
                        </div>
                        <HuePicker style={{marginTop: "5px"}} color={color} onChange={handleColorChange}></HuePicker>
                      </div>

                      <text className="small-text">
                        Brightness:
                      </text>

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

export default ConfigPortalSetLights;