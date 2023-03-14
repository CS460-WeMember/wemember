import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import Select from 'react-select';
import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfigPortalSetTime() {
    const navigate = useNavigate();

    //setting time amount
    const [timeAmount, setTimeAmount] = useState(30);
    function handleTimeAmountChange(event) {
        setTimeAmount(event.target.value);
        console.log("timeAmount is changed to: " + timeAmount);
    }

    //setting time unit
    const [timeUnit, setTimeUnit] = useState("min");
    function handleTimeUnitChange(event) {
      setTimeUnit(event.target.value);
      console.log("timeUnit is changed to: " + timeUnit);
    }

    //setting the special devices used
    const devices = [
      { value: 'toothbrush holder', label: 'Toothbrush Holder' },
      { value: 'confirmation camera', label: 'Confirmation Camera' },
    ];
    const [selectedDevices, setSelectedDevices] = useState([]);

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
                  <div className="main-input-container" style={{gap:"52px"}}>

                    <div className="task-incomplete-wrapper">
                      <text className="question-text">
                        If the task is incomplete, 
                      </text>
                      <div className="task-incomplete-input-container">
                        <text className="small-text">
                          notify the caretaker
                        </text>
                        <input 
                            className="time-amount-input-field" 
                            style={{outline:'none', color: "#146887"}}
                            type="text"
                            id="time-amount"
                            value={timeAmount}
                            onChange={handleTimeAmountChange}>
                        </input>
                        <div className="set-time-and-location-input-field">
                          <select 
                              id="dropdown" 
                              value={timeUnit} 
                              onChange={handleTimeUnitChange} 
                              style={{backgroundColor:"white", fontWeight:"normal"}} 
                              className="small-text"
                          >
                            <option value="min">mins</option>
                            <option value="option1">seconds</option>
                            <option value="option2">hours</option>
                            <option value="option3">days</option>
                          </select>
                        </div>
                        <text className="small-text">
                          after the task was supposed to end.
                        </text>
                      </div>
                    </div>

                    <div className="task-incomplete-wrapper">
                      <text className="question-text">
                        Are any special devices required? 
                      </text>
                      <Select
                        style={{outline:'none', color: "#146887"}}
                        options={devices}
                        value={selectedDevices}
                        onChange={setSelectedDevices}
                        isMulti
                      />

                    </div>


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