import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import EventList from "./EventList";
import EventForm from "./EventForm";
import EventDetail from "./EventDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create" element={<EventForm />} />
        <Route path="/edit/:id" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App;
