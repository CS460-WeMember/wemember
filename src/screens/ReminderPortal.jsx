import ReminderList from "../components/ReminderList.jsx";
import ReminderCard from "../components/ReminderCard.jsx";
import React, { useState, useEffect } from "react";
import pb from "../api/pocketbase.jsx";
import "../styles/ReminderPortal.css";
import { BiCheck } from "react-icons/bi";

function ReminderPortal() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  function getAudioUrl(item) {
    if (!item.audio) {
      return null;
    } else {
      return import.meta.env.VITE_API_URL + "/api/files/"+ item["@collectionName"] + "/" + item.id + "/" + item.audio;
    }
  }
  const [audio, setAudio] = useState(new Audio());

  const playAudio = () => {
    if (audio) {
      if (list[index].options.sound === "off") {
        audio.volume = soundLevel.off
      } else if (list[index].options.sound === "low") {
        audio.volume = soundLevel.low
      } else if (list[index].options.sound === "mid") {
        audio.volume = soundLevel.mid
      } else {
        audio.volume = soundLevel.high
      }
      setAudio(audio);
    }
    audio.play();

  };

  function assignState(list) {
    const today = new Date();
    for (var i = 0; i < list.length; i++) {
      // if ((today.getHours() == list[i].hour && today.getMinutes() == list[i].minute) || list[i].state == "current-after") {
      //   list[i].state = "current-after";
      // }
      if (today.getHours() == list[i].hour && today.getMinutes() == list[i].minute) {
        // console.log("play audio");
        // setAudio(new Audio(getAudioUrl(list[i])));
        // playAudio();
      }
      if (
        today.getHours() > list[i].hour ||
        (today.getHours() == list[i].hour &&
          today.getMinutes() > list[i].minute)
      ) {//if current time is more than the task time, set state to passed
        list[i].state = "passed";
      } else {
        list[i].state = "upcoming";
      }
      if ( 
        //if first or last reminder, or if previous reminder is passed AND the reminder's
        //state is upcoming, set the previous reminder to current, and update the index
        (i == 0 || list[i - 1].state == "passed" ) &&
        list[i].state == "upcoming"
      ) {
        list[i - 1].state = "current";
        setIndex(i-1);

      } else if (
        i == list.length - 1
      ) {
        list[i].state = "current";
        setIndex(i);
      }
    }
  }

  const fetchList = async () => {
    setLoading(true);
    //get regular and adhoc lists from pocketbase
    const regularList = await pb.collection("regular").getFullList({
      sort: "-created",
    });
    const adhocList = await pb.collection("adhoc").getFullList({
      sort: "+when",
    });

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
      if (
        record.reminderDate.getDate() == today.getDate() &&
        record.reminderDate.getMonth() == today.getMonth()
      ) {
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

    assignState(list);
    setList(list);
    setLoading(false);
    console.log("====================================");
    console.log(list);
    console.log("====================================");
  };


  useEffect(() => {
    fetchList();

    pb.collection("adhoc").subscribe("*", function (e) {
      fetchList();
    });

    pb.collection("regular").subscribe("*", function (e) {
      fetchList();
    });
  }, []);


  function handleNewItem(itemChange) {
    setIndex(itemChange);
  }

  function handleTaskDone(event) {
    console.log("done button clicked!");
  }

  function getImageUrl(item) {
    if (!item.picture) {
      return null;
    } else {
      return (
        import.meta.env.VITE_API_URL +
        "/api/files/" +
        item["@collectionName"] +
        "/" +
        item.id +
        "/" +
        item.picture
      );
    }
  }

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
              <div className="reminder-main-container">
                {image(list[index])}
                {/* border flex aspect-2/1 min-w-[300px] w-3/12 md:w-1/2 lg:w-7/12 border-light-blue rounded-lg shadow-lg mt-10 rounded-b-lg text-dark-blue justify-center items-center */}
                <div className="reminder-text-container">
                  <h1 className="reminder-text">
                    {list[index].title}
                    {/* <Batch itemHour={item.hour} itemMin ={item.minute}/> */}
                  </h1>
                </div>
                <button className="done-btn" onClick={handleTaskDone}>
                  <BiCheck className="done-btn-check-icon"></BiCheck>
                  <text>I am done!</text>
                </button>
              </div>
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
