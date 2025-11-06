import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Success from "./pages/Success";

function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<Success />} />
      </Routes>

  );
}

export default App;
