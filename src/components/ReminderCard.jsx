import React from "react";


const ReminderCard = ({ itemTitle, itemPicture }) => {
  const image = (itemPicture) => {
    if (itemPicture == null) {
      return;
    } else {
      return (
        <figure>
        <img src={itemPicture}/>
        </figure>
      );
    }
  };
  return (
    <div className="card w-auto mr-10 h-full max-w-3xl aspect-square bg-base-100 dark:bg-gray-700">
      {itemPicture && (<figure>
        <img src={itemPicture}/>
      </figure>)}
      <div className="card-body rounded-b-lg text-white">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
        {itemTitle}
          <div className="badge badge-info ml-5 align-middle">UPCOMING</div>
        </h1>
      </div>
    </div>
  );
}
export default ReminderCard;
