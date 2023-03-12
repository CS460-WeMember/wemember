import "../styles/ReminderList.css";
import { useNavigate } from "react-router-dom";
import PocketBase from "pocketbase";
import React, { useState } from "react";

const pb = new PocketBase("http://129.150.56.59:8090");

const list = await pb.collection("regular").getFullList({
  sort: "-created",
});


const ReminderList = ({onItemChange}) => {
  const navigate = useNavigate();

  const items = [];

  for (let i = 0; i < list.length; i++) {
    items.push(list[i]);
  }
  
  function handleAddTask(event) {
    console.log("add a new task clicked!");
    navigate("config/settask");
  }

  const showItem = (item) => {
    onItemChange(JSON.stringify(item));
  }

  let itemList = items.map((item, index) => {
    return (
      <li className="list-items" key={index} onClick={() => showItem(item)}>
        {index + 1} - {item.title}
      </li>
    );
  });

  return (
    <div className="list-layout text-white">
      <div>
        <h1 className="text-3xl font-bold pt-10">Hello!</h1>
        <p className="pb-10 ">Here are your tasks for today:</p>
      </div>
      
      <ul>{itemList}</ul>
      <button className="config-btn" onClick={handleAddTask}>
        Make a new reminder
      </button>
    </div>
  );
};
export default ReminderList;
