import "../styles/ReminderList.css";
import { useNavigate } from "react-router-dom";

const ReminderList = ({onItemChange , list}) => {
  const navigate = useNavigate();

  const items = [];

  for (let i = 0; i < list.length; i++) {
    items.push(list[i]);
  }
  
  function handleAddTask(event) {
    console.log("add a new task clicked!");
    navigate("config/settask");
  }

  const showItem = (itemIndex) => {
    onItemChange(itemIndex);
  }

  let itemList = items.map((item, index) => {
    if (item.hour > 12) {
      return (
      <li className="list-items" key={index} onClick={() => showItem(index)}>
        {(item.hour)%12}.{item.minute} PM - {item.title}
      </li>
    );
    } else if (item.hour < 12) {
      return (
        <li className="list-items" key={index} onClick={() => showItem(index)}>
          {(item.hour)}.{item.minute} AM - {item.title}
        </li>
      );
    } else {
      return (
        <li className="list-items" key={index} onClick={() => showItem(index)}>
          {(item.hour)}.{item.minute} PM - {item.title}
        </li>
      );
    }    
  });

  return (
    <div className="list-layout text-white">
      <div>
        <h1 className="text-3xl font-bold pt-10">Hello!</h1>
        <p className="pb-10 ">Here are your tasks for today:</p>
      </div>
      
      <ul>{itemList}</ul>
      <button className="config-btn" onClick={handleAddTask}>
        Make a new reminder
      </button>
    </div>
  );
};
export default ReminderList;
