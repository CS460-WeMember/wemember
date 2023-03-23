import ReminderList from "../components/ReminderList.jsx";
import ReminderCard from "../components/ReminderCard.jsx";
import React, { useState, useEffect } from "react";
import pb from "../api/pocketbase.jsx";
import "../styles/ReminderPortal.css";

function ReminderPortal() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listIndex, setListIndex] = useState(0); //index of reminder to be displayed reminder card


  const fetchList = async () => {
    //get regular and adhoc lists from pocketbase
    setLoading(true);
    const regularList = await pb.collection("regular").getFullList({
      sort: "-created",
    });
    const adhocList = await pb.collection("adhoc").getFullList({
      sort: "+when",
    });

    //sort regularList based on time

    //change "when" field into date, hour and minute
    adhocList.forEach((record) => {
      const [date, time] = record.when.split(" ");
      const [hour, minute] = time.split(":");
      record.date = date;
      record.hour = Number(hour);
      record.minute = Number(minute);
      record.reminderDate = new Date(record.when);
    });
    console.log("adhocList");
    console.log(adhocList);

    var list = [];
    const today = new Date();

    adhocList.forEach((record) => {
      if (record.reminderDate.getDate() == today.getDate() &&
        record.reminderDate.getMonth() == today.getMonth()) {
          list.push(record);
      }
    });

    console.log(list);
    regularList.forEach((record) => {
      if (record.day == today.getDay() - 1 || record.day == -1) {
          list.push(record);
      }
    });

    list.sort((a, b) => {
      if (a.hour === b.hour) {
        return a.minute - b.minute;
      } else {
        return a.hour - b.hour;
      }
    });

    list.forEach((reminder) => {
      console.log("today hour" + today.getHours() + "reminder hour" + reminder.hour);
      if (
        today.getHours() > reminder.hour ||
        (today.getHours() == reminder.hour &&
          today.getMinutes() > reminder.hour)
      ) {
        reminder.state = "passed";
      } else {
        reminder.state = "upcoming";
      }
    });

    var i = 0;
    while (list[i].state == "passed") {
      i++;
    }
    setListIndex(i + 1);
    setList(list);
    setLoading(false);
  };

  // Define the debounce function to delay the fetchList call.
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };


  function regularSubscribe (input) {
    const reminder = input;
    const today = new Date();
    const tempList = list;
    if (reminder.day == today.getDay() - 1 || reminder.day == -1) {
      if (
        today.getHours() > reminder.hour ||
        (today.getHours() == reminder.hour &&
          today.getMinutes() > reminder.hour)
      ) {
        reminder.state = "passed";
      } else {
        reminder.state = "upcoming";
      }
      tempList.push(reminder);
      tempList.sort((a, b) => {
        if (a.hour === b.hour) {
          return a.minute - b.minute;
        } else {
          return a.hour - b.hour;
        }
      });
      console.log("subscribe reminder1")
      console.log(list);
      setList(tempList);
  }
  }
  pb.collection("regular").subscribe("*", function (e) {
    console.log("subscribe");
  });
  useEffect(() => {
  //   const debouncedFetchList = debounce(fetchList, 500);

  //   Subscribe to changes using the debouncedFetchList function.


  //   pb.collection("regular").subscribe("*", function (e) {
  //     debouncedFetchList();
  //   });

  //   pb.collection("adhoc").subscribe("*", function (e) {
  //     debouncedFetchList();
  //   });




  //   Fetch the list initially.
     fetchList();
   }, []);

  const [index, setIndex] = useState(0);

  function handleNewItem(itemChange) {
    setIndex(itemChange);
  }

  return (
    <div className="whole-screen">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="blue-sidebar">
            <ReminderList onItemChange={handleNewItem} list={list} />
          </div>
          <div className="white-display-screen">
            {list.length > 0 ? (
              <ReminderCard
                item={list[index]}
                backEndUrl={import.meta.env.VITE_API_URL}
              />
            ) : (
              <p>No reminders found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default ReminderPortal;
