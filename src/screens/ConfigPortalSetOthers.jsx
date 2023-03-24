import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import Select from 'react-select';
import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../global/PocketbaseURL";
import PocketBase from 'pocketbase';

function ConfigPortalSetTime() {
    const navigate = useNavigate();

    //setting the special devices used
    const [selectedDevice, setSelectedDevice] = useState("");

    const handleRadioChange = (event) => {
      setSelectedDevice(event.target.value);
    };

    async function handleFinishedButtonClick(event) {
        console.log("finished button clicked!");

        if (selectedDevice !== "nil") {
          /*-------------------------------
          UPLOAD TO DATABASE
          ---------------------------------*/
          //append device to formdata
          var formData = new FormData();
          formData.append("device", selectedDevice);
          formData.append("completeField", 2);

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
  
          const response = await pb.collection(databaseCollection).update(recordId, formData);
          console.log("pocketbase device upload response in set others: ");
          console.log(response);
        }

        if (selectedDevice === "nil") {
          var formData = new FormData();
          formData.append("completeField", 2);

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
  
          const response = await pb.collection(databaseCollection).update(recordId, formData);
          console.log("pocketbase device upload response in set others: ");
          console.log(response);
        }

        //go back to the portal
        navigate("/");
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
                    <CancelButton 
                        className="cancel-button-positioning" 
                        repeat={localStorage.getItem("repeat")}
                        recordId = {localStorage.getItem("recordId")}
                    />
                </div>
              </div>

              <div className="semi-circle">
                <div className="white-grid">
                  <div className="main-input-container" style={{gap:"52px"}}>

                    <div className="task-incomplete-wrapper">
                      <text className="question-text">
                        Are any special devices required? 
                      </text>
                      <div className="device-options-container">
                        <label>
                          <input
                          type="radio"
                          value="toothbrush"
                          checked={selectedDevice === "toothbrush"}
                          onChange={handleRadioChange}
                          />
                          <text>
                            Toothbrush holder
                          </text>
                        </label>
                        <label>
                          <input
                          type="radio"
                          value="confirmation camera"
                          checked={selectedDevice === "confirmation camera"}
                          onChange={handleRadioChange}
                          />
                          <text> 
                            Confirmation Camera
                          </text>
                        </label>
                        <label>
                          <input
                          type="radio"
                          value="nil"
                          checked={selectedDevice === "nil"}
                          onChange={handleRadioChange}
                          />
                          <text>
                            None are needed!
                          </text>
                        </label>
                      </div>

                    </div>


                  </div>

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