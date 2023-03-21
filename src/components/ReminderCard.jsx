import React, { useState, useEffect } from "react";
import Batch from "./Batch.jsx";

const soundLevel = {
  off: 0,
  low: 0.3,
  mid: 0.6,
  high: 1,
}

const ReminderCard = ({ item, backEndUrl }) => {
  function getImageUrl(item) {
    if (!item.picture) {
      return null;
    } else {
      return backEndUrl + "/api/files/"+ item["@collectionName"] + "/" + item.id + "/" + item.picture;
    }
  }

  function getAudioUrl(item) {
    if (!item.audio) {
      return null;
    } else {
      return backEndUrl + "/api/files/"+ item["@collectionName"] + "/" + item.id + "/" + item.audio;
    }
  }

  const [audio, setAudio] = useState(new Audio(getAudioUrl(item)));

  console.log(item.options.sound);

  useEffect(() => {
    if (audio) {
      if (item.options.sound === "off") {
        audio.volume = soundLevel.off
      } else if (item.options.sound === "low") {
        audio.volume = soundLevel.low
      } else if (item.options.sound === "mid") {
        audio.volume = soundLevel.mid
      } else {
        audio.volume = soundLevel.high
      }
      setAudio(audio);
    }
    document.addEventListener("click", playAudio);
    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  const playAudio = () => {
    audio.play();
  };

  const image = (item) => {
    const itemPicture = getImageUrl(item);
    if (itemPicture == null) {
      return null;
    } else {
      return (
        <div className="border border-light-blue rounded-lg shadow-lg aspect-2/1 w-3/12 md:w-1/2 lg:w-7/12">
          <figure>
            <img
              className="object-fill rounded-lg aspect-2/1"
              src={itemPicture}
            />
          </figure>
        </div>
      );
    }
  };
  return (
    <div className="grid place-items-center aspect-square">
      {image(item)}

      <div className="border flex aspect-2/1 min-w-[300px] w-3/12 md:w-1/2 lg:w-7/12 border-light-blue rounded-lg shadow-lg mt-10 rounded-b-lg text-dark-blue justify-center items-center">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl break-words">
          {item.title} 
          <Batch itemHour={item.hour} itemMin ={item.minute}/>
        </h1>
      </div>
    </div>
  );
};
export default ReminderCard;