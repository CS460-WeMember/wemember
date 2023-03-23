import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import Modal from "react-modal";
import "../styles/ConfigPortal.css";
import { BiRightArrowAlt, BiLeftArrowAlt, BiTimeFive } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function ConfigPortalSetTime() {
    const navigate = useNavigate();

    const [date, setDate] = useState(null);
    const handleDateChange= (event) => {
        setDate(event.target.value);
    }

    const [startTime, setStartTime] = useState(null);
    const handleStartChange = (event) => {
        setStartTime(event.target.value);
    }

    const [endTime, setEndTime] = useState(null);
    const handleEndChange = (event) => {
        setEndTime(event.target.value);
    }

    const [repeat, setRepeat] = useState('');
    const handleRepeatChange = (event) => {
      setRepeat(event.target.value);
    };

    //check if the inputs are null, this is for the input validation modal
    const [dateIsNull, setDateIsNull] = useState(false);
    const [startTimeIsNull, setStartTimeIsNull] = useState(false);
    const [endTimeIsNull, setEndTimeIsNull] = useState(false);
    const [repeatIsNull, setRepeatIsNull] = useState(false);

    /*Anything related to the input validation modal*/
    const [dateModalIsOpen, setDateModalIsOpen] = useState(false);
    function closeDateModal() {
        setDateModalIsOpen(false);
    }
    const [startTimeModalIsOpen, setStartTimeModalIsOpen] = useState(false);
    function closeStartTimeModal() {
        setStartTimeModalIsOpen(false);
    }
    const [endTimeModalIsOpen, setEndTimeModalIsOpen] = useState(false);
    function closeEndTimeModal() {
        setEndTimeModalIsOpen(false);
    }
    const [repeatModalIsOpen, setRepeatModalIsOpen] = useState(false);
    function closeRepeatModal() {
        setRepeatModalIsOpen(false);
    }

    useEffect(() => {
        if (date === "" || date=== null) {
            setDateIsNull(true);
        } else {
            setDateIsNull(false);
        }

        if (startTime === "" || startTime=== null) {
            setStartTimeIsNull(true);
        } else {
            setStartTimeIsNull(false);
        }

        if (endTime === "" || endTime=== null) {
            setEndTimeIsNull(true);
        } else {
            setEndTimeIsNull(false);
        }

        if (repeat === "" || repeat=== null) {
            setRepeatIsNull(true);
        } else {
            setRepeatIsNull(false);
        }
    }, [date, startTime, endTime, repeat]);

    function handleBackButtonClick(event) {
        console.log("back button clicked!");
        navigate("/config/settask");
    }

    function handleNextButtonClick(event) {
        if (dateIsNull) {
            setDateModalIsOpen(true);
        } else if (startTimeIsNull) {
            setStartTimeModalIsOpen(true);
        } else if (endTimeIsNull) {
            setEndTimeModalIsOpen(true);
        } else if (repeatIsNull) {
            setRepeatModalIsOpen(true);
        } else {
            console.log("next button clicked!");
            navigate("/config/setpicture");
            localStorage.setItem("date", date);
            localStorage.setItem("startTime", startTime);
            localStorage.setItem("endTime", endTime);
            localStorage.setItem("repeat", repeat);
            console.log("date: " + localStorage.getItem("date") + ", start time: " +  localStorage.getItem("startTime") + ", end time: " +  localStorage.getItem("endTime")  + ", repeat: " +  localStorage.getItem("repeat") );
        }
    }
    

    return(
        <div className="grey-background">

            <Modal
                className="input-validation-modal"
                overlayClassName="input-validation-modal-overlay"
                isOpen={dateModalIsOpen}
                onRequestClose={closeDateModal}
            >
                <h2>Please enter the date!</h2>
                {/* <img src={helperimage}></img> */}
                <button onClick={closeDateModal}>Got it!</button>
            </Modal>

            <Modal
                className="input-validation-modal"
                overlayClassName="input-validation-modal-overlay"
                isOpen={startTimeModalIsOpen}
                onRequestClose={closeStartTimeModal}
            >
                <h2>Please enter the start time!</h2>
                {/* <img src={helperimage}></img> */}
                <button onClick={closeStartTimeModal}>Got it!</button>
            </Modal>

            <Modal
                className="input-validation-modal"
                overlayClassName="input-validation-modal-overlay"
                isOpen={endTimeModalIsOpen}
                onRequestClose={closeEndTimeModal}
            >
                <h2>Please enter the end time!</h2>
                {/* <img src={helperimage}></img> */}
                <button onClick={closeEndTimeModal}>Got it!</button>
            </Modal>

            <Modal
                className="input-validation-modal"
                overlayClassName="input-validation-modal-overlay"
                isOpen={repeatModalIsOpen}
                onRequestClose={closeRepeatModal}
            >
                <h2>Please enter how often you would like this reminder to repeat!</h2>
                {/* <img src={helperimage}></img> */}
                <button onClick={closeRepeatModal}>Got it!</button>
            </Modal>

            <div className="blue-container">

                <div className="blue-grid">
                  <div className="progress-bar-container">
                    <ProgressBar 
                      setTask="done" 
                      setTime="active" 
                      setPicture="inactive" 
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
                        <div className="set-time-and-location-container">

                          <text className="question-text">
                            When and where should the task be completed?
                          </text>

                          <div className="set-time-and-location-input-fields">

                            <div className="input-field-wrapper">
                              <text className="small-text">
                                Date
                              </text>
                              <div className="set-time-and-location-input-field">
                                <input 
                                  className="small-text" 
                                  type="date" 
                                  id="date-input" 
                                  name="date" 
                                  style={{outline:'none'}}
                                  onChange={handleDateChange}
                                />
                              </div>
                            </div>

                            <div className="input-field-wrapper">
                              <text className="small-text">
                                Start Time
                              </text>
                              <div className="set-time-and-location-input-field">
                                <input 
                                  className="small-text" 
                                  type="time" 
                                  id="start-time-input" 
                                  name="start-time" 
                                  style={{outline:'none'}}
                                  onChange={handleStartChange}
                                  placeholder={localStorage.getItem("startTime")}
                                />
                                <BiTimeFive className="icon"/>
                              </div>
                            </div>

                            <div className="input-field-wrapper">
                              <text className="small-text">
                                End Time
                              </text>
                              <div className="set-time-and-location-input-field">
                                <input 
                                  className="small-text" 
                                  type="time" 
                                  id="start-time-input" 
                                  name="start-time" 
                                  style={{outline:'none'}}
                                  onChange={handleEndChange}
                                />
                                <BiTimeFive className="icon"/>
                              </div>
                            </div>

                            <div className="input-field-wrapper">
                              <text className="small-text">
                                  How Often?
                              </text>
                              <div className="set-time-and-location-input-field">
                                <select 
                                    id="dropdown" 
                                    value={repeat} 
                                    onChange={handleRepeatChange} 
                                    style={{backgroundColor:"white", fontWeight:"normal"}} 
                                    className="small-text"
                                  >
                                    <option value="">Choose how often</option>
                                    <option value="nil">No repeat</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                </select>
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

export default ConfigPortalSetTime;