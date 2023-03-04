import phoebe from "../assets/phoebe.jpg";
import "../styles/ReminderCard.css";

function ReminderCard() {
  return (
    <div className="card w-auto mr-10 h-full max-w-3xl aspect-square bg-base-100 dark:bg-gray-700">
      <figure>
        <img src={phoebe} alt="Phoebe Matrix" />
      </figure>
      <div className="card-body text-white">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
          Phoebe!
          <div className="badge badge-info">UPCOMING</div>
        </h1>
        <p>Who's that pokemon?</p>
      </div>
    </div>
  );
}
export default ReminderCard;
