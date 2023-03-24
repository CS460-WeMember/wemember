import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import url from "../global/PocketbaseURL";
import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PocketBase from 'pocketbase';

function ConfigPortalSetPicture() {
    const navigate = useNavigate();

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
        formData.append('endTime', localStorage.getItem('date') + " " + localStorage.getItem("endTime") + ":00");
        formData.append('completeField', 1);

        /*-------------------------------
        UPLOAD TO DATABASE
        ---------------------------------*/
        //url for upload
        const client = new PocketBase(url);        
        //check if the repeat is daily or weekly and upload to the correct db
        if (localStorage.getItem("repeat") == "nil") { //for adhoc
            //for adhoc, we need to update certain fields
            const when = localStorage.getItem("date") + " " + localStorage.getItem("startTime") + ":00";
            console.log("when: ");
            console.log(when);
            formData.append('when', when);
        
            const record = await client.collection('adhoc').create(formData);        
            console.log("pocketbase response: ");
            console.log(record);
            console.log(record.id);

            //store id of record in localstorage so we upload other details in the same record
            localStorage.setItem("recordId", record.id); 

        } else { //for regular
            const startTime = localStorage.getItem("startTime");
            const hour = parseInt("" + startTime[0] + startTime[1]);
            const minute = parseInt("" + startTime[3] + startTime[4]);

            //for regular, we need to update certain fields 
            if (localStorage.getItem("repeat") == "daily") {
                formData.append('day', -1);
                formData.append('hour', hour);
                formData.append('minute', minute);

            } else if (localStorage.getItem("repeat") == "weekly") {
                const startDate = new Date(localStorage.getItem("date"));
                var day = startDate.getDay() - 1;
                if (day == -1) {
                    day = 6;
                }
                formData.append('day', day);
                formData.append('hour', hour);
                formData.append('minute', minute);
            }

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
                  <CancelButton 
                    className="cancel-button-positioning" 
                    repeat={localStorage.getItem("repeat")}
                    recordId = {localStorage.getItem("recordId")}
                    />
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
                        <input type="file" accept="image/*" id="photo" style={{textAlign:'center'}}></input>
                      </div>
                    </div>
                  </div>

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