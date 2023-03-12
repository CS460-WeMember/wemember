import ReminderList from "../components/ReminderList.jsx";
import ReminderCard from "../components/ReminderCard.jsx";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";

const backEndUrl = "http://129.150.56.59:8090";

const pb = new PocketBase(backEndUrl);

const list = await pb.collection("regular").getFullList({
  sort: "-created",
});

function ReminderPortal() {
  const [index, setIndex] = useState(0);

  function getImageUrl(item) {
    return backEndUrl + "/api/files/regular/" + item.id + "/" + item.picture;
  }

  const [imageUrl, setImageUrl] = useState(getImageUrl(list[index]));

  function handleNewItem(itemChange) {
    setIndex(itemChange);
    setImageUrl(getImageUrl(list[itemChange]));
  }

  return (
    <div className="grid grid-cols-3 gap-4 bg-white items-center">
      <div className="col-start-1 grow">
        <ReminderList onItemChange={handleNewItem} list={list} />
      </div>
      <div className="col-span-2 grow justify-self-center">
        <ReminderCard itemTitle={list[index].title} itemPicture={imageUrl} />
      </div>
    </div>
  );
}
export default ReminderPortal;
