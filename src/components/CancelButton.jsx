import React, { Component } from 'react';
import {ImCross} from "react-icons/im";
import "../styles/CancelButton.css";
import { useNavigate } from 'react-router-dom';
import PocketBase from "pocketbase";
import url from "../global/PocketbaseURL";


function CancelButton({style, repeat, recordId}) {
    repeat = localStorage.getItem("repeat");
    recordId = localStorage.getItem("recordId");
    const navigate = useNavigate();

    console.log("recordId: " + recordId);

    async function handleClick(event) {
        if (!(repeat === "null") && !(recordId ==="null")) {
            var collection = "";
            if (repeat === "nil") {
                collection = "adhoc";
            } else {
                collection = "regular"
            }
            const pb = new PocketBase(url);
            const response = await pb.collection(collection).delete(recordId);
            localStorage.setItem("repeat", null);
            localStorage.setItem("recordId", null);
        }
        navigate("/");
    }

    return(
        <button style={style} onClick={handleClick}>
            <div className='circle' >
                <ImCross className='cross' ></ImCross>
            </div>
        </button>
    )
}

export default CancelButton;