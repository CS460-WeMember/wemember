import ReminderList from "../components/ReminderList.jsx";
import ReminderCard from "../components/ReminderCard.jsx";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";

const backEndUrl = "http://129.150.56.59:8090";

const pb = new PocketBase(backEndUrl);

const list = await pb.collection("regular").getFullList({
  sort: "-created",
});

list.sort((a, b) => {
  if (a.hour === b.hour) {
    return a.minute - b.minute;
  } else {
    return a.hour - b.hour;
  }
});

function ReminderPortal() {
  const [index, setIndex] = useState(0);

  function getImageUrl(item) {
    if (!item.picture) {
      return null;
    } else {
      return backEndUrl + "/api/files/regular/" + item.id + "/" + item.picture;
    }
  }

  function handleNewItem(itemChange) {
    setIndex(itemChange);
  }

  return (
    <div className="grid grid-cols-3 gap-4 bg-white items-center">
      <div className="col-start-1 grow">
        <ReminderList onItemChange={handleNewItem} list={list} />
      </div>
      <div className="col-span-2 grow justify-self-center">
        <ReminderCard item={list[index]} backEndUrl={backEndUrl} />
      </div>
    </div>
  );
}
export default ReminderPortal;
