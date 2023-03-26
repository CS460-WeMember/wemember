import ReminderList from "../components/ReminderList.jsx";
import React, { useState, useEffect, useRef } from "react";
import pb from "../api/pocketbase.jsx";
import "../styles/ReminderPortal.css";
import { BiCheck } from "react-icons/bi";

const soundLevel = {
  off: 0,
  low: 0.3,
  mid: 0.6,
  high: 1,
};

function ReminderPortal() {
  //checks if the task indicated by index is done
  const [done, setDone] = useState(false);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(new Audio());
  const timeoutSetRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  //this function returns a boolean. If the task is finished, return true.
  function isReminderDone(item) {
    const now = new Date();
    now.setUTCHours(now.getUTCHours() + 8);

    if (item["@collectionName"] == "regular") {
      const finished = item.last_finished;
      //if finished is empty or finished occurred earlier than today's date
      if (
        finished == "" ||
        finished.split(" ")[0] < now.toISOString().split("T")[0]
      ) {
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
        if (isReminderDone(list[i])) {
          list[i].state = "done";
        } else {
          list[i].state = "passed";
        }
      } else {
        list[i].state = "upcoming";
      }
      console.log(list[i].title);
      console.log(list[i].state);

      /*-----------------------------------------
      IF WE ARE AT THE FIRST ELEMENT IN THE LIST
      -----------------------------------------*/
      //if first element is the only element in the list
      if (i == 0 && list.length == 1) {
        //if the state is passed, change its state to current
        if (list[i].state == "passed") {
          list[i].state = "current";
        }
        // else if (list[i].state == "done") {
        //   list[i].state = "done";
        // }
        setIndex(i);
        //if first element is NOT the only element in the list and its state is passed
        //and the next element is upcoming, set its state to current
      } else if (i == 0 && list.length > 1) {
        if (list[i + 1].state == "upcoming") {
          if (list[i].state == "done") {
          } else {
          }
          list[i].state = "current";
          setIndex(i);
        }

        /*-----------------------------------------------------
      IF WE ARE NOT AT THE FIRST OR LAST ELEMENT IN THE LIST
      ------------------------------------------------------*/
      } else if (
        //if previous reminder is passed AND the reminder's
        //state is upcoming, set the previous reminder to current, and update the index
        (list[i - 1].state == "passed" || list[i - 1].state == "done") &&
        list[i].state == "upcoming"
      ) {
        if (list[i - 1].state == "passed") {
          list[i - 1].state = "current";
        }
        setIndex(i - 1);

        //else if the reminder is the last reminder, set the state to current.
      } else if (i == list.length - 1) {
        if (list[i].state == "passed") {
          list[i].state = "current";
          setIndex(i);
        }
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
    const day = today.getDay() == 0 ? 7 : today.getDay();

    adhocList.forEach((record) => {
      if (
        record.reminderDate.getDate() == today.getDate() &&
        record.reminderDate.getMonth() == today.getMonth()
      ) {
        list.push(record);
      }
    });
    console.log(today.getDay());
    regularList.forEach((record) => {
      if (
        today.getDay() - 1 == record.day ||
        (today.getDay() == 0 && record.day == 6) ||
        record.day == -1
      ) {
        today.setUTCHours(record.hour);
        today.setUTCMinutes(record.minute);
        today.setUTCMilliseconds(0);
        record.date = today.toISOString().split("T")[0];
        record.when =
          today.toISOString().split("T")[0] +
          " " +
          today.toISOString().split("T")[1].replace("Z", "");
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
    // const upcomingItems = list.filter(
    //   (item) => new Date(item.when).getTime() > new Date().getTime()
    // );
    // if (upcomingItems.length > 0) {
    //   const timeDifference =
    //     new Date(upcomingItems[0].when).getTime() - new Date().getTime();

    //   setTimeout(fetchList, timeDifference);
    // } else {
    //   setIndex(list.length - 1);
    // }
    timeoutFunction1(list);
    setLoading(false);
  };

  function timeoutFunction1(list1) {
    console.log("in timeout fuction before fore loop");
    const today = new Date();
    for (var i = 0; i < list1.length; i++) {
      // if (timeoutSetRef.current) {
      //   console.log("exiting timeout");
      //   break;
      // }
      // timeoutSetRef.current = true;
      const timeoutFunction = (i, time) => {
        //console.log(playing);
        // if (list1[i].audio != "") {
        //   if (!playing) {
        //     setPlaying(true);
        //     const audioURL = getAudioUrl(list1[i]);
        //     var audio = new Audio(audioURL);
        //     audio.volume = getVolumeFromOptions2(list1[i]);
        //     audio.play();
        //     setTimeout(() => {
        //       setPlaying(false);
        //     }, 30000);
        //   }
        //   //setCurrentAudio(audio);
        // }
        setIndex(i);
        if (list1.length > 1 && list1[i - 1].state == "current") {
          list1[i - 1].state = "passed";
        }
        console.log(list1[i].audio);

        list1[i].state = "current";
        console.log("timeout function" + time);
        playAudio2();
      };
      console.log(list1[i].title + ": " + list1[i].state);
      if (list1[i].state == "upcoming") {
        console.log("in timeout setting function");
        var time = 0;

        if (list1[i]["@collectionName"] == "adhoc") {
          console.log("in adhoc function");
          time = new Date(list1[i].when) - today.getTime();
          console.log(time);
          if (time > 10000) {
            window.setTimeout(timeoutFunction, time, i, time);
          }
        }

        if (list1[i]["@collectionName"] == "regular") {
          console.log("in regular function");
          // const string = "" + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "T" + list1[i].hour + ":" + list1[i].minute + ":00Z";
          // console.log(string);
          // console.log(new Date(string).toDateString + new Date(string).toTimeString());
          if (list1[i].hour == new Date().getHours()) {
            time = (list1[i].minute - new Date().getMinutes()) * 60000;
            console.log("1");
          } else if (list1[i].minute < new Date().getMinutes()) {
            time =
              ((list1[i].hour - new Date().getHours() + 1) * 60 +
                list1[i].minute +
                (60 - new Date().getMinutes())) *
              60000;
            console.log("2");
          } else {
            time =
              ((list1[i].hour - new Date().getHours() + 1) * 60 +
                (list1[i].minute - new Date().getMinutes())) *
              60000;
            console.log("3");
          }
          console.log(time);
          if (time > 10000) {
            window.setTimeout(timeoutFunction, time, i, time);
          }
        }
      }
    }
  }

  function playAudio(item) {
    if (item.audio != "") {
      const audioURL = getAudioUrl(item);
      var audio = new Audio(audioURL);
      audio.volume = getVolumeFromOptions2(item);
      audio.play();
    }
  }
  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.volume = getVolumeFromOptions();

  //     // Play the audio
  //     audioRef.current.play();
  //   }
  // }, [list[index]]);

  function playAudio2() {
    if (audioRef.current) {
      audioRef.current.volume = getVolumeFromOptions();

      // Play the audio
      audioRef.current.play();
    }
  }

  function getVolumeFromOptions2(item) {
    const vol = item.options.sound;
    if (vol) {
      if (parseInt(vol)) {
        console.log(parseInt(vol));
        return parseInt(vol) / 100;
      } else {
        console.log(vol);
        return soundLevel[vol];
      }
    } else {
      return 1; // Default volume level if options are not available or valid
    }
  }
  pb.collection("adhoc").subscribe("*", function (e) {
    fetchList();
  });

  pb.collection("regular").subscribe("*", function (e) {
    fetchList();
  });
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
    //update the finished timings to pocketbase
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

    //
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

  const audioRef = useRef(null);

  function getAudioUrl(item) {
    if (!item.audio) {
      return null;
    } else {
      return (
        import.meta.env.VITE_API_URL +
        "/api/files/" +
        item["@collectionName"] +
        "/" +
        item.id +
        "/" +
        item.audio
      );
    }
  }

  function getVolumeFromOptions() {
    const vol = list[index].options.sound;
    if (vol) {
      if (parseInt(vol)) {
        console.log(parseInt(vol));
        return parseInt(vol) / 100;
      } else {
        console.log(vol);
        return soundLevel[vol];
      }
    } else {
      return 1; // Default volume level if options are not available or valid
    }
  }

  // users need to allow this website to play audio
  // otherwise it will not autoplay
  // go settings > set sound
  // allow the website e.g. 127.0.0.1 (localhost)
  // useEffect(() => {
  //   currentAudio.play();
  // }, [currentAudio]);
  // useEffect(() => {
  //   console.log("are u the problem");
  //   timeoutFunction1();
  // }, [list]);

  const doneCard = (index) => {
    return (
      <div className="reminder-text-container">
        <h1 className="reminder-text" style={{ fontSize: "2rem" }}>
          Thank you for completing
        </h1>
        <text className="reminder-subtitle">{list[index].title}!</text>
      </div>
    );
  };

  if (loading) {
    return null;
  }

  return (
    <div className="whole-screen">
      <audio id="myAudio" autoPlay></audio>

      <div className="blue-sidebar">
        <ReminderList onItemChange={handleNewItem} list={list} index={index} />
      </div>
      <div className="white-display-screen">
        {list[index].state == "done" ? (
          <div className="reminder-main-container">{doneCard(index)}</div>
        ) : (
          <div className="reminder-main-container">
            {getAudioUrl(list[index]) ? (
              <audio src={getAudioUrl(list[index])} ref={audioRef} />
            ) : (
              ""
            )}
            <div className="reminder-main-content-wrapper">
              {image(list[index])}
              <div className="reminder-text-container">
                <text className="reminder-text">{list[index].title}</text>
              </div>
            </div>
            {list[index].device == "confirmation camera" && (
              <text className="reminder-subtitle">
                Please take a photo when you are done!
              </text>
            )}
            <button className="done-btn" onClick={handleTaskDone}>
              <BiCheck className="done-btn-check-icon"></BiCheck>
              <text>I am done!</text>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ReminderPortal;
