import "../styles/ReminderList.css"

let items = [];

for (let i = 0; i < 15; i++) {
  items.push('Reminder');
}

let itemList = items.map((item,index) => {
  return <li className="list-items" key={index}>
    { item } { index+1 }
    </li>
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
