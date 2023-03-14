import "./Test.css";
import "../styles/ProgressBar.css";
import React, { useRef, useEffect, useState } from 'react';

function AudioRecorder() {
    const [audioFile, setAudioFile] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null);
    
    function handleAudioChange(event) {
      const selectedFile = event.target.files[0];
      const previewURL = URL.createObjectURL(selectedFile);
  
      setAudioFile(selectedFile);
      setAudioPreview(previewURL);
    }
    
    return (
      <div>
        <input type="file" onChange={handleAudioChange} />
  
        {audioPreview && (
          <audio controls src={audioPreview}>
            Your browser does not support the audio tag.
          </audio>
        )}
      </div>
    );
  }

export default AudioRecorder;