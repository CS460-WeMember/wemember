import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfigPortalSetTask() {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState('');

    function handleTaskNameChange(event) {
      setTaskName(event.target.value);
    }

    function handleBackButtonClick(event) {
        console.log("back button clicked!");
        navigate("/")
    }

    function handleNextButtonClick(event) {
        console.log("next button clicked!");
        navigate("/config/settime");
    }

    var helpReceived = sessionStorage.getItem("helpMe");

    console.log(helpReceived);

    return(
        <div className="grey-background">
            <div className="blue-container">

                <div className="blue-grid">
                    <div className="progress-bar-container">
                        <ProgressBar setTask="active" setTime="inactive" setPicture="inactive" setLights="inactive" setOthers="inactive"/>
                    </div>
                    <div className="cancel-button-container">
                        <CancelButton className="cancel-button-positioning"/>
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