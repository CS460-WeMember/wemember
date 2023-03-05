import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { useState } from "react";

function ConfigPortalSetTask() {
    const [taskName, setTaskName] = useState('');

    function handleTaskNameChange(event) {
      setTaskName(event.target.value);
    }

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

                        <div className="input-container">
                            <div className="input-task-name-container">
                                <text className="question-text">
                                    What do you need to do?
                                </text>
                                <input 
                                    className="answer-box" 
                                    style={{outline:'none'}}
                                    type="text"
                                    id="my-task-name"
                                    value={taskName}
                                    onChange={handleTaskNameChange}>
                                </input>
                            </div>

                        </div>

                        <button className="back-button">
                            <BiLeftArrowAlt className="arrow-icon"></BiLeftArrowAlt>
                            <text className="button-text">
                                Back
                            </text>
                        </button>

                        <button className="next-button">
                            <text className="button-text">
                                Next
                            </text>
                            <BiRightArrowAlt className="arrow-icon"></BiRightArrowAlt>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfigPortalSetTask;