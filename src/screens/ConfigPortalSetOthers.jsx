import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";

import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfigPortalSetTime() {
    const navigate = useNavigate();

    function handleBackButtonClick(event) {
        console.log("back button clicked!");
        navigate("/config/setLights");
    }

    function handleFinishedButtonClick(event) {
        console.log("finished button clicked!");
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
                    setLights="done" 
                    setOthers="active"
                  />
                </div>
                <div className="cancel-button-container">
                  <CancelButton className="cancel-button-positioning"/>
                </div>
              </div>

              <div className="semi-circle">
                <div className="white-grid">
                  <div className="main-input-container">
                      


                  </div>

                  <button className="back-button" onClick={handleBackButtonClick}>
                    <BiLeftArrowAlt className="icon"></BiLeftArrowAlt>
                    <text className="button-text">
                      Back
                    </text>
                  </button>

                  <button className="next-button" onClick={handleFinishedButtonClick}>
                    <text className="button-text">
                      Finished!
                    </text>
                  </button>

                </div>
              </div>
          </div>
      </div>
    )
}

export default ConfigPortalSetTime;