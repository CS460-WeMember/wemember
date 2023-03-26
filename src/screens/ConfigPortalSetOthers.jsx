import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import Select from 'react-select';
import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../global/PocketbaseURL";
import PocketBase from 'pocketbase';
import Modal from 'react-modal';
import selectSpecialDevicePic from "../assets/ConfigScreen_SpecialDevices.png";
import selectConfirmationCameraPic from "../assets/ConfigScreen_ConfirmationCamera.png";

function ConfigPortalSetTime() {
    const navigate = useNavigate();

    //setting the special devices used, and if confirmation camera is needed
    const [selectedDevice, setSelectedDevice] = useState("");
    const [confirmationCamera, setConfirmationCamera] = useState("");

    const handleDeviceSelection = (event) => {
      setSelectedDevice(event.target.value);
    };
    const handleConfirmationCameraSelection = (event) => {
      setConfirmationCamera(event.target.value);
    };

    async function handleFinishedButtonClick(event) {
        console.log("finished button clicked!");
        /*---------------------------------------
        CHECK THAT USER DIDNT LEAVE INPUTS BLANK
        ---------------------------------------*/
        if (selectedDevice == "") {
          openSelectDeviceModal();
        } else if (confirmationCamera == "") {
          openSelectCameraModal();
        } else {
          if (selectedDevice !== "nil") {
            /*-------------------------------
            UPLOAD TO DATABASE
            ---------------------------------*/
            //append device to formdata
            var formData = new FormData();
            formData.append("device", selectedDevice);
            formData.append("completeField", 2);

            //format the options JSON
            const options = {
              "light" : localStorage.getItem("light"),
              "brightness" : localStorage.getItem("brightness"),
              "sound" : localStorage.getItem("sound"),
              "confirmation" : confirmationCamera
            }
  
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
            
            //uploading device selection to database
            const uploadDeviceRes = await pb.collection(databaseCollection).update(recordId, formData);
            console.log("pocketbase device upload response in set others: ");
            console.log(uploadDeviceRes);

            //uploading options to database
            const uploadOptionsRes = await pb.collection(databaseCollection).update(recordId, {
                "options": options
            });
            console.log("pocketbase options upload response: ");
            console.log(uploadOptionsRes);
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
          localStorage.setItem("repeat", null);
          localStorage.setItem("recordId", null);
          //go back to the portal
          navigate("/");


        }

    }

    //handling the modal for device selection
    const [selectDeviceModalIsOpen, setSelectDeviceModalIsOpen] = useState(false);
    const openSelectDeviceModal = () => {
      setSelectDeviceModalIsOpen(true);
    }
    const closeSelectDeviceModal = () => {
      setSelectDeviceModalIsOpen(false);
    }

    //handling the modal for confirmation camera
    const [selectCameraModalIsOpen, setSelectCameraModalIsOpen] = useState(false);
    const openSelectCameraModal = () => {
      setSelectCameraModalIsOpen(true);
    }
    const closeSelectCameraModal = () => {
      setSelectCameraModalIsOpen(false);
    }

    return(
      <div className="grey-background">
        <Modal
            className="input-validation-modal"
            overlayClassName="input-validation-modal-overlay"
            isOpen={selectDeviceModalIsOpen}
            onRequestClose={closeSelectDeviceModal}
        >
            <h2>Please click one of the options!</h2>
            <img src={selectSpecialDevicePic}/>
            <button onClick={closeSelectDeviceModal}>Got it!</button>
        </Modal>
        <Modal
            className="input-validation-modal"
            overlayClassName="input-validation-modal-overlay"
            isOpen={selectCameraModalIsOpen}
            onRequestClose={closeSelectCameraModal}
        >
            <h2>Please click one of the options!</h2>
            <img src={selectConfirmationCameraPic}/>
            <button onClick={closeSelectCameraModal}>Got it!</button>
        </Modal>
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
                      <text className="question-text" style={{fontWeight: "bold"}}>
                        Are any special devices required? 
                      </text>
                      <div className="device-options-container">
                        <label>
                          <input
                          type="radio"
                          value="toothbrush"
                          checked={selectedDevice === "toothbrush"}
                          onChange={handleDeviceSelection}
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
                          onChange={handleDeviceSelection}
                          />
                          <text> 
                            Button 1
                          </text>
                        </label>
                        <label>
                          <input
                          type="radio"
                          value="nil"
                          checked={selectedDevice === "nil"}
                          onChange={handleDeviceSelection}
                          />
                          <text>
                            Button 2
                          </text>
                        </label>
                      </div>
                    </div>

                    <div className="task-incomplete-wrapper">
                      <text className="question-text" style={{fontWeight: "bold"}}>
                        Do you need a confirmation picture to be sent?
                      </text>
                      <div className="device-options-container">
                        <label>
                          <input
                          type="radio"
                          value="yes"
                          checked={confirmationCamera === "yes"}
                          onChange={handleConfirmationCameraSelection}
                          />
                          <text>
                            Yes
                          </text>
                        </label>
                        <label>
                          <input
                          type="radio"
                          value="no"
                          checked={confirmationCamera === "no"}
                          onChange={handleConfirmationCameraSelection}
                          />
                          <text>
                            No
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