import React from "react";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import WhatIsEvent from "./Components/WhatIsEvent/WhatIsEvent";
import DigitalTransformation from "./Components/DigitalTransformation/DigitalTransformation";
import Pricing from "./Components/WhyThisEvent/WhyThisEvent";
import Contact from "./Pages/Contact/Contact";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<WhatIsEvent />} />
        <Route path="/Blog" element={<DigitalTransformation />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
