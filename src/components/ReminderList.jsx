import "../styles/ReminderList.css";
import { useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";

const states = {
  upcoming: 0,
  passed: 1,
};

const ReminderList = ({ onItemChange, list }) => {
  const navigate = useNavigate();

  const items = [];

  for (let i = 0; i < list.length; i++) {
    items.push(list[i]);
  }

  function handleAddTask(event) {
    console.log("add a new task clicked!");
    navigate("config/settask");
  }

  const showItem = (itemIndex) => {
    onItemChange(itemIndex);
  };

  let itemList = items.map((item, index) => {
    let afterNoon = "AM";
    const itemHour = (() => {
      if (item.hour > 12) {
        afterNoon = "PM";
        return item.hour % 12;
      } else if (item.hour < 12) {
        return item.hour;
      } else {
        afterNoon = "PM";
        return item.hour;
      }
    })();

    const itemMinute = (() => {
      if (item.minute < 10) {
        return "0" + item.minute;
      }
      return item.minute;
    })();

    const [status, setStatus] = useState();

    useEffect(() => {
      const interval = setInterval(() => {
        const today = new Date();
        if (
          today.getHours() > item.hour ||
          (today.getHours() === item.hour && today.getMinutes() >= item.minute)
        ) {
          // passed; task done
          setStatus(states.passed);
        } else {
          // upcoming; haven't done
          setStatus(states.upcoming);
        }
      });
      return () => clearInterval(interval);
    }, [{itemHour}, {itemMinute}]);

    if (status == states.upcoming) {
      return (
        <li className="list-items" key={index} onClick={() => showItem(index)}>
          {itemHour}.{itemMinute} {afterNoon} - {item.title}
        </li>
      );
    } else if (status == states.passed) {
      return (
        <li className="list-items-done" key={index} onClick={() => showItem(index)}>
          <p className="flex justify-start w-[75%] truncate overflow-hidden overflow-ellipsis ">{itemHour}.{itemMinute} {afterNoon} - {item.title}</p>
          <BsFillCheckCircleFill className="w-[30px] ml-[10px] aspect-square" />
        </li>
      );
    }
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
