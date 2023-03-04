import React, { Component } from 'react';
import {ImCross} from "react-icons/im";
import "../styles/CancelButton.css";

function CancelButton({style}) {
    return(
        <button style={style} onClick={() => {console.log("clicked!")}}>
            <div className='circle' >
                <ImCross className='cross' ></ImCross>
            </div>
        </button>
    )
}

export default CancelButton;