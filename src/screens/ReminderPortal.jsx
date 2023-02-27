import ReminderList from '../components/ReminderList.jsx';
import ReminderCard from '../components/ReminderCard.jsx';

function ReminderPortal() {
    return (
        <div className="flex flex-row bg-white">
            <div className="mr-5 grow"><ReminderList/></div>
            <div className="ml-5 m-auto grow"><ReminderCard/></div>
        </div>
    )
}
export default ReminderPortal;