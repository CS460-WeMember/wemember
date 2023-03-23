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
    const repeat = localStorage.getItem("repeat");
    const recordId = localStorage.getItem("recordId");
    console.log("repeat: " + repeat + ", recordId: " + recordId);
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

    function handleBackButtonClick() {
        console.log("back button clicked!");
        navigate("/config/setpicture");
    }

    async function handleNextButtonClick() {
        console.log("next button clicked!");
        //format the options JSON object for uploading to DB
        const light = color.substring(1);
        const colorBrightness = "" + brightness;
        const sound = "" + audioVolume;

        const options = 
        {
            "light": light, 
            "brightness": colorBrightness, 
            "sound": sound
        }
        console.log("options");
        console.log(options);
        //append the audio file to formData
        var fileInput = document.getElementById('audio');
        var file = fileInput.files[0];
        var formData = new FormData();
        console.log("audio file:");
        console.log(file);
        formData.append('audio', file);
        console.log("formdata:");
        console.log(formData);

        /*-------------------------------
        UPLOAD TO DATABASE
        ---------------------------------*/
        //url for upload and getting recordId
        const pb = new PocketBase(url);
        const recordId = localStorage.getItem("recordId");

        //check if the repeat is daily or weekly and upload to the correct db
        var databaseCollection = "";
        if (localStorage.getItem("repeat") == "nil") { //for adhoc
            databaseCollection = "adhoc";
        } else { //for regular
            databaseCollection = "regular";
        }

        //audio upload
        const uploadAudioRes = await pb.collection(databaseCollection).update(recordId, formData);
        console.log("pocketbase audio upload response: ");
        console.log(uploadAudioRes);
        //options upload
        const uploadOptionsRes = await pb.collection(databaseCollection).update(recordId, {
            "options": {options}
        });
        console.log("pocketbase options upload response: ");
        console.log(uploadOptionsRes);

        //navigate to the next page
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
                    <CancelButton 
                        className="cancel-button-positioning" 
                        repeat={localStorage.getItem("repeat")}
                        recordId = {localStorage.getItem("recordId")}
                    />
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
                            <input type="file" accept=".mp3/*" id="audio" onChange={handleAudioChange} />
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