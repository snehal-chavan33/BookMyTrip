import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

export default function Booking() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", destination: "", date: "", travelers: "", request: ""
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

    //  Use environment variable for backend URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage(""); setErrors({});

    try {
       const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok && data.success) navigate("/success");
      else if (res.status === 400 && data.errors) { setErrors(data.errors); setServerMessage("⚠ Fix errors below."); }
      else setServerMessage(data.message || "❌ Something went wrong");
    } catch (err) {
      setServerMessage("❌ Could not connect to server");
      console.error(err);
    }
  };

  return (
    <div className="app-background">
      <div className="container d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
        <div className="col-md-6 form-box p-4 rounded shadow">
          <h3 className="text-center">✈ Travel Booking Form</h3>
          {serverMessage && <div className="alert alert-warning">{serverMessage}</div>}
          <form onSubmit={handleSubmit}>
            {["name","email","phone","destination","travelers"].map((field,idx)=>(
              <div className="mb-3" key={idx}>
                <label>{field.toUpperCase()}</label>
                <input type={field==="email"?"email":field==="travelers"?"number":"text"} className="form-control"
                  value={form[field]} onChange={e=>setForm({...form,[field]:e.target.value})}/>
                {errors[field] && <div className="error-text">⚠ {errors[field]}</div>}
              </div>
            ))}
            <div className="mb-3">
              <label>TRAVEL DATE</label>
              <input type="date" className="form-control" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
              {errors.date && <div className="error-text">⚠ {errors.date}</div>}
            </div>
            <div className="mb-3">
              <label>SPECIAL REQUESTS</label>
              <textarea className="form-control" value={form.request} onChange={e=>setForm({...form,request:e.target.value})}/>
            </div>
            <button className="btn btn-warning w-100">Submit Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}
