import "../styles/ReminderList.css"

let items = [];

for (let i = 0; i < 15; i++) {
  items.push('Reminder');
}

let itemList = items.map((item,index) => {
  return <li className="box-border h-20 md:text-2xl lg:text-3xl relative flex w-full px-5 items-center border-b border-gray-500 rounded-lg hover:bg-gray-600 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white" key={index}>
    { item } { index+1 }
    </li>
})

const ReminderList = () => {
  return (
    <div className="h-screen w-48 md:w-60 lg:w-80 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white overflow-hidden hover:overflow-auto">
      <ul>
        { itemList }
      </ul>
    </div>
  );
};
export default ReminderList;
