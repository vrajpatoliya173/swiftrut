import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import About from "./pages/About";
import CreateEvent from "./pages/CreateEvent";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
};

export default App;