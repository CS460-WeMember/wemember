import "../styles/ReminderList.css";
import { useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";

const states = {
  upcoming: 0,
  passed: 1,
};

const ReminderList = ({ onItemChange, list, index }) => {
  const test = list[index];
  const navigate = useNavigate();

  const items = [];

  for (let i = 0; i < list.length; i++) {
    items.push(list[i]);
  }

  function handleAddTask(event) {
    console.log("add a new task clicked!");
    navigate("config/settask");
  }

  let itemList = items.map((item, index) => {
    let afterNoon = "am";
    const itemHour = (() => {
      if (item.hour > 12) {
        afterNoon = "pm";
        return item.hour % 12;
      } else if (item.hour < 12) {
        return item.hour;
      } else {
        afterNoon = "pm";
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
    const [current, setCurrent] = useState(0);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     const today = new Date();
    //     if (
    //       today.getHours() > item.hour ||
    //       (today.getHours() === item.hour && today.getMinutes() >= item.minute)
    //     ) {
    //       // passed; task done
    //       if (index == items.length - 1) {
    //         setCurrent(0);
    //         showItem(0);
    //       }
    //       setStatus(states.passed);
    //     } else {
    //       // upcoming; haven't done
    //       if (
    //         today.getHours() > list[current].hour ||
    //         (today.getHours() === list[current].hour &&
    //           today.getMinutes() >= list[current].minute)
    //       ) {
    //         setCurrent(current + 1);
    //         showItem(current+1);
    //       }
    //       setStatus(states.upcoming);
    //     }
    //   });
    //   return () => clearInterval(interval);
    // }, [{ itemHour }, { itemMinute }]);

    const showItem = (current) => {
      onItemChange(current);
    };

    if (item.state == "upcoming") {
      return (
        <li className="list-items" key={index}>
          {itemHour}.{itemMinute}{afterNoon} - {item.title}
        </li>
      );
    } else if (item.state == "passed") {
      return (
        <li className="list-items-done" key={index}>
            {itemHour}.{itemMinute}{afterNoon} - {item.title}
        </li>
      );
    } else if (item.state == "current") {
      return (
        <li className="list-items-current" key={index}>
            {itemHour}.{itemMinute}{afterNoon} - {item.title}
        </li>
      );
    } else if (item.state == "done") {
      return (
        <li className="list-items-done" key={index}>
            {itemHour}.{itemMinute}{afterNoon} - {item.title}
            <BsFillCheckCircleFill className="w-[30px] ml-[10px] aspect-square" />
        </li>
      );
    }
  });

  return (
    <div className="list-layout">
      <div className="reminder-portal-header">
        <h1>Hello!</h1>
        <p className="pb-10">Here are your tasks for today:</p>
      </div>
      <ul>{itemList}</ul>
      <button className="config-btn" onClick={handleAddTask}>
            Make a new reminder
      </button>
    </div>
  );
};
export default ReminderList;
