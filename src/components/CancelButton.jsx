import React, { Component } from 'react';
import {ImCross} from "react-icons/im";
import "../styles/CancelButton.css";
import { useNavigate } from 'react-router-dom';

function CancelButton({style}) {
    const navigate = useNavigate();
    return(
        <button style={style} onClick={() => {navigate("/")}}>
            <div className='circle' >
                <ImCross className='cross' ></ImCross>
            </div>
        </button>
    )
}

export default CancelButton;