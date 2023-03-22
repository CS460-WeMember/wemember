import "./Test.css";
import "../styles/ReminderCard.css";
import React, { useRef, useEffect, useState } from 'react';
import Batch from "../components/Batch.jsx";
import { useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import placeholder from "../assets/phoebe.jpg";

const ReminderCard = ({ item, backEndUrl }) => {
  function getImageUrl(item) {
    if (!item.picture) {
      return null;
    } else {
      return backEndUrl + "/api/files/"+ item["@collectionName"] + "/" + item.id + "/" + item.picture;
    }
  }  
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
        <div className="reminder-image-container">
            <img src={placeholder}/>
        </div>

      <div className="border flex aspect-2/1 min-w-[300px] w-3/12 md:w-1/2 lg:w-7/12 border-light-blue rounded-lg shadow-lg mt-10 rounded-b-lg text-dark-blue justify-center items-center">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl break-words">
          Title
          <Batch itemHour={12} itemMin ={30}/>
        </h1>
      </div>
    </div>
  );
};
export default ReminderCard;