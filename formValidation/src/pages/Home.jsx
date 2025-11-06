import { Link } from "react-router-dom";
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="fw-bold">✈ Welcome To Travel Planner</h1>
        <p>Plan your dream trip with us.</p>
        <Link to="/booking" className="btn btn-warning fw-bold mt-3">Book Now</Link>
        <Link to="/bookings" className="btn btn-light fw-bold mt-3 ms-3">View All Bookings</Link>
      </div>
    </div>
  );
}
