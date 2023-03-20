import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import "../styles/ConfigPortal.css";
import { HuePicker } from 'react-color';
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../global/PocketbaseURL";
import PocketBase from 'pocketbase';

function ConfigPortalSetLights() {
    const navigate = useNavigate();

    const [color, setColor] = useState('#FFE600'); // set the initial color to yellow
    function handleColorChange(newColor) {
      setColor(newColor.hex);
      console.log("color change detected: " + color);
    }

    const [brightness, setBrightness] = useState(50);
    function handleBrightnessChange(event) {
        setBrightness(event.target.value);
        console.log("brightness change detected: " + brightness);
    }

    const [audioFile, setAudioFile] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null);
    function handleAudioChange(event) {
      const selectedFile = event.target.files[0];
      const previewURL = URL.createObjectURL(selectedFile);
  
      setAudioFile(selectedFile);
      setAudioPreview(previewURL);
    }

    const [audioVolume, setAudioVolume] = useState(100);
    function handleAudioVolumeChange(event) {
      setAudioVolume(event.target.value);
    }

    function handleBackButtonClick(event) {
        console.log("back button clicked!");
        navigate("/config/setpicture");
    }

    async function handleNextButtonClick(event) {
        console.log("next button clicked!");
        console.log("color: " + color + ", brightness: " + brightness + ", audioVolume: " + audioVolume);
        const options = 
        {
            "light": color.substring(1), 
            "brightness": "" + brightness, 
            "sound":  "" + audioVolume
        }

        const client = new PocketBase(url);
        const recordId = localStorage.getItem("recordId");
        if (localStorage.getItem("repeat") == "nil") { //for adhoc
            const record = await client.collection('adhoc').update(recordId, {
                "options": options
            });
            console.log("pocketbase response: ");
            console.log(record);
        } else { //for regular
            const record = await client.collection('regular').update(recordId, {
                "options": options
            });
            console.log("pocketbase response: ");
            console.log(record);
        }

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
                  <div className="main-input-container" style={{gap:"24px"}}>
                      
                    <div className="config-screen-header-wrapper">
                      <text className="question-text">
                        Adjust the lights and sounds of your reminder!
                      </text>
                    </div>

                    <div className="config-containers-wrapper">
                      <div className="config-container">
                        <text className="question-text" style={{fontSize:"24px", fontWeight:"bold"}}>
                          Lights
                        </text>

                        <div className="pick-light-options-wrapper"> 
                          <div className="pick-light-color-container">
                            <div className="light-color-header">
                              <text className="small-text">
                                Pick a light color:
                              </text>
                              <div className="color-display-container">
                                <div className="color-display" style={{backgroundColor: color}}/>
                              </div>
                            </div>
                            <HuePicker style={{marginTop: "5px"}} color={color} onChange={handleColorChange}></HuePicker>
                          </div>

                          <div className="pick-percentage-container">
                            <text className="small-text">
                              Set brightness: {brightness}%
                            </text>
                            <div>
                              <input type="range" min="0" max="100" value={brightness} onChange={handleBrightnessChange} />
                            </div>
                          </div>
                        </div>

                      </div>


                      <div className="config-container">
                        <text className="question-text" style={{fontSize:"24px", fontWeight:"bold"}}>
                          Audio
                        </text>

                        <div className="pick-audio-container">
                          <text className="small-text">
                            Add an audio clip: 
                          </text>
                          <div className="pick-audio-button">
                            <input type="file" accept="audio/*" onChange={handleAudioChange} />
                          </div>
                          <audio controls src={audioPreview}>
                                Your browser does not support the audio tag.
                          </audio>
                        </div>

                        <div className="pick-percentage-container">
                          <text className="small-text">
                            Set volume: {audioVolume}%
                          </text>
                          <div>
                            <input type="range" min="0" max="100" value={audioVolume} onChange={handleAudioVolumeChange} />
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

export default ConfigPortalSetLights;