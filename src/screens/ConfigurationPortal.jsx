import CancelButton from "../components/CancelButton";
import ProgressBar from "../components/ProgressBar";
import "../styles/ConfigPortal.css";

function ConfigurationPortal() {
    return(
        <div className="grey-background">
            <div className="blue-container">

                <div className="blue-grid">
                    <div className="progress-bar-container">
                        <ProgressBar setTask="done" setTime="done" setPicture="done" setLights="active" setOthers="active"/>
                    </div>
                    <div className="cancel-button-container">
                        <CancelButton className="cancel-button-positioning"/>
                    </div>
                </div>

                <div className="semi-circle">

                </div>
            </div>
        </div>
    )
}

export default ConfigurationPortal;