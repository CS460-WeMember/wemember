import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import {ImCross} from "react-icons/im";
import { BsFillArrowUpLeftSquareFill } from "react-icons/bs";
import helperimage from "../assets/ConfigScreen_TaskName.png";


function ConfigPortalSetTask() {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState('');

    function handleTaskNameChange(event) {
      setTaskName(event.target.value);
      console.log("Task name set: " + taskName);
    }

    function handleBackButtonClick(event) {
        console.log("back button clicked!");
        navigate("/");
    }

    function handleNextButtonClick(event) {
        console.log("next button clicked!");

        //Input validation if title is null
        if (taskName === "") {
            setModalIsOpen(true);
            console.log("taskname is empty!");
        } else {
            localStorage.setItem("title", taskName);
            console.log("Final task name in localStorage: " + localStorage.getItem("title"));
            navigate("/config/settime");
        }
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
      setModalIsOpen(true);
    }
    const closeModal = () => {
      setModalIsOpen(false);
    }

    return(
        <div className="grey-background">
            <Modal
                className="input-validation-modal"
                overlayClassName="input-validation-modal-overlay"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <h2>Please type what you need to do in this box! :)</h2>
                <img src={helperimage}></img>
                <button onClick={closeModal}>Got it!</button>
            </Modal>

            <div className="blue-container">

                <div className="blue-grid">
                    <div className="progress-bar-container">
                        <ProgressBar setTask="active" setTime="inactive" setPicture="inactive" setLights="inactive" setOthers="inactive"/>
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
                            <div className="set-task-name-container">
                                <text className="question-text">
                                    What do you need to do?
                                </text>
                                <input 
                                    className="task-name-input-field" 
                                    style={{outline:'none'}}
                                    type="text"
                                    id="my-task-name"
                                    value={taskName}
                                    onChange={handleTaskNameChange}>
                                </input>
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