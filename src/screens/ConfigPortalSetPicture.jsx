import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";

import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfigPortalSetPicture() {
    const navigate = useNavigate();

    function handleBackButtonClick(event) {
        console.log("back button clicked!");
        navigate("/config/settime");
    }

    function handleNextButtonClick(event) {
        console.log("next button clicked!");
        navigate("/config/setlights");
    }

    return(
      <div className="grey-background">
          <div className="blue-container">

              <div className="blue-grid">
                <div className="progress-bar-container">
                  <ProgressBar 
                    setTask="done" 
                    setTime="done" 
                    setPicture="active" 
                    setLights="inactive" 
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
                    <div className="set-picture-container">
                      <text className="question-text">
                        Add a photo
                      </text>
                      <div className="picture-box">
                        <input type="file"></input>
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

export default ConfigPortalSetPicture;