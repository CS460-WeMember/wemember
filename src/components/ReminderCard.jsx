import phoebe from "../assets/phoebe.jpg";
import "../styles/ReminderCard.css";

function ReminderCard() {
  return (
    <div className="reminder-card">
      <figure>
        <img src={phoebe} alt="Phoebe Matrix" />
      </figure>
      <div className="card-body text-white">
        <h1 className="reminder-text">
          Phoebe!
          <div className="badge badge-info">UPCOMING</div>
        </h1>
        <p>Who's that pokemon?</p>
      </div>
    </div>
  );
}
export default ReminderCard;
