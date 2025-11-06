import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Booking.css";

export default function BookingEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", destination: "", date: "", travelers: "", request: ""
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  // ✅ Flexible API base URL (works locally & on Render)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Fetch existing booking
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/bookings/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setForm(data.booking);
        else setServerMessage(data.message);
      })
      .catch(() => setServerMessage("❌ Could not fetch booking"));
  }, [id]);

  // Submit updated booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    setErrors({});

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        navigate("/bookings");
      } else if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setServerMessage("⚠ Fix errors below.");
      } else {
        setServerMessage(data.message || "❌ Error updating booking");
      }
    } catch (err) {
      setServerMessage("❌ Could not connect to server");
      console.error(err);
    }
  };

  // ✅ Safe display function for any error format
  const renderError = (field) => {
    const error = errors[field];
    if (!error) return null;
    const message = typeof error === "object" ? error.message : error;
    return <div className="error-text">⚠ {message}</div>;
  };

  return (
    <div className="app-background p-4 d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <div className="form-box p-4 rounded shadow w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-3">Edit Booking</h2>
        {serverMessage && <div className="alert alert-warning">{serverMessage}</div>}

        <form onSubmit={handleSubmit}>
          {["name", "email", "phone", "destination", "travelers"].map((f, idx) => (
            <div className="mb-3" key={idx}>
              <label>{f.toUpperCase()}</label>
              <input
                type={f === "email" ? "email" : f === "travelers" ? "number" : "text"}
                className="form-control"
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              />
              {renderError(f)}
            </div>
          ))}

          <div className="mb-3">
            <label>TRAVEL DATE</label>
            <input
              type="date"
              className="form-control"
              value={form.date?.split("T")[0] || ""}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            {renderError("date")}
          </div>

          <div className="mb-3">
            <label>SPECIAL REQUESTS</label>
            <textarea
              className="form-control"
              value={form.request}
              onChange={(e) => setForm({ ...form, request: e.target.value })}
            />
          </div>

          <button className="btn btn-warning w-100 fw-bold">Update Booking</button>
        </form>
      </div>
    </div>
  );
}
