import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

export default function Booking() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    travelers: "",
    request: ""
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate("/success");
      } else if (response.status === 400 && data.errors) {
        // Validation errors from backend
        setErrors(data.errors);
        setServerMessage("⚠ Please correct the highlighted errors below.");
      } else {
        // Other server errors
        setServerMessage(data.message || "❌ Something went wrong on the server.");
      }
    } catch (err) {
      // Network or server unreachable
      console.error("Error:", err);
      setServerMessage("❌ Could not connect to server. Please check your internet or try again later.");
    }
  };

  return (
    <div className="app-background">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-md-6 form-box p-4 rounded shadow">
          <h3 className="text-center"><i className="fa-solid fa-plane"></i> Travel Booking Form</h3>
          <p className="text-center">Fill in your details to plan your trip</p>

          {serverMessage && <div className="alert alert-warning">{serverMessage}</div>}

          <form onSubmit={handleSubmit}>
            {["name", "email", "phone", "destination", "travelers"].map((field, idx) => (
              <div className="mb-3" key={idx}>
                <label className="form-label">{field.toUpperCase()}</label>
                <input
                  type={field === "email" ? "email" : field === "travelers" ? "number" : "text"}
                  className="form-control"
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                />
                {errors[field] && <div className="error-text">⚠ {errors[field]}</div>}
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">TRAVEL DATE</label>
              <input
                type="date"
                className="form-control"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              {errors.date && <small className="text-danger">{errors.date}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">SPECIAL REQUESTS</label>
              <textarea
                className="form-control"
                value={form.request}
                onChange={(e) => setForm({ ...form, request: e.target.value })}
              />
            </div>

            <button className="btn btn-warning w-100 fw-bold">Submit Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}
