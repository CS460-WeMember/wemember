import ReminderList from "../components/ReminderList.jsx";
import ReminderCard from "../components/ReminderCard.jsx";
import React, { useState, useEffect } from "react";
import pb from "../api/pocketbase.jsx";

const regularList = await pb.collection("regular").getFullList({
  sort: "-created",
});

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

adhocList.sort((a,b) => {
  const timeA = new Date(a.when).getTime();
  const timeB = new Date(b.when).getTime();
  return timeA - timeB;
});

adhocList.forEach(record => {
  const [date, time] = record.when.split(" ");
  const [hour, minute] = time.split(":");
  record.date = date;
  record.hour = Number(hour);
  record.minute = Number(minute);
  delete record.when;
});

const todayAdhoc = adhocList.filter((record) => {
  const today = new Date().toJSON().slice(0,10);
  return today == record.date;
});

const list = regularList.concat(todayAdhoc);

list.sort((a, b) => {
  if (a.hour === b.hour) {
    return a.minute - b.minute;
  } else {
    return a.hour - b.hour;
  }
});

function ReminderPortal() {
  const [index, setIndex] = useState(0);

  function handleNewItem(itemChange) {
    setIndex(itemChange);
  }
  
  console.log(new Date().toJSON().slice(0,10));

  return (
    <div className="grid grid-cols-3 gap-4 bg-white items-center">
      <div className="col-start-1 grow">
        <ReminderList onItemChange={handleNewItem} list={list} />
      </div>
      <div className="col-span-2 grow justify-self-center">
        <ReminderCard item={list[index]} backEndUrl={import.meta.env.VITE_API_URL} />
      </div>
    </div>
  );
}
export default ReminderPortal;
