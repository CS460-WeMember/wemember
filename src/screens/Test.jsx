import "./Test.css";
import "../styles/ReminderCard.css";
import React, { useRef, useEffect, useState } from 'react';
import Batch from "../components/Batch.jsx";
import { useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import placeholder from "../assets/phoebe.jpg";

function Test() {
  const[done, setDone] = useState(false);

  return(
        <text className="reminder-text">
          Thank you for completing this task!
        </text>
  )
}

export default Test;