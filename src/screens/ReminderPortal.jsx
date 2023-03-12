import ReminderList from '../components/ReminderList.jsx';
import ReminderCard from '../components/ReminderCard.jsx';
import React, { useState } from "react";

function ReminderPortal() {
    const [newItem, setItem] = useState();

    const handleNewItem = (itemChange) => {
        setItem(itemChange);
    }

    return (
        <div className="grid grid-cols-3 gap-4 bg-white items-center">
            <div className="col-start-1 grow"><ReminderList onItemChange={handleNewItem}/></div>
            <div className="col-span-2 grow justify-self-center"><ReminderCard item={newItem}/></div>
        </div>
    );
}
export default ReminderPortal;