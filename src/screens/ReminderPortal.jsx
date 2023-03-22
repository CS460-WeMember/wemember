import ReminderList from "../components/ReminderList.jsx";
import ReminderCard from "../components/ReminderCard.jsx";
import React, { useState, useEffect } from "react";
import pb from "../api/pocketbase.jsx";
import "../styles/ReminderPortal.css"

function ReminderPortal() {


  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const regularList = await pb.collection("regular").getFullList({
        sort: "-created",
      });
      // console.log("wtf");

      regularList.sort((a, b) => {
        if (a.hour === b.hour) {
          return a.minute - b.minute;
        } else {
          return a.hour - b.hour;
        }
      });

      const adhocList = await pb.collection("adhoc").getFullList({
        sort: "-created",
      });

      adhocList.sort((a, b) => {
        const timeA = new Date(a.when).getTime();
        const timeB = new Date(b.when).getTime();
        return timeA - timeB;
      });

      adhocList.forEach((record) => {
        const [date, time] = record.when.split(" ");
        const [hour, minute] = time.split(":");
        record.date = date;
        record.hour = Number(hour);
        record.minute = Number(minute);
        delete record.when;
      });

      const todayAdhoc = adhocList.filter((record) => {
        const today = new Date().toJSON().slice(0, 10);
        return today == record.date;
      });

      const data = regularList.concat(todayAdhoc);

      data.sort((a, b) => {
        if (a.hour === b.hour) {
          return a.minute - b.minute;
        } else {
          return a.hour - b.hour;
        }
      });
      setList(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    const debouncedFetchList = debounce(fetchList, 500);

    // Subscribe to changes using the debouncedFetchList function.
    pb.collection("regular").subscribe("*", function (e) {
      debouncedFetchList();
    });

    pb.collection("adhoc").subscribe("*", function (e) {
      debouncedFetchList();
    });

    // Fetch the list initially.
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
