import React from "react";
import "../styles/ReminderList.css"

let items = ['Item', 'Item', 'Item', 'Item']; //later we will use axios to api call pocketbase and insert the data here!

let itemList = items.map((item,index) => {
  return (
    <li className="list-items" key={index}>
        { item } { index+1 }
    </li>
  )
})

const ReminderList = () => {
  return (
    <div className="list-layout">
      <ul>
        { itemList }
      </ul>
    </div>
  );
};
export default ReminderList;
