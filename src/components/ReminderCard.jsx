import React, { useState, useEffect } from "react";
import Batch from "./Batch.jsx";
import "../styles/ReminderCard.css";
import { BiCheck } from "react-icons/bi";

const soundLevel = {
  off: 0,
  low: 0.3,
  mid: 0.6,
  high: 1,
};

const ReminderCard = ({ item, backEndUrl }) => {
  function handleTaskDone(event) {
    console.log("done button clicked!");
  }

  function getImageUrl(item) {
    if (!item.picture) {
      return null;
    } else {
      return (
        backEndUrl +
        "/api/files/" +
        item["@collectionName"] +
        "/" +
        item.id +
        "/" +
        item.picture
      );
    }
  }

  function getAudioUrl(item) {
    if (!item.audio) {
      return null;
    } else {
      return (
        backEndUrl +
        "/api/files/" +
        item["@collectionName"] +
        "/" +
        item.id +
        "/" +
        item.audio
      );
    }
  }

  const [audio, setAudio] = useState(new Audio(getAudioUrl(item)));
  if (audio) {
    if (item.options.sound === "off") {
      audio.volume = soundLevel.off;
    } else if (item.options.sound === "low") {
      audio.volume = soundLevel.low;
    } else if (item.options.sound === "mid") {
      audio.volume = soundLevel.mid;
    } else {
      audio.volume = soundLevel.high;
    }
    setAudio(audio);
  }
  console.log(audio);

  const myAudio = document.getElementById('myAudio');
  myAudio.play();

  //   console.log(item.options.sound);

  // useEffect(() => {
  //   if (audio) {
  //     if (item.options.sound === "off") {
  //       audio.volume = soundLevel.off
  //     } else if (item.options.sound === "low") {
  //       audio.volume = soundLevel.low
  //     } else if (item.options.sound === "mid") {
  //       audio.volume = soundLevel.mid
  //     } else {
  //       audio.volume = soundLevel.high
  //     }
  //     setAudio(audio);
  //   }
  //   document.addEventListener("click", playAudio);
  //   return () => {
  //     document.removeEventListener("click", playAudio);
  //   };
  // }, []);

  const image = (item) => {
    const itemPicture = getImageUrl(item);
    if (itemPicture == null) {
      return null;
    } else {
      return (
        <div className="reminder-image-container">
          <img src={itemPicture} />
        </div>
      );
    }
  };
  return (
    <div className="reminder-main-container">
      <audio id="myAudio" src={audio}></audio>
      {image(item)}
      {/* border flex aspect-2/1 min-w-[300px] w-3/12 md:w-1/2 lg:w-7/12 border-light-blue rounded-lg shadow-lg mt-10 rounded-b-lg text-dark-blue justify-center items-center */}
      <div className="reminder-text-container">
        <h1 className="reminder-text">
          {item.title}
          {/* <Batch itemHour={item.hour} itemMin ={item.minute}/> */}
        </h1>
      </div>
      <button className="done-btn" onClick={handleTaskDone}>
        <BiCheck className="done-btn-check-icon"></BiCheck>
        <text>I am done!</text>
      </button>
    </div>
  );
};
export default ReminderCard;
