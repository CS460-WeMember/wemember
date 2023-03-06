import "../styles/ReminderList.css";
import { useNavigate } from 'react-router-dom';

let items = [];

for (let i = 0; i < 15; i++) {
  items.push("Reminder");
}

let itemList = items.map((item, index) => {
  return (
    <li className="list-items" key={index}>
      {item} {index + 1}
    </li>
  )
});

const ReminderList = () => {
  const navigate = useNavigate(); 

  return (
    
    <div className="list-layout text-white"><div>
      <h1 className="text-3xl font-bold pt-10">Hello!</h1>
      <p className="pb-10 ">Here are your tasks for today:</p>
    </div>
      <ul>{itemList}</ul>
      <button className="config-btn" onClick={() => navigate("/config/settask")}>Make a new reminder</button>
    </div>
  );
};
export default ReminderList;
