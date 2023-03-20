import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";

import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PocketBase from 'pocketbase';

function ConfigPortalSetPicture() {
    const navigate = useNavigate();

    function handleBackButtonClick(event) {
        console.log("back button clicked!");
        navigate("/config/settime");
    }

    async function handleNextButtonClick(event) {
        console.log("next button clicked! Time to upload the image");

        //append the file to formData
        var fileInput = document.getElementById('photo');
        var file = fileInput.files[0];
        var formData = new FormData();
        console.log("file:");
        console.log(file);
        formData.append('picture', file);
        formData.append('title', localStorage.getItem("title"));
        formData.append('when', localStorage.getItem("date") + " " + localStorage.getItem("startTime"));
        formData.append('endTime', localStorage.getItem('date') + " " + localStorage.getItem("endTime"));
        
        /*-------------------------------
        UPLOAD TO DATABASE
        ---------------------------------*/
        //check if the repeat is daily or weekly and upload to the correct db
        if (localStorage.getItem("repeat") == "nil") { //for adhoc
            const client = new PocketBase('http://129.150.56.59:8090');        
            const record = await client.collection('adhoc').create(formData);        
            console.log("pocketbase response: ");
            console.log(record);
            console.log(record.id);

            //store id of record in localstorage so we upload other details in the same record
            localStorage.setItem("recordId", record.id); 
        } else { //for regular
            const client = new PocketBase('http://129.150.56.59:8090');
            const record = await client.collection('regular').create(formData);
            console.log("pocketbase response: ");
            console.log(record);
            console.log(record.id);

            //store id of record in localstorage so we upload other details in the same record
            localStorage.setItem("recordId", record.id);
        }

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
                        <input type="file" id="photo" style={{textAlign:'center'}}></input>
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