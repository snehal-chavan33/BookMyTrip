import { Link } from "react-router-dom";
import './Home.css'; // create this file for styles

export default function Success() {
  return (
    <div className="home-container">
      <div className="overlay">

    <div className="container text-center p-5 text-light">
      <h2> Booking Submitted Successfully!</h2>
      <p>We will contact you soon.</p>
      <Link to="/" className="btn btn-light mt-3">Back to Home</Link>
      </div>
    </div>
      </div>
  );
}
