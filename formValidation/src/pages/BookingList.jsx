import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Booking.css";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`);
      const data = await res.json();
      if (data.success) setBookings(data.bookings);
    } catch (err) {
      console.error(err);
      setMessage("❌ Could not fetch bookings");
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { fetchBookings(); setMessage(data.message); }
      else setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("❌ Delete failed");
    }
  };

  return (
    <div className="app-background p-4">
      <div className="container">
        <h2 className="text-center mb-4 text-light">All Bookings</h2>
        {message && <div className="alert alert-info">{message}</div>}
        {bookings.length === 0 ? (
          <p className="text-center text-light">No bookings yet.</p>
        ) : (
          <div className="table-responsive rounded shadow bg-white p-3">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Travelers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id}>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.destination}</td>
                    <td>{new Date(b.date).toLocaleDateString()}</td>
                    <td>{b.travelers}</td>
                    <td>
                      <Link className="btn btn-sm btn-primary me-2" to={`/edit/${b._id}`}>Edit</Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
