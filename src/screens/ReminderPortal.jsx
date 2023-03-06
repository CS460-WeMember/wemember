import ReminderList from '../components/ReminderList.jsx';
import ReminderCard from '../components/ReminderCard.jsx';

function ReminderPortal() {
    return (
        <div className="grid grid-cols-3 gap-4 bg-white items-center">
            <div className="col-start-1 grow"><ReminderList/></div>
            <div className="col-span-2 grow justify-self-center"><ReminderCard/></div>
        </div>
    )
}
export default ReminderPortal;