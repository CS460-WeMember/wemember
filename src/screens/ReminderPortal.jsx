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

  // function getAudioUrl(item) {
  //   if (!item.audio) {
  //     return null;
  //   }
  //   setAudio(
  //     import.meta.env.VITE_API_URL +
  //       "/api/files/" +
  //       item["@collectionName"] +
  //       "/" +
  //       item.id +
  //       "/" +
  //       item.audio
  //   );

  //   if (audio) {
  //     if (list[index].options.sound === "off") {
  //       audio.volume = soundLevel.off;
  //     } else if (list[index].options.sound === "low") {
  //       audio.volume = soundLevel.low;
  //     } else if (list[index].options.sound === "mid") {
  //       audio.volume = soundLevel.mid;
  //     } else {
  //       audio.volume = soundLevel.high;
  //     }
  //     setAudio(audio);
  //   }
  //   // return audio;

  //   // audio.play();
  // }
  // const [audio, setAudio] = useState(new Audio(getAudioUrl(list[index])));

  // const playAudio = () => {
  //   if (audio) {
  //     if (list[index].options.sound === "off") {
  //       audio.volume = soundLevel.off;
  //     } else if (list[index].options.sound === "low") {
  //       audio.volume = soundLevel.low;
  //     } else if (list[index].options.sound === "mid") {
  //       audio.volume = soundLevel.mid;
  //     } else {
  //       audio.volume = soundLevel.high;
  //     }
  //     setAudio(audio);
  //   }
  //   audio.play();
  // };

  //this function returns a boolean. If the task is finished, return true.
  function getStateFromPb(item) {
    const now = new Date();
    now.setUTCHours(now.getUTCHours() + 8);

    if (item["@collectionName"] == "regular") {
      const finished = item.last_finished;
      //if finished is empty or finished occurred earlier than today's date
      if (finished == '' || finished.split(' ')[0] < now.toISOString().split('T')[0]) {
        return false;
      }
    } else {
      const finished = item.finished;
      if (finished == "") {
        return false;
      }
    }

    return true;
  }

  function assignState(list) {
    const today = new Date();
    for (var i = 0; i < list.length; i++) {
      /*-----------------------------------------
      SET INITIAL STATES
      -----------------------------------------*/
      //if current time is past the time of the reminder, set the state to passed
      if (
        today.getHours() > list[i].hour ||
        (today.getHours() == list[i].hour &&
          today.getMinutes() >= list[i].minute)
      ) {
        //if current time is more than the task time, set state to passed
        if (getStateFromPb(list[i])) {
          list[i].state = "done";
        } else {
          list[i].state = "passed";
        }
      } else {
        list[i].state = "upcoming";
      }

      /*-----------------------------------------
      IF WE ARE AT THE FIRST ELEMENT IN THE LIST
      -----------------------------------------*/
      //if first element is the only element in the list
      if (i == 0 && list.length == 1) {
        //if the state is passed, change its state to current
        if (list[i].state == "passed") {
          list[i].state = "current";
          setIndex(i);
        }

        //if first element is NOT the only element in the list and its state is passed
        //and the next element is upcoming, set its state to current
      } else if (i == 0 && list.length > 1) {
        if (list[i + 1].state == "upcoming") {
          list[i].state = "current";
          setIndex(i);
        }

        /*---------------------------------------------
      IF WE ARE NOT AT THE FIRST ELEMENT IN THE LIST
      ----------------------------------------------*/
      } else if (
        //if previous reminder is passed AND the reminder's
        //state is upcoming, set the previous reminder to current, and update the index
        list[i - 1].state == "passed" &&
        list[i].state == "upcoming"
      ) {
        list[i - 1].state = "current";
        setIndex(i - 1);

        //else if the reminder is the last reminder, set the state to current.
      } else if (i == list.length - 1 && list[i - 1].state == "passed") {
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

    regularList.forEach((record) => {
      if (record.day == today.getDay() - 1 || record.day == -1) {
        record.date = today.toISOString().split("T")[0];
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
    for (var i = 0; i < list.length; i++) {
      if (list[i].state == "upcoming") {
        const timeoutFunction = (i, time) => {
          setIndex(i);
          if (list.length > 1 && list[i - 1].state == "current") {
            list[i - 1].state = "passed";
          }
          list[i].state = "current";
          console.log("timeout function" + time);
          console.log(i);
        };
        var time = 0;

        if (list[i]["@collectionName"] == "adhoc") {
          time = new Date(list[i].when) - new Date().getTime();
          console.log(time);
          window.setTimeout(timeoutFunction, time, i, time);
        }

        if (list[i]["@collectionName"] == "regular") {
          // const string = "" + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "T" + list[i].hour + ":" + list[i].minute + ":00Z";
          // console.log(string);
          // console.log(new Date(string).toDateString + new Date(string).toTimeString());
          if (list[i].hour == new Date().getHours()) {
            time = (list[i].minute - new Date().getMinutes()) * 60000;
            console.log("1");
          } else if (list[i].minute < new Date().getMinutes()) {
            time =
              ((list[i].hour - new Date().getHours() + 1) * 60 +
                list[i].minute +
                (60 - new Date().getMinutes())) *
              60000;
            console.log("2");
          } else {
            time =
              ((list[i].hour - new Date().getHours() + 1) * 60 +
                (list[i].minute - new Date().getMinutes)) *
              60000;
            console.log("3");
          }
          console.log(time);
          window.setTimeout(timeoutFunction, time, i, time);
        }
      }
    }
    setList(list);
    setLoading(false);
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

  const handleTaskDone = async (event) => {
    const now = new Date();
    now.setUTCHours(now.getUTCHours() + 8);

    if (list[index]["@collectionName"] == "regular") {
      const record = await pb.collection("regular").update(list[index].id, {
        last_finished: now.toUTCString(),
      });
    } else {
      const record = await pb.collection("adhoc").update(list[index].id, {
        finished: now.toUTCString(),
      });
    }
    console.log("done button clicked!");
  };

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
      <audio id="myAudio" autoPlay></audio>
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
