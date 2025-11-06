import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingList from "./pages/BookingList";
import BookingEdit from "./pages/BookingEdit";
import Success from "./pages/Success";

function App() {
  return (


      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/bookings" element={<BookingList/>}/>
        <Route path="/edit/:id" element={<BookingEdit/>}/>
        <Route path="/success" element={<Success/>}/>
      </Routes>


  );
}

export default App;
