import { Link } from "react-router-dom";
import './Home.css'; // create this file for styles

export default function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="fw-bold">✈ Welcome To Travel Planner</h1>
        <p>Plan your dream trip with us.</p>
        <Link to="/booking" className="btn btn-warning fw-bold mt-3">
          Book Now
        </Link>
      </div>
    </div>
  );
}
