import "./Test.css";
import "../styles/ProgressBar.css";
import React, { useRef, useEffect } from 'react';

function Line() {
  return(
        <div className="line-container">
            <div className="active-line"></div>
        </div>
  )
}

export default Line;